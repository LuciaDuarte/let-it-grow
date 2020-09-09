import React, { Component } from 'react';
import { loadGardens } from './../services/garden';
import { editProfile } from './../services/authentication';
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loadedGardens: false,
      gardens: null,
      name: '',
      email: ''
    };
  }

  componentDidMount() {
    const user = this.props.user._id;
    loadGardens(user)
      .then(data => {
        const gardens = data.data;
        this.setState({
          gardens: gardens,
          loadedGardens: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmission = event => {
    event.preventDefault();
    let { name, email } = this.state;
    if (!name) {
      name = this.props.user.name;
    }
    if (!email) {
      email = this.props.user.email;
    }
    const id = this.props.user._id;
    const body = { name, email, id };
    editProfile(body)
      .then(data => {
        const { user } = data;
        this.props.onUserUpdate(user);
        this.setState({
          name: '',
          email: ''
        });
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
      <div>
        <div className="profile">
          <div className="brand">
            <h1>Let It Grow </h1>
            <img className="logo" src="/images/plant.png" alt="logo" />
          </div>
          <h2>Welcome, {this.props.user.name}</h2>
          <h3>These are your gardens</h3>
        </div>
        <div className="homepage">
          <div className="gardens-div">
            <div className="gardens-header">
              <h2 className="dashboard">My gardens</h2>
            </div>

            {this.state.loadedGardens && (
              <div className="garden-cards">
                {this.state.gardens.map(item => {
                  return (
                    <div key={item._id} className="card card-garden">
                      <div className="card-head">
                        <Link to={`/gardens/${item._id}`}>
                          <img
                            src="/images/plants.png"
                            alt="garden-default"
                            className="img-fluid"
                          />
                          <h5 className="garden-title">{item.name}</h5>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="profile-div">
            <h2 className="dashboard">Edit profile</h2>
            <form onSubmit={this.handleFormSubmission}>
              <label htmlFor="input-name">Username</label>
              <input
                id="input-name"
                type="text"
                name="name"
                placeholder={this.props.user.name}
                value={this.state.name}
                onChange={this.handleInputChange}
              />

              <label htmlFor="input-email">Email</label>
              <input
                id="input-email"
                type="email"
                name="email"
                placeholder={this.props.user.email}
                value={this.state.email}
                onChange={this.handleInputChange}
              />

              <button className="btn btn-dark">Edit Profile</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
