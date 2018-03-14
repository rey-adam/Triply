import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react';
// import child component
import MapContainer from './pages/MapContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/register' component={Login} />
              <ProtectedRoute exact path='/home' component={Home} />
              <Route exact path='/map' component={MapContainer} />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCLUrcCEzJa-tci8ygkhPWjK2zbr3kZ1uo',
})(App);
