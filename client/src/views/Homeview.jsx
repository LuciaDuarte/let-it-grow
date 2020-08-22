import React from 'react';
import { Link } from 'react-router-dom';

const Homeview = ({ user }) => {
  return (
    <div>
      <h1>Let It Grow 🌱</h1>
      {user && (
        <>
          <h2>Welcome, {user.name}</h2>
          <Link to="/gardens">My gardens</Link>
        </>
      )}
    </div>
  );
};

export default Homeview;
