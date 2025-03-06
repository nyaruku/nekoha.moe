import { Helmet } from "react-helmet";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { format } from 'date-fns';
import DOMPurify from 'dompurify';

export default function LiveChat() {
  const [connectionCount, setConnectionCount] = useState(0);

  // State to store entries
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    // Fetch initial data from backend API using relative URL
    axios.get('/api/log/osu?limit=50&sort=desc') // Use relative URL for the API call
      .then(response => {
        setEntries(response.data); // Store the entries in state
      })
      .catch(error => {
        console.error('There was an error fetching the entries:', error);
      });
  
    // WebSocket connection for live updates using the relative URL
    const socket = io('/osu', {
      path: '/api/live/',
      transports: ['websocket']
    });
  
    // Listen for new entry updates
    socket.on('new-entry', (msg) => {
      setEntries(prevEntries => [msg, ...prevEntries]); // Add new entry to the beginning of the list
    });

    socket.on("update-connection-count", (count) => {
      setConnectionCount(count); // Update count
    });
  
    // Cleanup WebSocket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>#osu Live Chat</title>
      </Helmet>
      
      <div className="container mt-5">
        <h3>Live osu! Chat</h3>
        <p>(A bit buggy... refresh page if u see duplicated messages/.etc)</p>
        <h5>Active Users on this Page: {connectionCount}</h5>
        <div className="list-log">
          {entries.length === 0 ? (
            <p>Loading...</p>
          ) : (
            entries.map((entry) => (
              <ol className={`list-group ${entry.isNew ? 'new-entry' : ''}`} key={entry.timestamp}>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="d-flex flex-column flex-grow-1 text-wrap">
                    <div className="fw-bold">
                      <a 
                        href={`https://osu.ppy.sh/users/${entry.user_id}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-decoration-none log-link">
                        {entry.username}
                      </a>
                    </div>
                    <p className="m-0 text-break">{DOMPurify.sanitize(entry.message)}</p>
                  </div>
                  <span className="badge text-bg-info text-white rounded-pill ms-2">
                    {entry.timestamp
                      ? format(new Date(entry.timestamp), 'dd.MM.yyyy - HH:mm:ss')
                      : ''}
                  </span>
                </li>
              </ol>
            ))
          )}
        </div>
      </div>
    </>
  )
}