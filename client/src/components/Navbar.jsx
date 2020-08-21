import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/authentication/sign-in">Sign-In</Link>
      <Link to="/authentication/sign-up">Sign-Up</Link>
    </nav>
  );
}

export default Navbar;
