import React, { Component } from 'react';
import { searchPlants } from './../../services/trefle';
import { Link } from 'react-router-dom';

class NewPlant extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      search: '',
      results: {},
      error: null
    };
  }

  handleFormSubmission = event => {
    event.preventDefault();

    const query = this.state.search;
    searchPlants(query)
      .then(data => {
        this.setState({
          results: data.data,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
        // const serverError = error.response.data.error;
        // this.setState({
        //   error: serverError
        // });
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <h1>Add a new Plant</h1>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-search">Plant Name</label>
          <input
            type="text"
            name="search"
            id="input-search"
            onChange={this.handleInputChange}
          />
          <button>Add</button>
        </form>
        {this.state.loaded &&
          this.state.results.map(item => {
            return (
              <div key={item.id}>
                <Link to={`/plants/search/${item.slug}`}>
                  <h1>{item.common_name}</h1>
                  <img src={item.image_url} alt=""/>
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}

export default NewPlant;
