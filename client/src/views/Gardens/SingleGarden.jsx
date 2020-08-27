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
        //console.log(error);
        // const serverError = error.response.data.error;
        // this.setState({
        //   error: serverError
        // });
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
        <div className="allplants-div">
          {this.state.loaded && (
            <>
              <div className="plants-cards">
                {this.state.plants.map(item => {
                  return (
                    <div key={item._id} className="card card-garden">
                      <div className="card-head">
                        <Link to={`/plants/${item._id}`}>
                          <img
                            src="/images/plants.png"
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
        <div className="add-plant">
          <h1>Add a new Plant</h1>
          <form
            className="form-inline add-plant-form"
            onSubmit={this.handleSearchFormSubmission}
          >
            {/* <label htmlFor="input-search">Plant Name</label> */}
            <input
              className="form-control"
              type="text"
              name="search"
              id="input-search"
              placeholder="Search for a plant"
              value={this.state.search}
              onChange={this.handleInputChange}
            />
            <button className="btn">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-search"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                />
                <path
                  fill-rule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                />
              </svg>
            </button>
          </form>
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
        </div>
        <form
          className="form-inline add-plant-form"
          onSubmit={this.handleFormSubmission}
        >
          {this.state.loadedResults && (
            <div className="display-results">
              {this.state.results.map(item => {
                return (
                  <div key={item.id} className="results">
                    <label htmlFor={`input-${item.id}`}>
                      <img
                        src={
                          item.attributes.main_image_path.includes('/assets')
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

          <label htmlFor="input-nickname">Plant Name</label>
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
            // value={this.state.image}
            onChange={this.handleImageChange}
          />
          <button className="btn new-plant">
            {' '}
            Add{' '}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-plus-square-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"
              />
            </svg>
          </button>
        </form>
      </div>
    );
  }
}

export default SingleGarden;
