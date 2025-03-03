const { BanchoClient, OutgoingBanchoMessage, BanchoChannel } = require("bancho.js");
const { Webhook } = require('@vermaysha/discord-webhook');
const mysql = require('mysql2');
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const fs = require('fs');
const https = require('https');
const http = require('http');

// Import Secrets
require('dotenv').config({ path: 'secret.env' });

// ###########################
//     DATABASE CONNECTION
// ###########################
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME_LOGGER,
  connectionLimit: 10
});
const db_nekoha = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME_MAIN,  // Ensure this database exists
  connectionLimit: 10
});

// MySQL database connection test
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// ###########################
//        WEB SOCKECT
// ###########################

// SETUP EXPRESS SERVER AND WEBSOCKETS
const app = express();
const port = 5000;
const server = http.createServer(app);
const io = require('socket.io')(server, {
  path: '/api/live/'
});

// CORS middleware for cross-origin requests
app.use(cors());

//////////////////////
// >> /api/live/osu //
//////////////////////

// Connection Var
let activeConnections = 0;
const osuNamespace = io.of("/osu");

// Connection Listener
osuNamespace.on("connection", (socket) => {
  activeConnections++; // Increase count when a client connects
  // console.log(`Client connected. Active connections: ${activeConnections}`);
  osuNamespace.emit("update-connection-count", activeConnections); // Send update to all clients

  // Disconnect
  socket.on("disconnect", () => {
    activeConnections--; // Decrease count when a client disconnects
    // console.log(`Client disconnected. Active connections: ${activeConnections}`);
    osuNamespace.emit("update-connection-count", activeConnections); // Send update to all clients
  });
});

// WebSocket helper function to send updates to clients
const notifyOsuClients = (newEntry) => {
  osuNamespace.emit("new-entry", newEntry);
};

///////////////////////
// >> /api/live/chat //
///////////////////////
const chatNamespace = io.of("/chat");

let activeChatUsers = 0;

chatNamespace.on("connection", (socket) => {
  activeChatUsers++;
  // console.log(`Chat client connected. Active users: ${activeChatUsers}`);
  chatNamespace.emit("update-chat-users", activeChatUsers);

  socket.on("disconnect", () => {
    activeChatUsers--;
    // console.log(`Chat client disconnected. Active users: ${activeChatUsers}`);
    chatNamespace.emit("update-chat-users", activeChatUsers);
  });
});

// Function to send new messages via WebSocket
const notifyChatClients = (newMessage) => {
  chatNamespace.emit("new-chat-message", newMessage);
};

// ###########################
//       API Endpoints
// ###########################

app.get('/api/log/osu', (req, res) => {
  const query = 'SELECT * FROM osu ORDER BY id DESC LIMIT 50';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching entries:', err);
      res.status(500).send('Error fetching entries');
      return;
    }
    res.json(results); // Send results as JSON response
  });
});

// Fetch Chat Messages
app.get('/api/chat', (req, res) => {
  db_nekoha.query("SELECT * FROM chat ORDER BY id DESC LIMIT 50", (err, results) => {
    if (err) {
      console.error('Error fetching messages:', err);
      return res.status(500).send('Error fetching messages');
    }
    res.json(results);
  });
});

// Store New Chat Message
app.post('/api/chat', (req, res) => {
  const unixTimeInSeconds = Math.floor(Date.now());
  const { username, message } = req.body;
  if (!username || !message) return res.status(400).send("Invalid data");

  const query = "INSERT INTO chat (timestamp, username, message) VALUES (?, ?)";
  db_nekoha.query(query, [unixTimeInSeconds, username, message], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Database error");
    }

    const newMessage = { id: result.insertId, username, message };
    notifyChatClients(newMessage); // Send to WebSocket clients

    res.status(201).json(newMessage);
  });
});

// ###########################
//           START
// ###########################

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// ###########################
//      WEBHOOK AND IRC
// ###########################

// DISCORD WEBHOOKS
const logOsu = new Webhook(process.env.WEBHOOK_OSU);

const username = process.env.OSU_USERNAME;
const password = process.env.OSU_IRC_PW;
const apiKey = process.env.OSU_API_KEY;
const client = new BanchoClient({
  username,
  password,
  apiKey,
});

// Bancho Client Logic - Listening to messages
(async () => {
  try {
    console.log("Discord Bot Launched");
    await client.connect();
    console.log("Connected to Bancho!");

    const channelsToJoin = ["#osu"];
    const channels = {};

    for (const channelName of channelsToJoin) {
      const channel = client.getChannel(channelName);
      await channel.join();
      channels[channelName] = channel;
      console.log(`Joined ${channelName} channel!`);

      channel.on("message", async (message) => {
        const unixTimeInSeconds = Math.floor(Date.now());
        const originalMessage = message.message;
        message.message = message.message.replace(/@/g, " ");
        await message.user.fetchFromAPI();
        const avatarUrl = `https://a.ppy.sh/${message.user.id}`;
        const newEntry = {
          timestamp: unixTimeInSeconds,
          user_id: message.user.id,
          avatar_url: avatarUrl,
          username: message.user.ircUsername,
          message: originalMessage
        };

        // Send to Discord webhooks
        if (channelName == "#osu") {
          logOsu.setUsername(`${message.user.ircUsername}`).setContent(`${message.message}`)
          logOsu.setAvatarUrl(avatarUrl);
          try {
            logOsu.send();
            // Store message in MySQL
            db.execute(
              "INSERT INTO osu (timestamp, user_id, avatar_url, username, message) VALUES (?, ?, ?, ?, ?)",
              [unixTimeInSeconds, message.user.id, avatarUrl, message.user.ircUsername, originalMessage],
              (err) => {
                if (err) {
                  console.error("Database error:", err);
                }
              }
            );
            // Notify clients via WebSocket
            notifyOsuClients(newEntry);
          } catch (error) {
            console.error("An error occurred:", error);
          }
        }
        // Handle other channels here similarly...
      });
    }

    client.on("disconnect", () => {
      console.log("Disconnected from Bancho!");
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();


// ###########################
//       DISCORD BOT
// ###########################

// Discord Bot Logic
const discordclient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

discordclient.once('ready', () => {
  console.log(`Logged in as ${discordclient.user.tag}!`);
});

discordclient.on('messageCreate', async (message) => {
  try {
    // Ignore bot messages
    if (message.author.bot) return;

    // Handle specific channel commands
    if (message.author.id == 'your_owner_id_here') {
      // Handle other channels similarly...
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

// Login to Discord
discordclient.login(process.env.DISCORD_BOT_TOKEN);