import React, { Component } from 'react';
import { loadPlantFromAPI } from './../../services/trefle';

class SearchedPlant extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      plant: {}
    };
  }

  componentDidMount() {
    const apiId = this.props.match.params.id;
    loadPlantFromAPI(apiId)
      .then(data => {
        this.setState({
          plant: data.data,
          loaded: true
        });
      })
      .then(error => {
        console.log(error);
      });
  }

  render() {
    const plant = this.state.plant;
    return (
      <div>
        {this.state.loaded && (
          <>
          {plant.attributes.name &&
            <h1>{plant.attributes.name}</h1>}
            <div className="generalinfo">
             <img src={plant.attributes.main_image_path} alt=""/>
             {plant.attributes.description && <h1>General Information</h1>}
            {plant.attributes.description && <p>{plant.attributes.description}</p>}
             <br></br>
            {plant.attributes.common_names[0] && <p><strong>Common names:</strong> {plant.attributes.common_names[0]},{plant.attributes.common_names[1]}</p>}
            {plant.attributes.binomial_name && <p><strong>Scientific name:</strong> {plant.attributes.binomial_name}</p>}

            <div className="growinginfo">
            {plant.attributes.sun_requirements &&  <h1>Growing Specifics</h1>}
            {plant.attributes.sun_requirements && <p><strong>Sun requirements:</strong> {plant.attributes.sun_requirements}</p>}
            {plant.attributes.sowing_method &&  <p><strong>Sowing method:</strong> {plant.attributes.sowing_method}</p> }
          {plant.spread &&   <p><strong>Spread:</strong>{plant.spread}</p> }
           {plant.attributes.row_spacing && <p><strong>Row spacing:</strong>{plant.attributes.row_spacing}</p>}
           {plant.attributes.height && <p><strong>Plant height:</strong>{plant.attributes.height}</p>}
            </div>  
            </div>

          </>
        )}
      </div>
    );
  }
}

export default SearchedPlant;
