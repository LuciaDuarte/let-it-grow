import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <nav>
      {(props.user && (
        <>
          <span>{props.user.name}</span>
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
