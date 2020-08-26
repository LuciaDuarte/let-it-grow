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
        if(!data.data.length){
          this.setState({
            noResults: true,
          })
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
        <form onSubmit={this.handleFormSubmission} >
          <label htmlFor="input-search">Plant Name</label>
          <input
            type="text"
            name="search"
            id="input-search"
            value={this.state.search}
            onChange={this.handleInputChange}
            />
          <button>Search</button>
      
        </form>
        {this.state.noResults && 
          <div>
            <img src="https://tinyurl.com/y5h27cs9" alt="" style={{width: '10em'}}/>
            <h6>Sorry!Your search query returned no results</h6>
            </div>
            }
        {this.state.loaded &&
         this.state.results.map(item => {
            return (
              <div key={item.id}>
         
                <Link to={`/search/${item.id}`}>
                  <h1>{item.attributes.name}</h1>
                  <img
                    src={
                      item.attributes.main_image_path.includes('/assets')
                      ? 'https://tinyurl.com/y6tmad6q'
                      : item.attributes.main_image_path
                    }
                    alt={item.attributes.name}
                    />
                </Link>    
              </div>
            );
          })}
      </div>
    );
  }
}

export default Search;
