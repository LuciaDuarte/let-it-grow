import React, { Component } from 'react';
import { searchPlantsFromAPI } from './../../services/openfarm';
import { loadPlantFromAPI } from './../../services/openfarm';
import { Link } from 'react-router-dom';
import {
  loadSinglePlant,
  deletePlant,
  editPlant
} from './../../services/plants';

class EditPlant extends Component {
  constructor() {
    super();
    this.state = {
      loadedFromAPI: false,
      infoFromAPI: {},
      loadedPlant: false,
      plant: null,
      loadedResults: false,
      results: {},
      apiId: '',
      nickname: '',
      image: '',
      search: '',
      error: null
    };
  }

  // load() {
  //   const apiId = this.state.plant.apiId;
  //   if (apiId) {
  //     loadPlantFromAPI(apiId)
  //       .then(data => {
  //         this.setState({
  //           infoFromAPI: data.data,
  //           loadedFromAPI: true
  //         });
  //       })
  //       .catch(error => {
  //         const serverError = error.response.data.error;
  //         this.setState({
  //           error: serverError
  //         });
  //       });
  //   }
  // }

  componentDidMount() {
    const plant = this.props.match.params.plantId;
    loadSinglePlant(plant)
      .then(data => {
        const plant = data.data;
        this.setState({
          plant: plant,
          loadedPlant: true
        });
        const apiId = this.state.plant.apiId;
        if (apiId) {
          loadPlantFromAPI(apiId)
            .then(data => {
              this.setState({
                infoFromAPI: data.data,
                loadedFromAPI: true
              });
            })
            .catch(error => {
              const serverError = error.response.data.error;
              this.setState({
                error: serverError
              });
            });
        }
      })
      .catch(error => {
        const serverError = error.response.data.error;
        this.setState({
          error: serverError
        });
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
        const serverError = error.response.data.error;
        this.setState({
          error: serverError
        });
      });
  };

  handlePlantEditing = event => {
    event.preventDefault();

    const id = this.props.match.params.plantId;
    const { apiId, nickname } = this.state;
    const image = this.state.image;
    const body = { apiId, nickname, image };
    editPlant(id, body)
      .then(data => {
        this.props.history.push(`/plants/${id}`);
      })
      .catch(error => {
        const serverError = error.response.data.error;
        this.setState({
          error: serverError
        });
      });
  };

  handlePlantDeletion = event => {
    event.preventDefault();

    const plantId = this.props.match.params.plantId;
    const gardenId = this.state.plant.garden;

    const confirmDeletion = window.confirm(
      'Are you sure you want to delete this plant?'
    );
    if (confirmDeletion === true) {
      deletePlant(plantId)
        .then(() => {
          this.props.history.push(`/gardens/${gardenId}`);
        })
        .catch(error => {
          const serverError = error.response.data.error;
          this.setState({
            error: serverError
          });
        });
    }
  };

  render() {
    const infoFromAPI = this.state.infoFromAPI;
    return (
      <div>
        <h1>Edit Plant</h1>
        {this.state.loadedPlant && this.state.loadedFromAPI && (
          <>
            <img
              src={
                this.state.plant.image
                  ? this.state.plant.image
                  : infoFromAPI.attributes.main_image_path.includes('/assets')
                  ? '/images/default-image.jpeg'
                  : infoFromAPI.attributes.main_image_path
                  ? infoFromAPI.attributes.main_image_path
                  : '/images/default-image.jpeg'
              }
              alt={this.state.plant}
              style={{ width: '20em' }}
            />

            <h1>{this.state.plant.nickname}</h1>
          </>
        )}

        <form
          className="form-inline add-plant-form"
          onSubmit={this.handleSearchFormSubmission}
        >
          <label htmlFor="input-search"></label>
          <input
            className="form-control"
            type="text"
            name="search"
            id="input-search"
            placeholder="Search Plant"
            value={this.state.search}
            onChange={this.handleInputChange}
          />
          <button className="btn">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-search"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
              />
              <path
                fillRule="evenodd"
                d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
              />
            </svg>
          </button>
        </form>

        <form className="form-inline" onSubmit={this.handlePlantEditing}>
          {this.state.loadedResults && (
            <div className="display-results">
              {this.state.results.map(item => {
                return (
                  <div className="results" key={item.id}>
                    <img
                      src={
                        item.attributes.main_image_path.includes('/assets')
                          ? '/images/default-image.jpeg'
                          : item.attributes.main_image_path
                      }
                      alt={this.state.plant}
                      style={{ width: '5em' }}
                    />

                    <Link to={`/plants/search/${item.id}`}>
                      <label htmlFor={`input-${item.id}`}>
                        {item.attributes.name}
                      </label>
                    </Link>
                    <input
                      className="form-control"
                      type="checkbox"
                      id={`input-${item.id}`}
                      name="apiId"
                      value={item.id}
                      onChange={this.handleInputChange}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {this.state.loadedPlant && (
            <>
              <label htmlFor="input-nickname">Plant Nickname</label>
              <input
                className="form-control"
                type="text"
                name="nickname"
                id="input-nickname"
                placeholder={this.state.plant.nickname}
                value={this.state.nickname}
                onChange={this.handleInputChange}
                required
              />

              <label htmlFor="input-file">Choose image</label>
              <input
                className="form-control"
                type="file"
                id="input-file"
                name="image"
                placeholder="Plant Image"
                onChange={this.handleImageChange}
              />
            </>
          )}
          <button>Edit</button>
        </form>
        <form onSubmit={this.handlePlantDeletion}>
          <button>Delete Plant</button>
        </form>
      </div>
    );
  }
}

export default EditPlant;
