import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-black bg-gradient">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">nekoha.moe</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-content">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/log">osu! Message Logs  (Beta)</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/chat/osu">Live osu! Chat</NavLink>
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
