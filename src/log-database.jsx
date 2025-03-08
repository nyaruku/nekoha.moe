// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [dbInfo, setDbInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('./scss/log-database.scss'); // manual theme import exclusive to page
    axios.get('/api/log/stats')
      .then(response => {
        setDbInfo(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching DB info:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="log-db-info">
        <div class="innerDiv">
      <p>Database Info: osu_logger</p>
      <p>Database Size: {dbInfo.totalDatabaseSizeMB} MB</p>
      <p>Allocated (real) Size: {dbInfo.actualDiskAllocMB} MB</p>
      <p>Total Message Count: {dbInfo.totalRowCount}</p>
      <p>######################################</p>
      <p># DATA IS CACHED, UPDATED EVERY HOUR #</p>
      <p>######################################</p>
      <table className="table table-sm table-bordered table-striped mt-3 table-dark table-hover">
        <thead>
          <tr>
            <th>Table Name</th>
            <th>Size (MB)</th>
            <th>Number of Entries</th>
          </tr>
        </thead>
        <tbody>
          {dbInfo.tables.map((table, index) => (
            <tr key={index}>
              <td>{table.tableName}</td>
              <td>{table.sizeMB}</td>
              <td>{table.rowCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default App;
