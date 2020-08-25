import React, { Component } from 'react';
import { loadAllTasks } from './../services/tasks';
import { loadGardens } from './../services/garden';

class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      tasks: {},
      loadedGardens: false,
      gardens: null
    };
  }

  componentDidMount() {
    const user = this.props.user._id;
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
        this.setState({
          tasks: filteredData,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });

    loadGardens(user)
      .then(data => {
        const gardens = data.data;
        this.setState({
          gardens: gardens,
          loadedGardens: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDoneCheckbox = event => {
    const user = this.props.user._id;
    if (event.target.checked) {
      loadAllTasks(user)
        .then(data => {
          const tasks = data.data;
          const filteredData = tasks.filter(item => item.done === 1);
          this.setState({
            tasks: filteredData
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      loadAllTasks(user)
        .then(data => {
          const tasks = data.data;
          const filteredData = tasks.filter(item => item.done === 0);
          this.setState({
            tasks: filteredData
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleAllCheckbox = event => {
    const user = this.props.user._id;
    if (event.target.checked) {
      loadAllTasks(user)
        .then(data => {
          const tasks = data.data;
          this.setState({
            tasks
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      loadAllTasks(user)
        .then(data => {
          const tasks = data.data;
          const filteredData = tasks.filter(item => item.done === 0);
          this.setState({
            tasks: filteredData
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handlePastCheckbox = event => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const user = this.props.user._id;
    if (event.target.checked) {
      loadAllTasks(user)
        .then(data => {
          const tasks = data.data;
          const filteredData = tasks.filter(item => {
            const date = new Date(item.date);
            return date < today;
          });
          this.setState({
            tasks: filteredData
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      loadAllTasks(user)
        .then(data => {
          const tasks = data.data;
          const filteredData = tasks.filter(item => item.done === 0);
          this.setState({
            tasks: filteredData
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleGardenSelection = event => {
    const user = this.props.user._id;
    const garden = event.target.value;
    if (garden !== 'none') {
      loadAllTasks(user)
        .then(data => {
          const tasks = data.data;
          const filteredData = tasks.filter(
            item => item.garden.name === garden
          );
          this.setState({
            tasks: filteredData
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div>
        <h1>All Tasks</h1>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-done">Show Marked as Done</label>
          <input
            type="checkbox"
            name="done"
            id="input-done"
            value="done"
            onClick={this.handleDoneCheckbox}
          />

          <label htmlFor="input-all">Show All</label>
          <input
            type="checkbox"
            name="all"
            id="input-all"
            value="all"
            onClick={this.handleAllCheckbox}
          />

          <label htmlFor="input-past">Show Past Tasks</label>
          <input type="checkbox" name="past" id="input-past" value="past" />

          <label htmlFor="input-garden">Choose a garden:</label>
          <select
            id="input-garden"
            name="garden"
            onChange={this.handleGardenSelection}
          >
            <option value="none">Choose one...</option>
            {this.state.loadedGardens &&
              this.state.gardens.map(item => {
                return (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </form>
        {this.state.loaded &&
          this.state.tasks.map(item => {
            let date = new Date(item.date);
            return (
              <div key={item._id}>
                <h1>{item.task}</h1>
                <p>{item.garden.name}</p>
                <p>{item.plant.nickname}</p>
                <p>{date.toDateString()}</p>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Tasks;
