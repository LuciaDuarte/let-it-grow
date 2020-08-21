import React from 'react';

const Homeview = props => {
  return (
    <div>
      <h1>Let It Grow 🌱</h1>
      {props.user && (
        <>
          <h2>Welcome, {props.user.name}</h2>
        </>
      )}
    </div>
  );
};

export default Homeview;
