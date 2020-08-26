import React, { Component } from 'react';
import { createPlant, loadPlants } from './../../services/plants';
import { loadSingleGarden, deleteGarden } from './../../services/garden';
import { Link } from 'react-router-dom';
import { searchPlantsFromAPI } from './../../services/openfarm';

class SingleGarden extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      loadedResults: false,
      plants: null,
      nickname: '',
      apiId: '',
      image: '',
      search: '',
      results: {},
      loadedGarden: false,
      garden: null
    };
  }

  componentDidMount() {
    const gardenId = this.props.match.params.gardenId;
    loadSingleGarden(gardenId)
      .then(data => {
        const garden = data.data;
        this.setState({
          garden,
          loadedGarden: true
        });
        this.load(gardenId);
      })
      .catch(error => {
        console.log(error);
      });
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
      .catch(error => {
        console.log(error);
      });
  }

  handleImageChange = event => {
    const image = event.target.files[0];
    this.setState({
      image
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmission = event => {
    event.preventDefault();
    const { apiId, nickname } = this.state;
    const garden = this.props.match.params.gardenId;
    const owner = this.props.user._id;
    const image = this.state.image;
    const body = { apiId, nickname, image, owner, garden };
    createPlant(body)
      .then(data => {
        this.setState({
          name: '',
          nickname: '',
          image: '',
          results: '',
          loadedResults: false
        });
        this.load(garden);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleGardenDeletion = event => {
    event.preventDefault();
    const id = this.props.match.params.gardenId;

    if (this.state.garden.plants.length > 0) {
      const deletePlant = window.confirm(
        'You will lose all of the plants inside this garden with this action'
      );
      if (deletePlant === true) {
        deleteGarden(id)
          .then(() => {
            this.props.history.push('/gardens');
          })
          .catch(error => {
            console.log(error);
          });
      }
    } else {
      deleteGarden(id)
        .then(() => {
          this.props.history.push('/gardens');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleSearchFormSubmission = event => {
    event.preventDefault();

    const query = this.state.search;
    searchPlantsFromAPI(query)
      .then(data => {
        this.setState({
          results: data.data,
          loadedResults: true,
          search: ''
        });
      })
      .catch(error => {
        //console.log(error);
        // const serverError = error.response.data.error;
        // this.setState({
        //   error: serverError
        // });
      });
  };

  render() {
    return (
      <div>
        <Link to="/gardens">Back to all gardens</Link>
        {this.state.loadedGarden && (
          <h1>All Plants in {this.state.garden.name}</h1>
        )}
        <form onSubmit={this.handleGardenDeletion}>
          <button>Delete Garden</button>
        </form>
        {this.state.loaded && (
          <>
            {this.state.plants.map(item => {
              return (
                <div key={item._id}>
                  <Link to={`/plants/${item._id}`}>
                    <h3>{item.nickname}</h3>
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
                  <img
                    src={
                      item.attributes.main_image_path.includes('/assets')
                        ? 'https://tinyurl.com/y6tmad6q'
                        : item.attributes.main_image_path
                    }
                    style={{ width: '5em' }}
                    alt={item.attributes.name}
                  />

                  <Link to={`/plants/search/${item.id}`}>
                    <label htmlFor={`input-${item.id}`}>
                      {item.attributes.name}
                    </label>
                  </Link>
                  <input
                    type="checkbox"
                    id={`input-${item.id}`}
                    name="apiId"
                    value={item.id}
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
            // value={this.state.image}
            onChange={this.handleImageChange}
          />
          <button>Create</button>
        </form>
      </div>
    );
  }
}

export default SingleGarden;
