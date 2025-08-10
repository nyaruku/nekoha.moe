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
              <a href="/stats" className="nav-link" onClick={(e) => handleLinkClick(e, "/stats")}>Log Stats</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
