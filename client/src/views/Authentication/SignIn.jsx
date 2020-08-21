import React from 'react';

const SignIn = () => {
  return (
    <div>
      <form>
        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="text" name="email" />

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" name="password" />

        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
