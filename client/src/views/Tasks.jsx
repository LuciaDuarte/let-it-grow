import React, { Component } from 'react';
import { loadTasks } from './../services/tasks';
import { Link } from 'react-router-dom';

class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      tasks: null
    };
  }

  componentDidMount() {
    const user = this.props.user._id;
    this.load(user);
  }

  load(user) {
    loadTasks(user)
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

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // handleFormSubmission = event => {
  //   event.preventDefault();
  //   const { name } = this.state;
  //   const owner = this.props.user._id;
  //   const body = { name, owner };
  //   createGarden(body)
  //     .then(data => {
  //       console.log(data);
  //       this.setState({
  //         name: ''
  //       });
  //       this.load(owner);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  render() {
    return (
      <div>
        <h1>All Tasks</h1>
        {this.state.loaded && (
          <>
            {this.state.tasks.map(item => {
              return (
                <div key={item._id}>
                  <Link to={`/gardens/${item._id}`}>
                    <h3>{item.name}</h3>
                  </Link>
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
}

export default Tasks;
