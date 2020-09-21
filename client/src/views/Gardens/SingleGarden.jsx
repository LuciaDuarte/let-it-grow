import React, { Component } from 'react';
import { createPlant, loadPlants } from './../../services/plants';
import { loadSingleGarden, deleteGarden } from './../../services/garden';
import { Link } from 'react-router-dom';
import { searchPlantsFromAPI } from './../../services/openfarm';
import SearchModal from './../../components/SearchModal';

class SingleGarden extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      loadedResults: false,
      plants: null,
      nickname: '',
      apiId: '',
      species: undefined,
      image: '',
      search: '',
      results: {},
      noResults: false,
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
        const serverError = error.response.data.error;
        this.setState({
          error: serverError
        });
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

  handleNameChange = event => {
    const { name, value, id } = event.target;
    this.setState({
      [name]: value,
      species: id
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
        const serverError = error.response.data.error;
        this.setState({
          error: serverError
        });
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
            const serverError = error.response.data.error;
            this.setState({
              error: serverError
            });
          });
      }
    } else {
      deleteGarden(id)
        .then(() => {
          this.props.history.push('/gardens');
        })
        .catch(error => {
          const serverError = error.response.data.error;
          this.setState({
            error: serverError
          });
        });
    }
  };

  handleSearchFormSubmission = event => {
    event.preventDefault();

    const query = this.state.search;
    searchPlantsFromAPI(query)
      .then(data => {
        if (!data.data.length) {
          this.setState({
            noResults: true
          });
        } else {
          this.setState({
            noResults: false
          });
        }
        const onlyTenResults = data.data.splice(0, 10);
        this.setState({
          results: onlyTenResults,
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

  clearAPIid = () => {
    this.setState({
      apiId: '',
      species: undefined
    });
  };

  render() {
    return (
      <div className="plant-view">
        <nav className="navbar">
          <Link className="navbar-brand" to="/">
            Back to the dashboard
          </Link>
          <form className="form-inline" onSubmit={this.handleGardenDeletion}>
            <button className="btn btn-danger">Delete Garden</button>
          </form>
        </nav>
        {this.state.loadedGarden && (
          <h1>All Plants in {this.state.garden.name}</h1>
        )}
        <div className="homepage">
          <div className="gardens-div">
            {this.state.loaded && (
              <>
                <div className="plants-cards">
                  {this.state.plants.map(item => {
                    return (
                      <div key={item._id} className="card card-garden">
                        <div className="card-head">
                          <Link to={`/plants/${item._id}`}>
                            <img
                              src="/images/plant-vase.png"
                              alt="garden-default"
                              className="img-fluid"
                            />
                            <h5 className="garden-title">{item.nickname}</h5>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          <div className="add-plant-div">
            <h2 className="dashboard">Add a new Plant</h2>
            <div className="species-div">
              <span>Species:</span>
              <span>{this.state.species}</span>
              <SearchModal
                clearId={this.clearAPIid}
                species={this.state.species}
              >
                {
                  <form
                    className="form-inline add-plant-form plant-name"
                    onSubmit={this.handleSearchFormSubmission}
                  >
                    <label htmlFor="input-search">Species</label>
                    <input
                      className="form-control"
                      type="text"
                      name="search"
                      id="input-search"
                      placeholder="Search for a species"
                      value={this.state.search}
                      onChange={this.handleInputChange}
                    />
                    <button className="btn btn-secondary">Search</button>
                  </form>
                }
                {this.state.noResults && (
                  <div>
                    <img
                      src="/images/no-results.jpg"
                      alt="no-results"
                      style={{ width: '10em' }}
                    />
                    <h6>Sorry! Your search query returned no results.</h6>
                  </div>
                )}
                {
                  <form className="form-inline add-plant-form">
                    {this.state.loadedResults && (
                      <div className="display-results">
                        {this.state.results.map(item => {
                          return (
                            <div key={item.id} className="results">
                              <label htmlFor={`${item.attributes.name}`}>
                                <img
                                  src={
                                    item.attributes.main_image_path.includes(
                                      '/assets'
                                    )
                                      ? '/images/default-image.jpeg'
                                      : item.attributes.main_image_path
                                  }
                                  alt={item.attributes.name}
                                />

                                {item.attributes.name}
                              </label>

                              <input
                                className="form-control"
                                type="radio"
                                id={`${item.attributes.name}`}
                                name="apiId"
                                value={item.id}
                                onChange={this.handleNameChange}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </form>
                }
              </SearchModal>
            </div>
            <form
              className="form-group add-plant-form"
              onSubmit={this.handleFormSubmission}
            >
              <label htmlFor="input-nickname">Plant Nickname</label>
              <input
                className="form-control"
                type="text"
                name="nickname"
                id="input-nickname"
                placeholder="The name of your plant..."
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

              <button className="btn btn-secondary">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleGarden;
