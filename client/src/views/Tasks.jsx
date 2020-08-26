import React, { Component } from 'react';
import { loadAllTasks } from './../services/tasks';
import { loadGardens } from './../services/garden';
import { updateTask } from './../services/tasks';

class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      tasks: {},
      loadedGardens: false,
      gardens: null,
      filteredTasks: {},
      loadedFiltered: false,
      taskList: null,
      loadedTasks: false
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
          tasks: tasks,
          loaded: true,
          filteredTasks: filteredData,
          loadedFiltered: true
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

  handleFilters = event => {
    const garden = document.getElementById('input-garden').value;
    const done = document.getElementById('input-done').checked;
    const toDo = document.getElementById('input-to-do').checked;

    if (done && garden === 'none') {
      const tasksClone = [...this.state.tasks];
      const tasks = tasksClone.filter(item => item.done === 1);
      this.setState({
        filteredTasks: tasks
      });
    } else if (toDo && garden === 'none') {
      const tasksClone = [...this.state.tasks];
      const tasks = tasksClone.filter(item => item.done === 0);
      this.setState({
        filteredTasks: tasks
      });
    } else if (done && garden !== 'none') {
      const tasksClone = [...this.state.tasks];
      const tasks = tasksClone
        .filter(item => item.done === 1)
        .filter(item => item.garden.name === garden);
      this.setState({
        filteredTasks: tasks
      });
    } else if (toDo && garden !== 'none') {
      const tasksClone = [...this.state.tasks];
      const tasks = tasksClone
        .filter(item => item.done === 0)
        .filter(item => item.garden.name === garden);
      this.setState({
        filteredTasks: tasks
      });
    } else {
      console.log('this');
    }
  };

  handleTaskCompletion = id => {
    const user = this.props.user._id;
    const body = { id };
    const today = new Date();
    today.setDate(today.getDate() - 1);
    updateTask(body)
      .then(data => {
        // console.log(data);
        // this.setState({
        //   filteredTasks: data,
        //   loadedTasks: false
        // });
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
              tasks: tasks,
              loaded: true,
              filteredTasks: filteredData,
              loadedFiltered: true
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h1>All Tasks</h1>
        <form>
          <label htmlFor="input-done">Marked as Done</label>
          <input
            type="radio"
            name="status"
            id="input-done"
            value="done"
            onClick={this.handleFilters}
          />
          <label htmlFor="input-to-do">Marked as To-Do</label>
          <input
            type="radio"
            name="status"
            id="input-to-do"
            value="to-do"
            onClick={this.handleFilters}
          />

          <label htmlFor="input-garden">Choose a garden:</label>
          <select id="input-garden" name="garden" onChange={this.handleFilters}>
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
        {this.state.loadedFiltered &&
          this.state.filteredTasks.map(item => {
            let date = new Date(item.date);
            return (
              <div key={item._id}>
                <h1>{item.task}</h1>
                <p>{item.garden.name}</p>
                <p>{item.plant.nickname}</p>
                <p>{date.toDateString()}</p>
                <button onClick={() => this.handleTaskCompletion(item._id)}>
                  Mark as done
                </button>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Tasks;
