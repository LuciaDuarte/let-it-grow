import React, { Component } from 'react';
import { signIn } from './../../services/authentication';
import { Link } from 'react-router-dom';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmission = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const body = { email, password };
    signIn(body)
      .then(data => {
        const { user } = data;
        this.props.onUserUpdate(user);
      })
      .catch(error => {
        const serverError = error.response.data.error;
        this.setState({
          error: serverError
        });
      });
  };

  render() {
    return (
      <div className="sign-in">
        <div className="brand">
          <h1>Let It Grow </h1>
          <img className="logo" src="/images/plant.png" alt="logo" />
        </div>
        <form
          onSubmit={this.handleFormSubmission}
          className="form-group sign-in"
        >
          <label htmlFor="input-email">Email</label>
          <input
            id="input-email"
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="input-password">Password</label>
          <input
            id="input-password"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />

          <button className="btn btn-outline-success">Sign In</button>
          <Link to="/authentication/sign-up">
            <small>Don't have an account? Sign Up</small>
          </Link>

          {this.state.error && (
            <div className="alert alert-danger mt-3">
              <p>There was an error:</p>
              <p>{this.state.error.message}</p>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default SignIn;
