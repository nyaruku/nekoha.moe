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
  const [username, setUsername] = useState(getCookie('username') || '');
  const [color, setColor] = useState(getCookie('color') || '#FFFFFF');
  const socketRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

    // Fetch past messages
    axios
      .get('/api/chat', { params: { since: oneDayAgo } })
      .then(response => {
        setMessages(response.data.reverse());
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
        username: 'system',
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
    <div className="card p-0 rounded-0 d-flex flex-column" style={{ height: '500px' }}>
      <div className="p-2 overflow-auto flex-grow-1" ref={containerRef}>
      {messages.map((msg, index) => (
        <div key={index} className="mb-2">
          <small className="text-muted">
            [{new Date(msg.timestamp).toLocaleTimeString()}]{' '}
            <b style={{ color: msg.color || '#FFFFFF' }}>
              {msg.username || 'anonymous'}
            </b>
            {msg.discord === 1 && <span className="ms-1 text-primary">(discord)</span>}
          </small>
          <div>{msg.message}</div>
        </div>
      ))}
      </div>
      <div className="input-group">
        <input
          type="text"
          className="form-control rounded-0"
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
