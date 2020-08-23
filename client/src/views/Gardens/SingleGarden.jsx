import React, { Component } from 'react';
import { createPlant, loadPlants } from './../../services/plants';
import { Link } from 'react-router-dom';
import { searchPlantsFromAPI } from './../../services/trefle';

class SingleGarden extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      loadedResults: false,
      plants: null,
      nickname: '',
      name: '',
      image: '',
      search: '',
      results: {}
    };
  }

  componentDidMount() {
    const garden = this.props.match.params.gardenId;
    this.load(garden);
  }

  load(garden) {
    loadPlants(garden)
      .then(data => {
        const plants = data.data;
        this.setState({
          plants: plants,
          loaded: true
        });
      })
      .then(error => {
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
    const { name, nickname, image } = this.state;
    const garden = this.props.match.params.gardenId;
    const body = { name, garden, nickname, image };
    createPlant(body)
      .then(data => {
        console.log(data);
        this.setState({
          name: '',
          nickname: ''
        });
        this.load(garden);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleSearchFormSubmission = event => {
    event.preventDefault();

    const query = this.state.search;
    searchPlantsFromAPI(query)
      .then(data => {
        this.setState({
          results: data.data,
          loadedResults: true
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

  render() {
    return (
      <div>
        <h1>All Plants</h1>
        {this.state.loaded && (
          <>
            {this.state.plants.map(item => {
              return (
                <div key={item._id}>
                  <Link to={`/plants/${item._id}`}>
                    <h3>{item.name}</h3>
                  </Link>
                </div>
              );
            })}
          </>
        )}
        <h1>Add a new Plant</h1>
        <form onSubmit={this.handleSearchFormSubmission}>
          <label htmlFor="input-search">Plant Name</label>
          <input
            type="text"
            name="search"
            id="input-search"
            placeholder="Search Plant"
            value={this.state.search}
            onChange={this.handleInputChange}
          />
          <button>Search</button>
        </form>

        <form onSubmit={this.handleFormSubmission}>
          {this.state.loadedResults &&
            this.state.results.map(item => {
              return (
                <div key={item.id}>
                  <Link to={`/plants/search/${item.slug}`}>
                    <label htmlFor={`input-${item.slug}`}>
                      {item.common_name}
                    </label>
                  </Link>
                  <input
                    type="checkbox"
                    id={`input-${item.slug}`}
                    name="name"
                    value={item.slug}
                    onChange={this.handleInputChange}
                  />
                </div>
              );
            })}

          <label htmlFor="input-nickname">Plant Nickname</label>
          <input
            type="text"
            name="nickname"
            id="input-nickname"
            placeholder="Plant Nickname"
            value={this.state.nickname}
            onChange={this.handleInputChange}
          />

          <label htmlFor="input-file">Choose image</label>
          <input
            type="file"
            id="input-file"
            name="image"
            placeholder="Plant Image"
            value={this.state.image}
            onChange={this.handleInputChange}
          />
          <button>Create</button>
        </form>
      </div>
    );
  }
}

export default SingleGarden;
