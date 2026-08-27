import { NavLink } from "react-router";

function Header() {
  return (
    <header className="header">
      <div>
        <h1>
          STREAM<span>LIST</span>
        </h1>
        <p>Powered by EZTechMovie</p>
      </div>

      <nav className="nav-bar">
        <NavLink to="/">
          <span className="material-icons">home</span>
          Home
        </NavLink>

        <NavLink to="/my-list">
          <span className="material-icons">playlist_play</span>
          My List
        </NavLink>

        <NavLink to="/about">
          <span className="material-icons">info</span>
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;