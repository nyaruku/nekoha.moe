import { NavLink } from "react-router-dom";

const Navbar = () => {
  const handleLinkClick = (e, url) => {
    // Prevent default behavior to control the page reload
    e.preventDefault();
    
    // Trigger page reload after navigation
    setTimeout(() => {
      window.location.href = url;  // Forces a full page reload
    }, 0); 
  };

  return (
    <nav className="navbar navbar-expand-md bg-black bg-gradient">
      <div className="container-fluid">
        <a href="/" className="navbar-brand">nekoha.moe</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-content">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={(e) => handleLinkClick(e, "/")}>Home</a>
            </li>
            <li className="nav-item">
              <a href="/log" className="nav-link" onClick={(e) => handleLinkClick(e, "/log")}>osu! Chat Logs</a>
            </li>
            <li className="nav-item">
              <a href="/log/info" className="nav-link" onClick={(e) => handleLinkClick(e, "/log/info")}>Log Database Info</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://grafana.nekoha.moe/public-dashboards/3f75dde11fcd4bad933dc648796284b5">Server Monitor</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://github.com/nyaruku/nekoha.moe">GitHub</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://discord.gg/FN6vauFTGA">Discord</a>
            </li>     
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
