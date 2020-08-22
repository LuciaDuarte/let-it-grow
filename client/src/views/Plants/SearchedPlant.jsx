import React, { Component } from 'react';
import { loadPlant } from './../../services/trefle';

class SearchedPlant extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      plant: {}
    };
  }

  componentDidMount() {
    const slug = this.props.match.params.id;
    loadPlant(slug)
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
        <h1>Single Searched Plant</h1>
        {this.state.loaded && (
          <>
            <h1>{plant.common_name}</h1>
            <h2>Light: {plant.growth.light}</h2>
            <img src={plant.images.fruit[0].image_url} alt="" />
          </>
        )}
      </div>
    );
  }
}

export default SearchedPlant;
