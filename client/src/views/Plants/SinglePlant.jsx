import React, { Component } from 'react';
import { loadSinglePlant } from './../../services/plants';
import { loadPlantFromAPI } from './../../services/trefle';

class SinglePlant extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      plant: null,
      plantInfo: {}
    };
  }

  componentDidMount() {
    const plant = this.props.match.params.plantId;
    loadSinglePlant(plant)
      .then(data => {
        const plant = data.data;
        this.setState({
          plant: plant
        });
        this.load();
      })
      .then(error => {
        console.log(error);
      });
  }

  load() {
    const apiId = this.state.plant.apiId;
    loadPlantFromAPI(apiId)
      .then(data => {
        this.setState({
          plantInfo: data.data,
          loaded: true
        });
      })
      .then(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Single Plant</h1>
        {this.state.loaded && (
          <>
            <h1>{this.state.plant.nickname}</h1>
            <p>Common name: {this.state.plantInfo.attributes.name}</p>
            {/* <p>Scientific name: {this.state.plantInfo.scientific_name}</p> */}
          </>
        )}
      </div>
    );
  }
}

export default SinglePlant;
