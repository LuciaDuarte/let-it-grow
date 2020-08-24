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
            <h1>{plant.attributes.name}</h1>
            <div className="generalinfo"></div>

            {/* <div className="soilinfo">
              {plant.growth.soil_humidity && <h1>Soil</h1>}
              {plant.growth.soil_nutriments && (
                <p>
                  <strong>Soil Nutriments: </strong>
                  {plant.growth.soil_nutriments} / 10
                </p>
              )}
              {plant.growth.soil_salinity && (
                <p>
                  <strong>Soil Salinity: </strong>
                  {plant.growth.soil_salinity} / 10
                </p>
              )}
              {plant.growth.soil_texture && (
                <p>
                  <strong>Soil Texture: </strong>
                  {plant.growth.soil_texture} / 10
                </p>
              )}
              {plant.growth.soil_humidity && (
                <p>
                  <strong>Soil Humidty: </strong>
                  {plant.growth.soil_humidity} / 10
                </p>
              )}
            </div> */}
          </>
        )}
      </div>
    );
  }
}

export default SearchedPlant;
