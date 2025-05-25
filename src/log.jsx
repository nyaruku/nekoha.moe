import { Helmet } from "react-helmet";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import DOMPurify from 'dompurify';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Message from "./components/logMessage.jsx";

export default function Log() {
  // State to store entries and filters
  const [entries, setEntries] = useState([]);
  const [filters, setFilters] = useState({
    channel: 'osu',
    user_id: '',
    username: '',
    message: '',
    start: '',
    end: '',
    limit: 50000, // Artificial Limit of 50K for people with low bandwidth ~ 3,5MiB
    sort: 'desc',
    offset: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeChannel, setActiveChannel] = useState(filters.channel);

  // Ref to our VariableSizeList and row heights.
  const listRef = useRef(null);
  // Store measured heights; default height if not measured yet.
  const rowHeightsRef = useRef({});

  // Fetch entries (reset for new filter).
  const fetchInitialEntries = () => {
    setLoading(true);
    setHasMore(true);

    // Clear previous entries and row measurements on new filter query
    setEntries([]);
    rowHeightsRef.current = {};
    const params = { ...filters };
    setActiveChannel(filters.channel);

    // Get Unix Epoch time in milliseconds from element
    params.start = cStart.valueAsNumber;
    params.end = cEnd.valueAsNumber;
    
    // Init search, offset is zero
    params.offset = 0;
    axios.get('/api/log', { params })
      .then(response => {
        setEntries(response.data);
        if (response.data.length < filters.limit) {
          setHasMore(false);
        }
      })
      .catch(error => {
        console.error('Error fetching entries:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Load more entries using current entries length as offset.
  const loadMoreEntries = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    const currentOffset = entries.length;

    const params = { ...filters };

    // Get Unix Epoch time in milliseconds from element
    params.start = cStart.valueAsNumber;
    params.end = cEnd.valueAsNumber;
    
    // Set Offset
    params.offset = currentOffset;
    axios.get('/api/log', { params })
      .then(response => {
        if (response.data.length === 0) {
          setHasMore(false);
        } else {
          setEntries(prev => [...prev, ...response.data]);
          if (response.data.length < filters.limit) {
            setHasMore(false);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching more entries:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [entries, filters, loading, hasMore]);

  useEffect(() => {
    import('./scss/log.scss'); // manual theme import exclusive to page
    fetchInitialEntries();
  }, []);

  // Handle filter input changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
  const updatedFilters = { ...filters, [name]: value };

  // Disable unsupported filters when "all" is selected
  /*
  if (name === "channel" && value === "all") {
    updatedFilters.user_id = "";
    updatedFilters.username = "";
    updatedFilters.message = "";
    updatedFilters.start = "";
    updatedFilters.end = "";
  }
  */

  setFilters(updatedFilters);

  };

  // Row renderer using a ref to measure its height.
  const Row = ({ index, style }) => {
    const entry = entries[index];
    const rowRef = useRef(null);

    useEffect(() => {
      if (rowRef.current) {
        const height = rowRef.current.getBoundingClientRect().height;
        if (rowHeightsRef.current[index] !== height) {
          rowHeightsRef.current = { ...rowHeightsRef.current, [index]: height };
          if (listRef.current) {
            listRef.current.resetAfterIndex(index);
          }
        }
      }
    }, [index, entry]);

    if (!entry) return null;
    return (
      <div style={style}>
        <div ref={rowRef}>
          <span className="log-time mr7">
            {entry.timestamp ? format(new Date(entry.timestamp), 'dd.MM.yyyy - HH:mm:ss') : ''}
          </span>
          <a
            href={`https://osu.ppy.sh/users/${entry.user_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none log-name mr7"
          >
            {entry.username}
          </a>
          <Message text={DOMPurify.sanitize(entry.message)}/>
        </div>
      </div>
    );
  };

  // Provide the height for each row.
  const getItemSize = (index) => {
    return rowHeightsRef.current[index] || 50; // default fallback height.
  };

  // Trigger loading more items when near the bottom.
  const handleItemsRendered = ({ visibleStopIndex }) => {
    if (hasMore && !loading && visibleStopIndex >= entries.length - 3) {
      loadMoreEntries();
    }
  };

  // On window resize, clear measurements and reset list.
  useEffect(() => {
    const handleResize = () => {
      if (listRef.current) {
        rowHeightsRef.current = {};
        listRef.current.resetAfterIndex(0, true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sidebar visibility state.
  const [isLeftVisible, setIsLeftVisible] = useState(false);

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
          <button
            className="btn btn-light toggle-menu-sidebar"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
            onClick={() => setIsLeftVisible(!isLeftVisible)}
          >
            Toggle Menu
          </button>
        </div>
      </nav>

      <div className={`content-container ${isLeftVisible ? "show-left" : "hide-left"}`}>
        <div className={`left-column ${isLeftVisible ? "visible" : "hidden"}`}>
          <div className="scrollable-content">
            <form onSubmit={(e) => { e.preventDefault(); fetchInitialEntries(); }}>
              <div className="col-12 mb-2">
                <label className="form-label">Select Channel</label>
                <select className="form-select" name="channel" value={filters.channel} onChange={handleChange}>
                    <option value="allm">"All Channels"</option>
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
                <input type="number" className="form-control light-icon-form" name="user_id" value={filters.user_id} onChange={handleChange}/>
              </div>
              <div className="col-12 mb-2">
                <label className="form-label">Username equals</label>
                <input type="text" className="form-control" name="username" value={filters.username} onChange={handleChange}/>
              </div>
              <div className="col-12 mb-2">
                <label className="form-label">Message Contains String</label>
                <input type="text" className="form-control" name="message" value={filters.message} onChange={handleChange}/>
              </div>
              <div className="col-12 mb-2">
                <label className="form-label">Start Time</label>
                <input type="datetime-local" className="form-control light-icon-form" id="cStart" name="start" value={filters.start} onChange={handleChange}/>
              </div>
              <div className="col-12 mb-2">
                <label className="form-label">End Time</label>
                <input type="datetime-local" className="form-control light-icon-form" id="cEnd" name="end" value={filters.end} onChange={handleChange}/>
              </div>
              <div className="col-12 mb-2">
                <label className="form-label">Limit (0 for full data)</label>
                <input type="number" className="form-control" name="limit" value={filters.limit} onChange={handleChange} />
              </div>
              <div className="col-12 mb-2">
                <label className="form-label">Sort</label>
                <select className="form-select" name="sort" value={filters.sort} onChange={handleChange}>
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
              <div className="col-12 mb-2">
                <button type="submit" className="btn btn-info col-12">Filter</button>
              </div>
            </form>
            <div className="col-12 mb-2">
                <a href={`https://nekoha.moe/api/log/download?channel=` + filters.channel} class="btn btn-info col-12">Download #{filters.channel} Chat</a>
            </div>
            <div className="col-12">
                <a href="https://nekoha.moe/api/log/export" class="btn btn-info col-12">Download MySQL Dump</a>
            </div>
          </div>
        </div>
        <div className={`right-column ${isLeftVisible ? "visible" : "hidden"}`}>
            {loading && (
                <div class="progress-bar logbar">
                    <div class="progress-bar-value"></div>
                </div>
            )}
            <div className="scrollable-content" style={{ overflowY: "hidden" }}>
            {entries.length === 0 && !loading ? (
              <p className="fw-bold">No results found</p>
            ) : (
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    ref={listRef}
                    height={height}
                    itemCount={entries.length}
                    itemSize={getItemSize}
                    width={width}
                    onItemsRendered={handleItemsRendered}
                  >
                    {Row}
                  </List>
                )}
              </AutoSizer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
