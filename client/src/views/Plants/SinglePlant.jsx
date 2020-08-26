import React, { Component } from 'react';
import { loadSinglePlant, deletePlant } from './../../services/plants';
import { loadPlantFromAPI } from './../../services/openfarm';
import {
  createTask,
  loadSinglePlantTasks,
  updateTask
} from './../../services/tasks';
import { Link } from 'react-router-dom';

class SinglePlant extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      plant: null,
      plantInfo: {},
      task: '',
      date: '',
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
      .catch(error => {
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
    if (apiId) {
      loadPlantFromAPI(apiId)
        .then(data => {
          this.setState({
            plantInfo: data.data,
            loaded: true
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    const id = this.state.plant._id;
    loadSinglePlantTasks(id)
      .then(data => {
        this.setState({
          taskList: data.data,
          loadedTasks: true
        });
      })
      .catch(error => {
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
    const { owner, garden } = this.state.plant;
    const plant = this.state.plant._id;
    const body = { task, date, plant, owner, garden };
    createTask(body)
      .then(data => {
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

  handleTaskCompletion = id => {
    const body = { id };
    updateTask(body)
      .then(data => {
        this.setState({
          taskList: data,
          loadedTasks: false
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
        {this.state.loadedPlant && (
          <>
            <h1>{this.state.plant.nickname}</h1>
          </>
        )}
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
                  <button onClick={() => this.handleTaskCompletion(item._id)}>
                    Mark as done
                  </button>
                </div>
              );
            })}
        </div>
        {this.state.loaded && this.state.loadedPlant && (
          <>
            <img
              src={
                this.state.plant.image
                  ? this.state.plant.image
                  : plantInfo.attributes.main_image_path.includes('/assets')
                  ? 'https://tinyurl.com/y6tmad6q'
                  : plantInfo.attributes.main_image_path
                  ? plantInfo.attributes.main_image_path
                  : 'https://tinyurl.com/y6tmad6q'
              }
              style={{ width: '20em' }}
              alt={this.state.plant.nickname}
            />
            <p>
              <Link to={`/plants/edit/${this.state.plant._id}`}>
                Edit Plant
              </Link>
            </p>
            <form onSubmit={this.handlePlantDeletion}>
              <button>Delete Plant</button>
            </form>
            {this.state.loaded && (
              <div>
                {plantInfo.attributes.name && (
                  <p>
                    <strong>Common name:</strong> {plantInfo.attributes.name}
                  </p>
                )}

                {plantInfo.attributes.binomial_name && (
                  <p>
                    <strong>Scientific name:</strong>{' '}
                    {plantInfo.attributes.binomial_name}
                  </p>
                )}

                {plantInfo.attributes.description && (
                  <p>
                    <strong>Description:</strong>{' '}
                    {plantInfo.attributes.description}
                  </p>
                )}

                {plantInfo.attributes.sun_requirements && (
                  <p>
                    <strong>Sun Requirements:</strong>{' '}
                    {plantInfo.attributes.sun_requirements}
                  </p>
                )}

                {plantInfo.attributes.sowing_method && (
                  <p>
                    <strong>How to sow:</strong>{' '}
                    {plantInfo.attributes.sowing_method}
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default SinglePlant;
