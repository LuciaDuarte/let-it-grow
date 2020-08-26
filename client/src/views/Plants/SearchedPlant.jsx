import React, { Component } from 'react';
import { loadPlantFromAPI } from './../../services/openfarm';
import { createPlant, loadPlants } from './../../services/plants';
import { loadGardens } from './../../services/garden';
import { Link } from 'react-router-dom';

class SearchedPlant extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      nickname: '',
      image: '',
      plant: {},
      loaded: false,
      loadedResults: false,
      plants: null,
      nickname: '',
      apiId: '',
      image: '',
      search: '',
      results: {},
      loadedGarden: false,
      loadedGardens: false,
      garden: null,
      gardens: null
      
    };
  }

  componentDidMount() {
    const apiId = this.props.match.params.id;
    const user = this.props.user._id;
    loadPlantFromAPI(apiId)
      .then(data => {
        this.setState({
          plant: data.data,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
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
  
 

  handleFormSubmission = event => {
    event.preventDefault();
    const garden = document.getElementById('input-garden').value;
    const { nickname } = this.state;
    const apiId = this.props.match.params.id
    const owner = this.props.user._id;
    const image = this.state.image;
    const body = { apiId, nickname, owner, image, garden };
    createPlant(body)
      .then(data => {
        this.setState({
          name: '',
          nickname: '',
          image: '',
          results: '',
          loadedResults: false
        });
        this.props.history.push(`/plants/${data.data._id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

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

  render() {
    const plant = this.state.plant;
    return (
      <div>
        <Link to={`/search`}>Go back to search</Link>
        {this.state.loaded && (
          <>
            {plant.attributes.name && <h1>{plant.attributes.name}</h1>}
            <div className="generalinfo">
              <img
                src={
                  plant.attributes.main_image_path.includes('/assets')
                    ? 'https://tinyurl.com/y6tmad6q'
                    : plant.attributes.main_image_path
                }
                alt={plant.attributes.name}
              />
              {plant.attributes.description && <h1>General Information</h1>}
              {plant.attributes.description && (
                <p>{plant.attributes.description}</p>
              )}
              <br></br>
              {plant.attributes.common_names && (
                <p>
                  <strong>Common names:</strong>{' '}
                  {plant.attributes.common_names[0]},
                  {plant.attributes.common_names[1]}
                </p>
              )}
              {plant.attributes.binomial_name && (
                <p>
                  <strong>Scientific name:</strong>{' '}
                  {plant.attributes.binomial_name}
                </p>
              )}

              <div className="growinginfo">
                {plant.attributes.sun_requirements && (
                  <h1>Growing Specifics</h1>
                )}
                {plant.attributes.spread && (
                  <p>
                    <strong>Spread:</strong>
                    {plant.attributes.spread} cm
                  </p>
                )}
                {plant.attributes.row_spacing && (
                  <p>
                    <strong>Row spacing: </strong>
                    {plant.attributes.row_spacing} cm
                  </p>
                )}
                {plant.attributes.height && (
                  <p>
                    <strong>Plant height: </strong>
                    {plant.attributes.height} cm
                  </p>
                )}
                            {plant.attributes.sun_requirements && (
                              <p>
                                <strong>Sun requirements:</strong>{' '}
                                {plant.attributes.sun_requirements}
                              </p>
                            )}
                            {plant.attributes.sowing_method && (
                              <p>
                                <strong>Sowing method:</strong>{' '}
                                {plant.attributes.sowing_method}
                              </p>
                            )}
              </div>
          
        <form onSubmit={this.handleFormSubmission}>
        <h1>Add this plant to your garden</h1>
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

          <label htmlFor="input-garden">Choose a garden:</label>
          <select id="input-garden" name="garden">
            <option value="none">Choose one...</option>
            {this.state.loadedGardens &&
              this.state.gardens.map(item => {
                return (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
          </select>
          <button>Add</button>
      </form>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default SearchedPlant;
