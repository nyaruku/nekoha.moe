import { Helmet } from "react-helmet";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parse } from 'date-fns';
import DOMPurify from 'dompurify';



export default function Log() {
    // State to store entries
    const [entries, setEntries] = useState([]);
    const [filters, setFilters] = useState({
        channel: 'osu',
        user_id: '',
        username: '',
        message: '',
        start: '',
        end: '',
        limit: 1000,
        sort: 'desc'
    });
    useEffect(() => {
        import('./scss/log.scss'); // Breaks usual page layout, manual import outside of theme
        fetchEntries();
    }, []);
    const [loading, setLoading] = useState(false);
    const [activeChannel, setActiveChannel] = useState(filters.channel); // Set initial state
    const fetchEntries = () => {
        setLoading(true); 
        setEntries([]); // Clear previous results before fetching new ones

        const params = { ...filters };
        setActiveChannel(params.channel); // Update active channel correctly
        if (filters.start) {
            params.start = parse(filters.start, "yyyy-MM-dd HH:mm", new Date()).getTime();
        }
        if (filters.end) {
            params.end = parse(filters.end, "yyyy-MM-dd HH:mm", new Date()).getTime();
        }
        axios.get('/api/log', { params })
            .then(response => {
                setEntries(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the entries:', error);
            })
        .finally(() => {setLoading(false);});
    };

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };
    // Sidebar
    const [isLeftVisible, setIsLeftVisible] = useState(true);
    return (
    <>
        <Helmet>
            <title>Log</title>
        </Helmet>
        <nav className="navbar navbar-log">
            <div className="container-fluid">
                <a className="navbar-brand navbar-log">
                    #{activeChannel} ({entries.length})
                </a>
                <button className="btn btn-light toggle-menu-sidebar" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation" onClick={() => setIsLeftVisible(!isLeftVisible)}>
                    Toggle Menu
                </button>
            </div>
        </nav>

        <div className={`content-container ${isLeftVisible ? "show-left" : "hide-left"}`}>
            <div className={`left-column ${isLeftVisible ? "visible" : "hidden"}`}>
                <div className="scrollable-content">
                    <form onSubmit={(e) => { e.preventDefault(); fetchEntries(); }}>
                        <div className="col-12 mb-2">
                            <label className="form-label">Select Channel</label>
                            <select className="form-select" name="channel" value={filters.channel} onChange={handleChange}>
                            <option value="osu">#osu</option>
                            <option value="german">#german</option>
                            <option value="announce">#announce</option>
                            <option value="arabic">#arabic</option>
                            <option value="balkan">#balkan</option>
                            <option value="bulgarian">#bulgarian</option>
                            <option value="cantonese">#cantonese</option>
                            <option value="chinese">#chinese</option>
                            <option value="ctb">#ctb</option>
                            <option value="czechoslovak">#czechoslovak</option>
                            <option value="dutch">#dutch</option>
                            <option value="english">#english</option>
                            <option value="estonian">#estonian</option>
                            <option value="filipino">#filipino</option>
                            <option value="finnish">#finnish</option>
                            <option value="french">#french</option>
                            <option value="greek">#greek</option>
                            <option value="hebrew">#hebrew</option>
                            <option value="help">#help</option>
                            <option value="hungarian">#hungarian</option>
                            <option value="indonesian">#indonesian</option>
                            <option value="italian">#italian</option>
                            <option value="japanese">#japanese</option>
                            <option value="korean">#korean</option>
                            <option value="latvian">#latvian</option>
                            <option value="lazer">#lazer</option>
                            <option value="lobby">#lobby</option>
                            <option value="malaysian">#malaysian</option>
                            <option value="mapping">#mapping</option>
                            <option value="modreqs">#modreqs</option>
                            <option value="osumania">#osumania</option>
                            <option value="polish">#polish</option>
                            <option value="portuguese">#portuguese</option>
                            <option value="romanian">#romanian</option>
                            <option value="russian">#russian</option>
                            <option value="skandinavian">#skandinavian</option>
                            <option value="spanish">#spanish</option>
                            <option value="taiko">#taiko</option>
                            <option value="taiwanese">#taiwanese</option>
                            <option value="thai">#thai</option>
                            <option value="turkish">#turkish</option>
                            <option value="ukrainian">#ukrainian</option>
                            <option value="uzbek">#uzbek</option>
                            <option value="videogames">#videogames</option>
                            <option value="vietnamese">#vietnamese</option>
                            </select>
                        </div>
                        <div className="col-12 mb-2">
                            <label className="form-label">User ID equals</label>
                            <input type="number" className="form-control light-icon-form" name="user_id" value={filters.user_id} onChange={handleChange} />
                        </div>
                        <div className="col-12 mb-2">
                            <label className="form-label">Username equals</label>
                            <input type="text" className="form-control" name="username" value={filters.username} onChange={handleChange} />
                        </div>
                        <div className="col-12 mb-2">
                            <label className="form-label">Message Contains String</label>
                            <input type="text" className="form-control" name="message" value={filters.message} onChange={handleChange} />
                        </div>
                        <div className="col-12 mb-2">
                            <label className="form-label">Start Time</label>
                            <input type="datetime-local" className="form-control light-icon-form" name="start" value={filters.start} onChange={handleChange} />
                        </div>
                        <div className="col-12 mb-2">
                            <label className="form-label">End Time</label>
                            <input type="datetime-local" className="form-control light-icon-form" name="end" value={filters.end} onChange={handleChange} />
                        </div>
                        <div className="col-12 mb-2">
                            <label className="form-label">Limit (0 for all)</label>
                            <input type="number" className="form-control" name="limit" value={filters.limit} onChange={handleChange} />
                        </div>
                        <p className="col-12 mb-2 text-secondary-emphasis">You should use a limit,<br></br>if no Time range or filter is set</p>
                        <div className="col-12 mb-2">
                            <label className="form-label">Sort</label>
                            <select className="form-select" name="sort" value={filters.sort} onChange={handleChange}>
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                            </select>
                        </div>
                        <div className="col-12 mb-2">
                            <button type="submit" className="btn btn-primary">Filter</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={`right-column ${isLeftVisible ? "visible" : "hidden"}`}>
                <div className="scrollable-content">
                    <div class="list-log">
                        {loading ? (<p>Loading...</p>) : (
                            entries.length > 0 ? (
                                entries.map((entry) => (
                                    <div key={entry.id}>
                                        <span className="log-time mr7">{entry.timestamp ? format(new Date(entry.timestamp), 'dd.MM.yyyy - HH:mm:ss') : ''}</span>
                                        <a href={`https://osu.ppy.sh/users/${entry.user_id}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none log-name mr7">{entry.username}</a>                    
                                        <span className="text-break">{DOMPurify.sanitize(entry.message)}</span>
                                    </div>
                                ))
                            ) : (<p className="fw-bold">No results found</p>)
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
