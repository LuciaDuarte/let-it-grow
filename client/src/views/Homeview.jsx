import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadGardens, createGarden } from './../services/garden';
import { loadAllTasks } from './../services/tasks';

class Homeview extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      gardens: [],
      name: '',
      loadedTasks: false,
      tasks: {}
    };
  }

  componentDidMount() {
    const user = this.props.user._id;
    loadGardens(user)
      .then(data => {
        const gardens = data.data;
        this.setState({
          gardens: gardens,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });

    const today = new Date();
    today.setDate(today.getDate() - 1);

    loadAllTasks(user)
      .then(data => {
        const tasks = data.data;
        const filteredData = tasks
          .filter(item => item.done === 0)
          .filter(item => {
            const date = new Date(item.date);
            return date >= today;
          });
        const onlyTenTasks = filteredData.slice(0, 10);

        this.setState({
          tasks: onlyTenTasks,
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
    const { name } = this.state;
    const owner = this.props.user._id;
    const body = { name, owner };
    createGarden(body)
      .then(data => {
        this.setState({
          name: ''
        });
        this.load(owner);
      })
      .catch(error => {
        console.log(error);
      });
  };

  load(user) {
    loadGardens(user)
      .then(data => {
        const gardens = data.data;
        this.setState({
          gardens: gardens,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="brand">
          <h1>Let It Grow </h1>
          <img className="logo" src="/images/plant.png" alt="logo" />
        </div>
        {this.props.user && (
          <>
            <h2>Welcome, {this.props.user.name}</h2>
            <div className="search-div">
              <div className="search-box">
                <Link to="/search">
                  <h3>Searching for a particular plant?</h3>
                </Link>
              </div>
            </div>
            <div className="homepage">
              <div className="gardens-div">
                <div className="gardens-header">
                  <h2 className="dashboard">My gardens</h2>
                  <form
                    className="form-group"
                    onSubmit={this.handleFormSubmission}
                  >
                    <label htmlFor="input-name"></label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      id="input-name"
                      placeholder="Add a new garden..."
                      value={this.state.name}
                      onChange={this.handleInputChange}
                    />
                    <button className="btn">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-plus-square-fill"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
                {this.state.loaded && (
                  <div className="garden-cards">
                    {this.state.gardens.map(item => {
                      return (
                        <div key={item._id} className="card card-garden">
                          <div className="card-head">
                            <Link to={`/gardens/${item._id}`}>
                              <img
                                src="/images/plants.png"
                                alt="garden-default"
                                className="img-fluid"
                              />
                              <h5 className="garden-title">{item.name}</h5>
                            </Link>
                          </div>
                          <div className="card-body">
                            {item.plants.map(item => {
                              return (
                                <>
                                  <Link to={`/plants/${item._id}`}>
                                    <img
                                      src="/images/plant-vase.png"
                                      alt="garden-default"
                                      className="img-fluid"
                                    />
                                    <h6
                                      key={item._id}
                                      className="card-subtitle mb-2 text-muted"
                                    >
                                      {item.nickname}
                                    </h6>
                                  </Link>
                                </>
                              );
                            })}
                            <h5 className="card-subtitle mb-2 text-muted">
                              {item.plants.nickname}
                            </h5>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="tasks-div">
                <Link to="/tasks">
                  {' '}
                  <h2 className="dashboard">My tasks</h2>
                </Link>
                {this.state.loadedTasks && (
                  <>
                    <div className="tasks-list">
                      {this.state.tasks.map(item => {
                        const date = new Date(item.date);
                        return (
                          <div className="task">
                            <p>
                              {item.task} at {date.toDateString()}
                            </p>
                            <p>
                              {item.plant.nickname} at {item.garden.name}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Homeview;
