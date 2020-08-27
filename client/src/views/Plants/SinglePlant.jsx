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
            <nav className="navbar">
              <Link className="navbar-brand" to="/">
                Back to the dashboard
              </Link>

              <Link to={`/plants/edit/${this.state.plant._id}`}>
                Edit Plant
              </Link>

              <form className="form-inline" onSubmit={this.handlePlantDeletion}>
                <button className="btn btn-danger">Delete Plant</button>
              </form>
            </nav>
            <div className="title">
              <h1>{this.state.plant.nickname}</h1>
            </div>
          </>
        )}
        <div className="single-plant">
          {this.state.loaded && this.state.loadedPlant && (
            <>
              <div className="info-div">
                <img
                  src={
                    this.state.plant.image
                      ? this.state.plant.image
                      : plantInfo.attributes.main_image_path.includes('/assets')
                      ? '/images/default-image.jpeg'
                      : plantInfo.attributes.main_image_path
                      ? plantInfo.attributes.main_image_path
                      : '/images/default-image.jpeg'
                  }
                  alt={this.state.plant.nickname}
                />

                {this.state.loaded && (
                  <div className="info-div">
                    {plantInfo.attributes.name && (
                      <p>
                        <strong>Common name:</strong>{' '}
                        {plantInfo.attributes.name}
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
              </div>
              <div className="tasks-plant-div">
                <h3 className="dashboard">Add a new task</h3>
                <form
                  className="form-group"
                  onSubmit={this.handleFormSubmission}
                >
                  {/* <label htmlFor="input-task">Task</label> */}
                  <input
                    className="form-control"
                    type="text"
                    name="task"
                    id="input-task"
                    placeholder="Task"
                    value={this.state.task}
                    onChange={this.handleInputChange}
                  />

                  {/* <label htmlFor="input-date">Task</label> */}
                  <input
                    className="form-control"
                    type="date"
                    name="date"
                    id="input-date"
                    value={this.state.date}
                    onChange={this.handleInputChange}
                  />

                  <button className="btn btn-light">Add</button>
                </form>
              </div>
            </>
          )}
          {this.state.loadedTasks && (
            <div className="tasks-list">
              {this.state.taskList.map(item => {
                let date = new Date(item.date);
                return (
                  <div className="task" key={item._id}>
                    <p>What? {item.task}</p>
                    <p>When? {date.toDateString()}</p>
                    <button
                      className="btn btn-light"
                      onClick={() => this.handleTaskCompletion(item._id)}
                    >
                      {' '}
                      Mark as done
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-check"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SinglePlant;
