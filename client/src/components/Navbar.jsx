import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {props.user && (
        <>
          <Link to="/" className="nav-item nav-link">
            Homepage
          </Link>
          <Link to="/profile" className="nav-item nav-link">
            <span>{props.user.name}'s </span>
            Profile
          </Link>
          <button
            onClick={props.onSignOut}
            className="btn btn-secondary logout"
          >
            Sign Out
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
