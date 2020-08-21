import React, { Component } from 'react';
import './App.css';
import Homeview from './views/Homeview';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import { loadMe, signOut } from './services/authentication';
import SignIn from './views/Authentication/SignIn';
import SignUp from './views/Authentication/SignUp';
import Profile from './views/Profile';
import Gardens from './views/Gardens/Gardens';
import NewGarden from './views/Gardens/NewGarden';
import SingleGarden from './views/Gardens/SingleGarden';
import Plants from './views/Plants/Plants';
import NewPlant from './views/Plants/NewPlant';
import SinglePlant from './views/Plants/SinglePlant';
import SearchedPlant from './views/Plants/SearchedPlant';
import Search from './views/Search';
import Tasks from './views/Tasks';
import ProtectedRoute from './components/ProtectedRoute';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null
    };
  }

  componentDidMount() {
    loadMe()
      .then(data => {
        const user = data.user;
        this.handleUserUpdate(user);
        this.setState({
          loaded: true
        });
      })
      .then(error => {
        console.log(error);
      });
  }

  handleUserUpdate = user => {
    this.setState({
      user
    });
  };

  handleSignOut = () => {
    signOut()
      .then(() => {
        this.handleUserUpdate(null);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} onSignOut={this.handleSignOut} />
        <Switch>
          <Route path="/" component={Homeview} exact />
          <ProtectedRoute
            path="/authentication/sign-up"
            render={props => (
              <SignUp {...props} onUserUpdate={this.handleUserUpdate} />
            )}
            authorized={!this.state.user}
            redirect="/"
          />
          <ProtectedRoute
            path="/authentication/sign-in"
            render={props => (
              <SignIn {...props} onUserUpdate={this.handleUserUpdate} />
            )}
            authorized={!this.state.user}
            redirect="/"
          />
          <Route path="/profile" component={Profile} exact />
          {/* <Route path="/authentication/sign-in" component={SignIn} exact />
          <Route path="/authentication/sign-up" component={SignUp} exact /> */}
          <Route path="/gardens" component={Gardens} exact />
          <Route path="/gardens/new" component={NewGarden} exact />
          <Route path="/gardens/:gardenId" component={SingleGarden} />
          <Route path="/plants" component={Plants} exact />
          <Route path="/plants/new" component={NewPlant} exact />
          <Route path="/plants/:plantId" component={SinglePlant} exact />
          <Route path="/search" component={Search} exact />
          <Route path="/search/:id" component={SearchedPlant} exact />
          <Route path="/tasks" component={Tasks} exact />
        </Switch>
      </div>
    );
  }
}

export default App;
