import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LogStats() {
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState('osu');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

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

const handleSubmit = async () => {
  setError('');
  setData([]);
  setLoading(true);

  try {
    const params = { channel };

    if (start) {
      params.start = new Date(start).getTime(); // in ms
    }
    if (end) {
      params.end = new Date(end).getTime(); // in ms
    }

    const res = await axios.get('/api/log/info', { params });
    setData(res.data);
  } catch (err) {
    console.error(err);
    setError('Failed to fetch data.');
  } finally {
    setLoading(false);
  }
};

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
              <label className="form-label">Start Time</label>
              <input
                data-bs-theme="dark"
                type="datetime-local"
                className="form-control light-icon-form"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="col-12 mb-2">
              <label className="form-label">End Time</label>
              <input
                data-bs-theme="dark"
                type="datetime-local"
                className="form-control light-icon-form"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
          </div>

          <button onClick={handleSubmit} className="btn btn-dark rounded-0 mt-2">Filter</button>

          {/* Stats Table */}
          {!loading && data.length > 0 && (
            <div className="table-responsive mt-4 w-100">
              <table className="table table-bordered table-dark table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Message Count</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((entry, i) => (
                    <tr key={entry.user_id}>
                      <td>{i + 1}</td>
                      <td>{entry.user_id}</td>
                      <td>{entry.username || '—'}</td>
                      <td>{entry.message_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Message Display */}
          {error && (
            <p className="text-muted mt-3">{error}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default LogStats;
