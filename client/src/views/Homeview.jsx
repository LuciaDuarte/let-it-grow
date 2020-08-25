import React from 'react';
import { Link } from 'react-router-dom';

const Homeview = ({ user }) => {
  return (
    <div>
      <h1>Let It Grow 🌱</h1>
      {user && (
        <>
          <div className="homepage">
            <h2>Welcome, {user.name}</h2>
            <Link to="/gardens">My gardens</Link>
            <Link to="/tasks">My tasks</Link>
            <Link to="/search">Search for a plant</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Homeview;
