import { Helmet } from "react-helmet";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parse } from 'date-fns';
import DOMPurify from 'dompurify';

export default function osu() {
  // State to store entries
  const [entries, setEntries] = useState([]);
  const [filters, setFilters] = useState({
    user_id: '',
    username: '',
    message: '',
    start: '',
    end: '',
    limit: 50,
    sort: 'asc'
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = () => {
    setEntries([]); // Clear previous results before fetching new ones
  
    const params = { ...filters };
    if (filters.start) {
      params.start = parse(filters.start, "yyyy-MM-dd HH:mm", new Date()).getTime();
    }
    if (filters.end) {
      params.end = parse(filters.end, "yyyy-MM-dd HH:mm", new Date()).getTime();
    }
  
    axios.get('/api/log/osu', { params })
      .then(response => {
        setEntries(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the entries:', error);
      });
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>#osu</title>
      </Helmet>

      <div className="container mt-5">
        <h3>#osu Log (Beta)</h3>
        <form className="row g-3" onSubmit={(e) => { e.preventDefault(); fetchEntries(); }}>
          <div className="col-md-3">
            <label className="form-label">User ID equals</label>
            <input type="number" className="form-control" name="user_id" value={filters.user_id} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Username equals</label>
            <input type="text" className="form-control" name="username" value={filters.username} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Message Contains String</label>
            <input type="text" className="form-control" name="message" value={filters.message} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Start Time</label>
            <input type="datetime-local" className="form-control" name="start" value={filters.start} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">End Time</label>
            <input type="datetime-local" className="form-control" name="end" value={filters.end} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Limit (0 for all)</label>
            <input type="number" className="form-control" name="limit" value={filters.limit} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Sort</label>
            <select className="form-select" name="sort" value={filters.sort} onChange={handleChange}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Filter</button>
          </div>
        </form>
        <div className="list-log mt-3">
          {/* Show result count */}
          <p className="fw-bold">
            {entries.length > 0 ? `Showing ${entries.length} results` : "No results found"}
          </p>
          {entries.length > 0 ? (
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
          ) : (
            <p>Loading...</p> // This will show if the data is still being fetched
          )}
        </div>
      </div>
    </>
  );
}
