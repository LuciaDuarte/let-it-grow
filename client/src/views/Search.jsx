import React, { Component } from 'react';
import { searchPlantsFromAPI } from './../services/openfarm';
import { Link } from 'react-router-dom';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      search: '',
      results: '',
      error: null,
      noResults: false
    };
  }

  handleFormSubmission = event => {
    event.preventDefault();

    const query = this.state.search;
    searchPlantsFromAPI(query)
      .then(data => {
        if (!data.data.length) {
          this.setState({
            noResults: true
          });
        }
        this.setState({
          search: '',
          results: data.data,
          loaded: true
        });
      })
      .catch(error => {
        const serverError = error.response.data.error;
        this.setState({
          error: serverError
        });
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
        <h1>Search for any plant</h1>
        <p>And we will see if we have it on our database</p>
        <div className="search-div">
          <form
            className="form-group search"
            onSubmit={this.handleFormSubmission}
          >
            {/* <label htmlFor="input-search">Plant Name</label> */}
            <input
              className="form-control"
              type="text"
              name="search"
              id="input-search"
              placeholder="Plant name"
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
        </div>
        {this.state.noResults && (
          <div>
            <img src="images/no-results.jpg" alt="" style={{ width: '10em' }} />
            <h6>Sorry! Your search query returned no results.</h6>
          </div>
        )}
        {this.state.loaded && (
          <div className="display-results-search">
            {this.state.results.map(item => {
              return (
                <div className="results-search" key={item.id}>
                  <Link to={`/search/${item.id}`}>
                    <img
                      src={
                        item.attributes.main_image_path.includes('/assets')
                          ? '/images/default-image.jpeg'
                          : item.attributes.main_image_path
                      }
                      alt={item.attributes.name}
                    />
                    <h1>{item.attributes.name}</h1>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
