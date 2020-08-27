import React, { Component } from 'react';
import { createGarden, loadGardens } from './../../services/garden';
import { Link } from 'react-router-dom';

class Gardens extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      gardens: null,
      name: ''
    };
  }

  componentDidMount() {
    const user = this.props.user._id;
    this.load(user);
  }

  load(user) {
    loadGardens(user)
      .then(data => {
        const gardens = data.data;
        this.setState({
          gardens: gardens,
          loaded: true
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
    const { name } = this.state;
    const owner = this.props.user._id;
    const body = { name, owner };
    createGarden(body)
      .then(data => {
        this.setState({
          name: ''
        });
        this.load(owner);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h1>All Gardens</h1>
        {this.state.loaded && (
          <div className="garden-cards">
            <>
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
            </>
          </div>
        )}
        <h1>Create a new Garden</h1>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-name">Garden Name</label>
          <input
            type="text"
            name="name"
            id="input-name"
            placeholder="Garden Name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <button>Create</button>
        </form>
      </div>
    );
  }
}

export default Gardens;
