import React, { Component } from 'react';
import { loadSinglePlant } from './../../services/plants';
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
      taskList: null
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
        </div>
        {this.state.loaded && (
          <>
            <h1>{this.state.plant.nickname}</h1>
            <p>
              {' '}
              <strong>Common name:</strong> {plantInfo.attributes.name}
            </p>
            <img src={plantInfo.attributes.main_image_path} alt="" />
            <p>
              <strong>Scientific name:</strong>{' '}
              {plantInfo.attributes.binomial_name}
            </p>
            <p>
              <strong>Description: </strong> {plantInfo.attributes.description}
            </p>
            <p>
              <strong>Sun Requirements:</strong>{' '}
              {plantInfo.attributes.sun_requirements}
            </p>
            <p>
              <strong>How to sow:</strong> {plantInfo.attributes.sowing_method}
            </p>
          </>
        )}
      </div>
    );
  }
}

export default SinglePlant;
