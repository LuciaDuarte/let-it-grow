import React from 'react';

const SignUp = () => {
  return (
    <div>
      <form>
        <label htmlFor="input-name">Name</label>
        <input id="input-name" type="text" name="name" />

        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="text" name="email" />

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" name="password" />

        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
