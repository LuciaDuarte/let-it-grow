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
        <h1>{plant.common_name}</h1>
        {this.state.loaded && (
          <>
            <div className="generalinfo">
            <img src={plant.image_url} alt="" />
            <h1>General Information:</h1> 
            {plant.scientific_name &&<p><strong>Scientific Name: </strong>{plant.scientific_name}</p> }
            {plant.observations &&<p><strong>Origins: </strong>{plant.observations}</p> }
            {plant.genus && <p><strong>Genus: </strong>{plant.genus}</p> }
            {plant.family && <p><strong>Family: </strong>{plant.family}</p> }
            {plant.edible && <p><strong>Edible Parts: </strong>{plant.edible}</p> }
            </div>

            <div className="structureinfo">
            {plant.flower.color &&
            <h1>Structural</h1> }
            {plant.flower.color &&
            <h2><strong>Flower</strong></h2>}
            {plant.flower.color && <p><strong>Color: </strong>{plant.flower.color}</p>}
            {plant.flower.conspicuous && <p><strong>Conspicuous ? : </strong> {plant.flower.conspicuous}</p>}
            
            {plant.foliage.color &&
            <h2><strong>Foliage</strong></h2>}
            {plant.foliage.color && <p><strong>Color: </strong>{plant.foliage.color}</p>}
            {plant.foliage.foliage && <p><strong>Texture: </strong> {plant.foliage.texture}</p>}
            {plant.foliage.leaf_retention && <p><strong>Leaf Retention: </strong>{plant.foliage.leaf_retention}</p>}

            {plant.fruit_or_seed.color &&
            <h2><strong>Fruit/Seed</strong></h2>}
            {plant.fruit_or_seed.color && <p><strong>Color: </strong>{plant.fruit_or_seed.color}</p>}
            {plant.fruit_or_seed.conspicuous && <p><strong>Conspicuous ? : </strong> {plant.fruit_or_seed.conspicuous}</p>}
            {plant.fruit_or_seed.shape && <p><strong>Shape: </strong> {plant.fruit_or_seed.shape}</p>}
            {plant.fruit_or_seed.seed_persistence && <p><strong>Seed Persistence: </strong> {plant.fruit_or_seed.seed_persistence}</p>}

            {plant.specifications.ligneous_type &&
            <h2><strong>Specifications</strong></h2>}
            {plant.specifications.ligneous_type && <p><strong>Ligneous Type:</strong>{plant.specifications.ligneous_type}</p>}
            {plant.specifications.growth_form && <p><strong>Growth Form:</strong> {plant.specifications.growth_form}</p>}
            {plant.specifications.growth_habit && <p><strong>Growth Habit:</strong>{plant.specifications.growth_habit}</p>}
            {plant.specifications.growth_rate && <p><strong>Growth Rate:</strong> {plant.specifications.growth_rate}</p>}
            {plant.specifications.average_height.cm && <p><strong>Average Height:</strong> {plant.specifications.average_height.cm} cm</p>}
            {plant.specifications.maximum_height.cm && <p><strong>Maximum Height:</strong> {plant.specifications.maximum_height.cm} cm</p>}
            {plant.specifications.nitrogen_fixation && <p><strong>Nitrogen Fixation:</strong> {plant.specifications.nitrogen_fixation}</p>}
            {plant.specifications.shape_and_orientation && <p><strong>Shape and Orientation:</strong> {plant.specifications.shape_and_orientation}</p>}
            {plant.specifications.toxicity && <p><strong>Toxicity:</strong> {plant.specifications.toxicity}</p>}

            </div>

            <div className="growinfo">
            {plant.growth.fruit_months &&
            <h1>Growth</h1> }
            {plant.growth.fruit_months && <p><strong>Fruit months: </strong>{plant.growth.fruit_months}</p>} 
            {plant.growth.description && <p><strong>Description: </strong>{plant.growth.description}</p>}
            {plant.growth.ph_maximum && <p><strong>Maximum pH: </strong>{plant.growth.ph_maximum} / 14</p>} 
            {plant.growth.ph_minimum && <p><strong>Minimum pH: </strong>{plant.growth.ph_minimum}</p>} 
            {plant.growth.sowing && <p><strong>Sowing: </strong>{plant.growth.sowing}</p>} 
            {plant.growth.days_to_harvest && <p><strong>Days to harvest: </strong>{plant.growth.days_to_harvest}</p>} 
            {plant.growth.atmospheric_humidity && <p><strong>Atmospheric Humidity: </strong>{plant.growth.atmospheric_humidity} / 10</p>} 
            {plant.growth.growth_months && <p><strong>Growth months: </strong>{plant.growth.growth_months}</p>}
            {plant.growth.bloom_months && <p><strong>Bloom months: </strong>{plant.growth.bloom_months}</p>}
            </div> 

            <div className="soilinfo">
             {plant.growth.soil_humidity &&
            <h1>Soil</h1> }
            {plant.growth.soil_nutriments && <p><strong>Soil Nutriments: </strong>{plant.growth.soil_nutriments} / 10</p> }
            {plant.growth.soil_salinity && <p><strong>Soil Salinity: </strong>{plant.growth.soil_salinity} / 10</p> }
            {plant.growth.soil_texture && <p><strong>Soil Texture: </strong>{plant.growth.soil_texture} / 10</p> }
            {plant.growth.soil_humidity && <p><strong>Soil Humidty: </strong>{plant.growth.soil_humidity} / 10</p> }
            </div> 

            <div className="additionalinfo">
            {plant.year &&
            <h1>Precipitation / Root / Temperature / Etc. :</h1> }  
            {plant.year && <p><strong>Discovery Year: </strong>{plant.year}</p> }
            {plant.status && <p><strong>Status: </strong>{plant.status}</p> }
            {plant.rank && <p><strong>Rank: </strong>{plant.rank}</p> }
            {plant.growth.minimum_precipitation.mm && <p><strong>Minimum Precipitation: </strong>{plant.growth.minimum_precipitation.mm} mm</p> }
            {plant.growth.maximum_precipitation.mm && <p><strong>Maximum Precipitation: </strong>{plant.growth.maximum_precipitation.mm} mm</p> }
            {plant.growth.minimum_root_depth.cm && <p><strong>Minimum Root Depth: </strong>{plant.growth.minimum_root_depth.cm}</p> }
            {plant.growth.minimum_temperature.deg_f && <p><strong>Minimum Temperature (Fahrenheit): </strong>{plant.growth.minimum_temperature.deg_f} °F</p> }
            {plant.growth.minimum_temperature.deg_c && <p><strong>Minimum Temperature (Celsius): </strong>{plant.growth.minimum_temperature.deg_c} °c</p> }
            {plant.growth.maximum_temperature.deg_f && <p><strong>Maximum Temperature (Fahrenheit): </strong>{plant.growth.maximum_temperature.deg_f} °F</p> }
            {plant.growth.maximum_temperature.deg_c && <p><strong>Maximum Temperature (Celsius): </strong>{plant.growth.maximum_temperature.deg_c} °c</p> }
  
            </div> 


         
           
          </>
        )}
      </div>
    );
  }
}

export default SearchedPlant;
