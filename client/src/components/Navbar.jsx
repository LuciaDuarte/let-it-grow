import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <nav>
      {(props.user && (
        <>
          <Link to="/">Homepage</Link>
          <Link to="/profile">
            <span>{props.user.name}'s</span>
            Profile
          </Link>
          <button onClick={props.onSignOut}>Sign Out</button>
        </>
      )) || (
        <>
          <Link to="/authentication/sign-up">Sign Up</Link>
          <Link to="/authentication/sign-in">Sign In</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
