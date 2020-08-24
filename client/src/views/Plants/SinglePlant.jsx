import React, { Component } from 'react';
import { loadSinglePlant, deletePlant } from './../../services/plants';
import { loadPlantFromAPI } from './../../services/trefle';
import { createTask, loadTasks } from './../../services/tasks';

class SinglePlant extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      plant: null,
      plantInfo: {},
      task: '',
      date: null,
      loadedTasks: false,
      taskList: null,
      loadedPlant: false
    };
  }

  componentDidMount() {
    const plant = this.props.match.params.plantId;
    loadSinglePlant(plant)
      .then(data => {
        const plant = data.data;
        this.setState({
          plant: plant,
          loadedPlant: true
        });
        this.load();
      })
      .then(error => {
        console.log(error);
      });
  }

  handlePlantDeletion = event => {
    event.preventDefault();
    const id = this.props.match.params.plantId;

    deletePlant(id)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

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

    const id = this.state.plant._id;
    loadTasks(id)
      .then(data => {
        this.setState({
          taskList: data.data,
          loadedTasks: true
        });
      })
      .then(error => {
        console.log(error);
      });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmission = event => {
    event.preventDefault();
    const { task, date } = this.state;
    const plant = this.state.plant._id;
    const body = { task, date, plant };
    createTask(body)
      .then(data => {
        console.log(data);
        this.setState({
          task: '',
          date: ''
        });
        this.load();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const plantInfo = this.state.plantInfo;
    return (
      <div>
        <h1>Single Plant</h1>
        <div>
          <h3>Add a new task</h3>
          <form onSubmit={this.handleFormSubmission}>
            <label htmlFor="input-task">Task</label>
            <input
              type="text"
              name="task"
              id="input-task"
              placeholder="Task"
              value={this.state.task}
              onChange={this.handleInputChange}
            />

            <label htmlFor="input-date">Task</label>
            <input
              type="date"
              name="date"
              id="input-date"
              value={this.state.date}
              onChange={this.handleInputChange}
            />

            <button>Add</button>
          </form>
          {this.state.loadedTasks &&
            this.state.taskList.map(item => {
              let date = new Date(item.date);
              return (
                <div key={item._id}>
                  <p>What? {item.task}</p>
                  <p>When? {date.toDateString()}</p>
                </div>
              );
            })}
        </div>
        {this.state.loadedPlant && (
          <> 
          <h1>{this.state.plant.nickname}</h1>
           <form onSubmit={this.handlePlantDeletion}>
           <button>Delete Plant</button>
         </form>
         {this.state.loaded && 
         <div>
            {plantInfo.attributes.name &&  <p><strong>Common name:</strong>
              {' '}
              {plantInfo.attributes.name}
              </p>}

            <img src={plantInfo.attributes.main_image_path.includes("/assets") ? "https://tinyurl.com/y6tmad6q" : plantInfo.attributes.main_image_path } style={{ width: '20em' }} /> 

            {plantInfo.attributes.binomial_name && <p>
              <strong>Scientific name:</strong>
              {' '}
              {plantInfo.attributes.binomial_name}
            </p>}

            {plantInfo.attributes.description && <p><strong>Description:</strong> {plantInfo.attributes.description}</p>}

            {plantInfo.attributes.sun_requirements && 
            <p>
              <strong>Sun Requirements:</strong>{' '}
              {plantInfo.attributes.sun_requirements}
            </p>}

            {plantInfo.attributes.sowing_method && 
            <p>
              <strong>How to sow:</strong> {plantInfo.attributes.sowing_method}
            </p>}
            </div>}
            </>
          
        )}
      </div>
    );
  }
}

export default SinglePlant;
