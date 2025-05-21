import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LogStats() {
  // State for user messages table (first table)
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [uniqueUsersLogged, setUniqueUsersLogged] = useState(0);
  const pageSize = 15;

  // State for global stats and table stats (second table)
  const [globalStats, setGlobalStats] = useState(null);
  const [tableStats, setTableStats] = useState([]);
  const [tablePage, setTablePage] = useState(1);
  const tablePageSize = 15;

  // Other UI states
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState('osu');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState('');

  // cookie + shader
  useEffect(() => {
    const cookies = Object.fromEntries(
      document.cookie
        .split('; ')
        .map((c) => c.split('=').map(decodeURIComponent))
    );

    const shader = cookies.shader !== undefined ? cookies.shader : '';
    const speed = cookies.shaderSpeed || '0.1';
    const quality = cookies.shaderQuality || '1.0';

    const body = document.body;
    body.setAttribute('data-shader', shader);
    body.setAttribute('data-shader-speed', speed);
    body.setAttribute('data-shader-quality', quality);
    if (shader) {
      body.classList.add('bg-black');
    } else {
      body.classList.remove('bg-dark');
      body.classList.add('bg-primary');
    }
    body.style.overflowY = 'scroll';
  }, []);


  // Fetch data with optional page number
  const fetchData = async (pageNum = 1) => {
    setError('');
    setLoading(true);

    try {
      const params = { channel, page: pageNum, pageSize };

      if (start) {
        params.start = new Date(start).getTime(); // in ms
      }
      if (end) {
        params.end = new Date(end).getTime(); // in ms
      }

      const res = await axios.get('/api/log/info', { params });

      setData(res.data.items); // assume backend returns { items: [...], total: N }
      setUniqueUsersLogged(res.data.uniqueUsersLogged); // <-- add this
      setTotalPages(Math.ceil(res.data.total / pageSize));
      setPage(pageNum);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch global stats and table stats (second table)
  const fetchGlobalStats = async () => {
    try {
      const res = await axios.get('/api/log/stats');
      setGlobalStats(res.data); // e.g. { total_messages: ..., total_users: ..., tables: [...] }
      setTableStats(res.data.tables || []);
      setTablePage(1); // reset page when data updates
    } catch (err) {
      console.error('Failed to fetch global stats:', err);
    }
  };

 // When user clicks filter button
  const handleSubmit = () => {
    fetchData(1);
    fetchGlobalStats();
  };

  // Pagination controls
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
        <button className="page-link" onClick={() => fetchData(i)}>{i}</button>
      </li>
    );
  }

  function Pagination({ page, totalPages, onPageChange }) {
    const visiblePages = 1;
    let startPage = Math.max(page - Math.floor(visiblePages / 2), 1);
    let endPage = startPage + visiblePages - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <nav data-bs-theme="dark" aria-label="Page navigation" className="mt-3">
        <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
        <ul className="pagination flex-nowrap justify-content-center">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
          </li>

          {startPage > 1 && (
            <>
              <li className="page-item">
                <button className="page-link" onClick={() => onPageChange(1)}>1</button>
              </li>
              {startPage > 2 && (
                <li className="page-item disabled">
                  <span className="page-link">…</span>
                </li>
              )}
            </>
          )}

          {pages.map((p) => (
            <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(p)}>{p}</button>
            </li>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <li className="page-item disabled">
                  <span className="page-link">…</span>
                </li>
              )}
              <li className="page-item">
                <button className="page-link" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
              </li>
            </>
          )}

          <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
  function formatBytesToMB(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2).toLocaleString();
  }

  return (
    <>
      <Helmet>
        <title>Log Stats</title>
      </Helmet>
      {loading && (
        <div className="progress-bar logbar w-100">
          <div className="progress-bar-value"></div>
        </div>
      )}
      <div className="container py-4 px-3 mx-auto">
        <div className="d-flex flex-column align-items-center">
          <p className="form-label">Select Channel</p>
          <div className="d-flex flex-row mb-3">
            <select
              className="form-select w-auto me-2"
              name="channel"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            >
              {[
                'osu', 'german', 'announce', 'arabic', 'balkan', 'bulgarian', 'cantonese',
                'chinese', 'ctb', 'czechoslovak', 'dutch', 'english', 'estonian', 'filipino',
                'finnish', 'french', 'greek', 'hebrew', 'help', 'hungarian', 'indonesian',
                'italian', 'japanese', 'korean', 'latvian', 'lazer', 'lobby', 'malaysian',
                'mapping', 'modreqs', 'osumania', 'polish', 'portuguese', 'romanian',
                'russian', 'skandinavian', 'spanish', 'taiko', 'taiwanese', 'thai',
                'turkish', 'ukrainian', 'uzbek', 'videogames', 'vietnamese'
              ].map((ch) => (
                <option key={ch} value={ch}>#{ch}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="col-12 mb-2">
              <label className="form-label">Start Date</label>
              <input
                data-bs-theme="dark"
                type="datetime-local"
                className="form-control light-icon-form"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="col-12 mb-2">
              <label className="form-label">End Date</label>
              <input
                data-bs-theme="dark"
                type="datetime-local"
                className="form-control light-icon-form"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
          </div>

          <button onClick={handleSubmit} className="btn btn-dark rounded-0 mt-2 mb-5">Filter</button>
          {/* Global stats centered above tables */}
          {!loading && globalStats && (
            
            <div className="card rounded-0 mt-4 mb-3">
              <div className="card-body text-center">
                <h5 class="card-title">Global Log Stats</h5>
                <p class="mb-0">Total Messages : <span class="text-secondary">{globalStats.totalRowCount.toLocaleString('de-DE')}</span></p>
                <p class="mb-0">Unique Users: <span class="text-secondary">{uniqueUsersLogged.toLocaleString('de-DE')}</span></p>
                <p class="mb-0">Total Allocated: <span class="text-secondary">{formatBytesToMB(globalStats.totalDatabaseSizeBytes)}</span> MB</p>
                <p class="mb-0">Size on Disk: <span class="text-secondary">{formatBytesToMB(globalStats.actualDiskAllocBytes)}</span> MB</p>
              </div>
            </div>
          )}

          {/* Stats Table */}
          {!loading && data.length > 0 && (
            <>
            <div className="d-flex flex-row justify-content-between flex-wrap gap-3">
            <div className="table-responsive mt-4" style={{ flex: '1 1 45%', minWidth: '300px' }}>
                <table className="table table-bordered table-dark table-sm table-condensed">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((entry, i) => (
                      <tr key={entry.user_id}>
                        <td>{(page - 1) * pageSize + i + 1}</td>
                        <td>
                          {entry.username ? (
                            <a
                              href={`https://osu.ppy.sh/users/${entry.user_id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none default-link"
                            >
                              {entry.username}
                            </a>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td>{entry.message_count.toLocaleString('de-DE')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              {/* Pagination */}
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={fetchData}
              />

              </div>
              {/* Second table container */}
              <div className="table-responsive mt-4" style={{ flex: '1 1 45%', minWidth: '300px' }}>
                {tableStats.length > 0 && (
                <>
                  <table className="table table-bordered table-dark table-sm table-condensed">
                    <thead>
                      <tr>
                        <th>Channel</th>
                        <th>Messages</th>
                        <th>Allocated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableStats
                        .slice((tablePage - 1) * tablePageSize, tablePage * tablePageSize)
                        .map((entry) => (
                          <tr key={entry.table_name}>
                            <td>{entry.tableName}</td>
                            <td>{entry.rowCount.toLocaleString('de-DE')}</td>
                            <td>{(entry.sizeMB / (1024 * 1024)).toFixed(2)} MB</td> 
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {/* Pagination for second table */}
                  <Pagination
                    page={tablePage}
                    totalPages={Math.ceil(tableStats.length / tablePageSize)}
                    onPageChange={setTablePage}
                  />
                </>
              )}
              </div>
            </div>

            </>
          )}

          {/* Error message */}
          {error && <p className="text-muted mt-3">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default LogStats;
