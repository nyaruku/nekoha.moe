import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

// Cookie utilities
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name, value, days = 365) => {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const generateAnonUsername = () => `anonymous${Math.floor(10000 + Math.random() * 90000)}`;
  const [username, setUsername] = useState(() => {
    const saved = getCookie('username');
    if (saved) return saved;
    const anon = generateAnonUsername();
    setCookie('username', anon);
    return anon;
  });  
  const [color, setColor] = useState(getCookie('color') || '#888888');
  const socketRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

    // Fetch past messages
    axios
      .get('/api/chat', { params: { since: oneDayAgo } })
      .then(response => {
        setMessages(response.data.reverse());
        // Welcome message
    addLocalMessage(`Welcome to nekoha.moe :3`);
    addLocalMessage(`"/nick username" to set a username. (You don't need)`);
    addLocalMessage(`"/color #FFFFFF" to give your name a color.`);
      })
      .catch(error => {
        console.error('Error fetching past messages:', error);
      });

    // Connect to WebSocket
    socketRef.current = io('/web-chat', {
      path: '/api/live/',
      transports: ['websocket'],
      reconnection: true,
    });
    socketRef.current.on('user_count', (count) => {
      document.getElementById('userCount').textContent = `${count}`;
    });
    socketRef.current.on('uptime', (count) => {
      document.getElementById('serverUptime').textContent = `${count}`;
    });
    socketRef.current.on('new_message', (message) => {
      console.log('New message received:', message);
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const addLocalMessage = (text) => {
    setMessages(prev => [
      ...prev,
      {
        timestamp: Date.now(),
        username: '[Local]',
        message: text,
        color: '#888888',
        local: true,
      },
    ]);
  };

  const handleCommand = (command) => {
    const [cmd, ...args] = command.split(/\s+/);
    const arg = args.join(' ');

    switch (cmd) {
      case '/help':
        addLocalMessage('Available commands: /help, /nick [name], /color [#hex]');
        return true;
      case '/nick':
        if (arg) {
          setUsername(arg);
          setCookie('username', arg);
          addLocalMessage(`Username set to "${arg}"`);
        } else {
          addLocalMessage('Usage: /nick [name]');
        }
        return true;
      case '/color':
        if (/^#[0-9A-Fa-f]{6}$/.test(arg)) {
          setColor(arg);
          setCookie('color', arg);
          addLocalMessage(`Color set to "${arg}"`);
        } else {
          addLocalMessage('Invalid color. Use hex format like #FF00FF');
        }
        return true;
      default:
        addLocalMessage(`Unknown command: ${cmd}`);
        return true;
    }
  };

  const sendMessage = () => {
    const trimmed = input.trim();
    if (trimmed === '') return;

    if (trimmed.startsWith('/')) {
      const wasCommand = handleCommand(trimmed);
      if (wasCommand) {
        setInput('');
        return;
      }
    }

    axios.post('/api/chat', {
      username: username || 'anonymous',
      message: trimmed,
      color: color || '#FFFFFF',
    }, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(() => setInput(''))
    .catch(error => {
      console.error('Error sending message:', error);
    });
  };

  return (
    <div className="card p-0 rounded-0 d-flex flex-column border-glow" style={{ height: '500px' }}>
      <div className="p-2 overflow-auto flex-grow-1" ref={containerRef}>
      {messages.map((msg, index) => (
        <div key={index} className="mb-1">
          <span class="text-muted font-monospace font-monospace me-1">{!msg.local && `[${new Date(msg.timestamp).toLocaleTimeString()}]`}</span>
          <span>
            {msg.discord === 1 && (
              <svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" viewBox="0 0 512 365.467" style={{ verticalAlign: 'middle', marginRight: '4px' }}><path fill="#FFFFFF" d="M378.186 365.028s-15.794-18.865-28.956-35.099c57.473-16.232 79.41-51.77 79.41-51.77-17.989 11.846-35.099 20.182-50.454 25.885-21.938 9.213-42.997 14.917-63.617 18.866-42.118 7.898-80.726 5.703-113.631-.438-25.008-4.827-46.506-11.407-64.494-18.867-10.091-3.947-21.059-8.774-32.027-14.917-1.316-.877-2.633-1.316-3.948-2.193-.877-.438-1.316-.878-1.755-.878-7.898-4.388-12.285-7.458-12.285-7.458s21.06 34.659 76.779 51.331c-13.163 16.673-29.395 35.977-29.395 35.977C36.854 362.395 0 299.218 0 299.218 0 159.263 63.177 45.633 63.177 45.633 126.354-1.311 186.022.005 186.022.005l4.388 5.264C111.439 27.645 75.461 62.305 75.461 62.305s9.653-5.265 25.886-12.285c46.945-20.621 84.236-25.885 99.592-27.64 2.633-.439 4.827-.878 7.458-.878 26.763-3.51 57.036-4.387 88.624-.878 41.68 4.826 86.43 17.111 132.058 41.68 0 0-34.66-32.906-109.244-55.281l6.143-7.019s60.105-1.317 122.844 45.628c0 0 63.178 113.631 63.178 253.585 0-.438-36.854 62.739-133.813 65.81l-.001.001zm-43.874-203.133c-25.006 0-44.75 21.498-44.75 48.262 0 26.763 20.182 48.26 44.75 48.26 25.008 0 44.752-21.497 44.752-48.26 0-26.764-20.182-48.262-44.752-48.262zm-160.135 0c-25.008 0-44.751 21.498-44.751 48.262 0 26.763 20.182 48.26 44.751 48.26 25.007 0 44.75-21.497 44.75-48.26.439-26.763-19.742-48.262-44.75-48.262z"/></svg>
            )}
          </span>
          <span style={{ color: msg.color || '#888888' }} class="font-monospace me-1">{msg.username || 'anoymous'}:</span>
          <span className={`font-monospace ${msg.local ? 'fst-italic text-secondary' : 'font-monospace'}`}>{msg.message}</span>
        </div>
      ))}
      </div>
      <div className="input-group">
        <input
          type="text"
          className="form-control font-monospace rounded-0"
          placeholder="/help"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="btn btn-outline-secondary rounded-0"
          type="button"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
