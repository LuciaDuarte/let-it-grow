import React, { Component } from 'react';
import { loadGardens } from './../services/garden';
import { editProfile } from './../services/authentication';
import { Link } from 'react-router-dom';


class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loadedGardens: false,
      loadedPlants: false,
      plants: null,
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
    const { name, email } = this.state;
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
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h1>User Profile</h1>
        <p>Welcome, {this.props.user.name}</p>
        <h2>These are your gardens</h2>
        {this.state.loadedGardens &&
          this.state.gardens.map(item => {
            return (
              <div key={item._id}>
                 <Link to={`/gardens/${item._id}`}>
                    <h3>{item.name}</h3>
                  </Link>
                {/* <p>{item.name}</p> */}
              </div>
            );
          })}
        <h2>Edit profile</h2>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-name">Username</label>
          <input
            id="input-name"
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />

          <label htmlFor="input-email">Email</label>
          <input
            id="input-email"
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />

          <button>Edit Profile</button>
        </form>
      </div>
    );
  }
}

export default Profile;
