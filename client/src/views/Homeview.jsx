import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadGardens } from './../services/garden';
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
        const onlyFiveTasks = filteredData.slice(0, 5);

        this.setState({
          tasks: onlyFiveTasks,
          loadedTasks: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1 className="mt-5">
          Let It Grow{' '}
          <span role="img" aria-label="emoji">
            🌱
          </span>
        </h1>
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
                <Link to="/gardens">
                  {' '}
                  <h2 className="dashboard">My gardens</h2>
                </Link>
                {this.state.loaded && (
                  <div className="garden-cards">
                    {this.state.gardens.map(item => {
                      return (
                        <div key={item._id} className="card card-garden">
                          <div className="card-head">
                            <img
                              src="/images/plants.png"
                              alt="garden-default"
                              className="img-fluid"
                            />
                            <Link to={`/gardens/${item._id}`}>
                              <h5 className="garden-title">{item.name}</h5>
                            </Link>
                          </div>
                          <div className="card-body">
                            {item.plants.map(item => {
                              return (
                                <>
                                  <img
                                    src="/images/plant-vase.png"
                                    alt="garden-default"
                                    className="img-fluid"
                                  />
                                  <Link to={`/plants/${item._id}`}>
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
