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
      <nav className="navbar navbar-expand-md bg-black bg-gradient">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">nekoha.moe</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-content" toggle="collapse" data-target=".navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/log/osu">osu! Log (Beta)</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/chat/osu">Live osu! Chat</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" target="_blank" href="https://github.com/nyaruku/nekoha.moe">GitHub</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" target="_blank" href="https://discord.gg/FN6vauFTGA">Discord</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" target="_blank" href="https://discord.gg/FN6vauFTGA">Discord</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

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