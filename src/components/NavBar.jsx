import { NavLink } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" aria-label="CineVault home">
          <span className="brand-mark">MH</span>
          <span>MovieHub</span>
        </NavLink>
      </div>

      <div className="navbar-links">
        <NavLink to="/" className="nav-link">
          Discover
        </NavLink>
        <NavLink to="/favorites" className="nav-link">
          Watchlist
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
