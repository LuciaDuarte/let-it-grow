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
import SingleGarden from './views/Gardens/SingleGarden';
// import Plants from './views/Plants/Plants';
// import NewPlant from './views/Plants/NewPlant';
import SinglePlant from './views/Plants/SinglePlant';
import EditPlant from './views/Plants/EditPlant';
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
      .catch(error => {
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
          <ProtectedRoute
            path="/"
            render={props => <Homeview user={this.state.user} />}
            exact
            authorized={this.state.user}
            redirect="/authentication/sign-in"
          />
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
          <ProtectedRoute
            path="/profile"
            render={props => (
              <Profile
                user={this.state.user}
                onUserUpdate={this.handleUserUpdate}
              />
            )}
            exact
            authorized={this.state.user}
            redirect="/authentication/sign-in"
            exact
          />
          <ProtectedRoute
            path="/gardens"
            render={props => <Gardens user={this.state.user} />}
            exact
            authorized={this.state.user}
            redirect="/authentication/sign-in"
            exact
          />
          <ProtectedRoute
            path="/gardens/:gardenId"
            render={props => <SingleGarden {...props} user={this.state.user} />}
            exact
            authorized={this.state.user}
            redirect="/authentication/sign-in"
            exact
          />
          {/* <Route path="/plants" component={Plants} exact /> */}
          {/* <Route path="/plants/new" component={NewPlant} exact /> */}
          <ProtectedRoute
            path="/plants/:plantId"
            component={SinglePlant}
            authorized={this.state.user}
            redirect="/authentication/sign-in"
            exact
          />
          <ProtectedRoute
            path="/plants/edit/:plantId"
            component={EditPlant}
            authorized={this.state.user}
            redirect="/authentication/sign-in"
            exact
          />
          <ProtectedRoute
            path="/search"
            component={props => <Search {...props} user={this.state.user} />}
            authorized={this.state.user}
            redirect="/authentication/sign-in"
            exact
          />
          <ProtectedRoute
            path="/search/:id"
            component={props => <SearchedPlant {...props} user={this.state.user} />}
            authorized={this.state.user}
            redirect="/authentication/sign-in"
            exact
          />
          <ProtectedRoute
            path="/tasks"
            render={props => <Tasks user={this.state.user} />}
            exact
            authorized={this.state.user}
            redirect="/authentication/sign-in"
            exact
          />
        </Switch>
      </div>
    );
  }
}

export default App;
