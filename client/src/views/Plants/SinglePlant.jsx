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
          plant: plant,
          loaded: true
        });
        this.load();
      })
      .then(error => {
        console.log(error);
      });
  }

  load() {
    const slug = this.state.plant.name;
    loadPlantFromAPI(slug)
      .then(data => {
        this.setState({
          plantInfo: data.data
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
            <p>Common name: {this.state.plantInfo.common_name}</p>
            <p>Scientific name: {this.state.plantInfo.scientific_name}</p>
          </>
        )}
      </div>
    );
  }
}

export default SinglePlant;
