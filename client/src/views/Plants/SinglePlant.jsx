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
      plant: null,
      loadedPlant: false,
      infoFromAPI: {},
      loadedFromAPI: false,
      taskList: null,
      loadedTasks: false,
      task: '',
      date: '',
      noAPIid: false,
      error: null
    };
  }

  componentDidMount() {
    const plantId = this.props.match.params.plantId;
    loadSinglePlant(plantId)
      .then(data => {
        const plant = data.data;
        this.setState({
          plant: plant,
          loadedPlant: true
        });
        return loadSinglePlantTasks(plantId);
      })
      .then(data => {
        this.setState({
          taskList: data.data,
          loadedTasks: true
        });

        const apiId = this.state.plant.apiId;

        if (apiId) {
          return loadPlantFromAPI(apiId)
            .then(data => {
              this.setState({
                infoFromAPI: data.data,
                loadedFromAPI: true
              });
            })
            .catch(error => {
              const serverError = error.response.data.error;
              this.setState({
                error: serverError
              });
            });
        } else {
          this.setState({
            noAPIid: true
          });
        }
      })
      .catch(error => {
        const serverError = error.response.data.error;
        this.setState({
          error: serverError
        });
      });
  }

  handlePlantDeletion = event => {
    event.preventDefault();
    const plantId = this.props.match.params.plantId;
    const gardenId = this.state.plant.garden;

    const confirmDeletion = window.confirm(
      'Are you sure you want to delete this plant?'
    );
    if (confirmDeletion === true) {
      deletePlant(plantId)
        .then(() => {
          this.props.history.push(`/gardens/${gardenId}`);
        })
        .catch(error => {
          const serverError = error.response.data.error;
          this.setState({
            error: serverError
          });
        });
    }
  };

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
        return loadSinglePlantTasks(plant);
      })
      .then(data => {
        this.setState({
          taskList: data.data,
          loadedTasks: true
        });
      })
      .catch(error => {
        const serverError = error.response.data.error;
        this.setState({
          error: serverError
        });
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
        const plantId = this.state.plant._id;
        return loadSinglePlantTasks(plantId);
      })
      .then(data => {
        this.setState({
          taskList: data.data,
          loadedTasks: true
        });
      })
      .catch(error => {
        const serverError = error.response.data.error;
        this.setState({
          error: serverError
        });
      });
  };

  render() {
    const infoFromAPI = this.state.infoFromAPI;
    return (
      <div>
        <nav className="navbar">
          <Link className="navbar-brand" to="/">
            Back to the dashboard
          </Link>
          {this.state.loadedPlant && (
            <>
              {/* <Link to={`/plants/edit/${this.state.plant._id}`}>
                Edit Plant
              </Link> */}

              <form className="form-inline" onSubmit={this.handlePlantDeletion}>
                <button className="btn btn-danger">Delete Plant</button>
              </form>
            </>
          )}
        </nav>
        <div className="single-plant">
          {this.state.loadedPlant && !this.state.plant.apiId && (
            <>
              <div className="title">
                <h1>{this.state.plant.nickname}</h1>
                <img
                  src={
                    this.state.plant.image
                      ? this.state.plant.image
                      : '/images/default-image.jpeg'
                  }
                  alt={this.state.plant.nickname}
                />
              </div>
            </>
          )}
          {(this.state.loadedPlant && this.state.loadedFromAPI && (
            <>
              <div className="title">
                <h1>{this.state.plant.nickname}</h1>

                <img
                  src={
                    this.state.plant.image
                      ? this.state.plant.image
                      : infoFromAPI.attributes.main_image_path.includes(
                          '/assets'
                        )
                      ? '/images/default-image.jpeg'
                      : infoFromAPI.attributes.main_image_path
                      ? infoFromAPI.attributes.main_image_path
                      : '/images/default-image.jpeg'
                  }
                  alt={this.state.plant.nickname}
                />
              </div>
              <div className="info-div">
                {infoFromAPI.attributes.name && (
                  <p>
                    <strong>Common name:</strong> {infoFromAPI.attributes.name}
                  </p>
                )}

                {infoFromAPI.attributes.binomial_name && (
                  <p>
                    <strong>Scientific name:</strong>{' '}
                    {infoFromAPI.attributes.binomial_name}
                  </p>
                )}

                {infoFromAPI.attributes.description && (
                  <p>
                    <strong>Description:</strong>{' '}
                    {infoFromAPI.attributes.description}
                  </p>
                )}

                {infoFromAPI.attributes.sun_requirements && (
                  <p>
                    <strong>Sun Requirements:</strong>{' '}
                    {infoFromAPI.attributes.sun_requirements}
                  </p>
                )}

                {infoFromAPI.attributes.sowing_method && (
                  <p>
                    <strong>How to sow:</strong>{' '}
                    {infoFromAPI.attributes.sowing_method}
                  </p>
                )}
              </div>
            </>
          )) ||
            (!this.state.noAPIid && (
              <>
                <div className="spinner-border ml-5" role="status">
                  <span className="sr-only ml-5">Loading...</span>
                </div>
              </>
            ))}
          {this.state.loadedPlant && (
            <>
              <div className="tasks-plant-div">
                <h3 className="dashboard">Add a new task</h3>
                <form
                  className="form-group"
                  onSubmit={this.handleFormSubmission}
                >
                  <label htmlFor="input-task"></label>
                  <input
                    className="form-control"
                    type="text"
                    name="task"
                    id="input-task"
                    placeholder="Task"
                    value={this.state.task}
                    onChange={this.handleInputChange}
                  />

                  <label htmlFor="input-date"></label>
                  <input
                    className="form-control"
                    type="date"
                    name="date"
                    id="input-date"
                    value={this.state.date}
                    onChange={this.handleInputChange}
                  />

                  <button className="btn btn-secondary">Add</button>
                </form>

                {this.state.loadedTasks && (
                  <div className="tasks-list">
                    {this.state.taskList.map(item => {
                      let date = new Date(item.date);
                      return (
                        <div className="task" key={item._id}>
                          <p>
                            <strong>What?</strong> {item.task}
                          </p>
                          <p>
                            <strong>When?</strong> {date.toDateString()}
                          </p>
                          <button
                            className="btn btn-secondary"
                            onClick={() => this.handleTaskCompletion(item._id)}
                          >
                            {' '}
                            Mark as done
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-check"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
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
            </>
          )}
        </div>
      </div>
    );
  }
}

export default SinglePlant;
