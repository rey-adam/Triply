import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';
import Search from './pages/Search';
import Accordion from './pages/Accordion';
import NextSearch from './pages/NextSearch';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import NoMatch from './components/NoMatch';
import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react';
// import child component
import MapContainer from './pages/MapContainer';

class App extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Router>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/register' component={Login} />
              <ProtectedRoute exact path='/park' component={Search} />
              <ProtectedRoute exact path='/search/trails' component={NextSearch} />
              <ProtectedRoute exact path='/search/activities' component={NextSearch} />
              <ProtectedRoute exact path='/search/campsites' component={NextSearch} />
              <ProtectedRoute exact path='/search/visitor' component={NextSearch} />
              <Route exact path='/map' render={() => {
                return <MapContainer google={this.props.google} />;
              }} />
              <ProtectedRoute exact path='/dashboard' component={Dashboard} />
              <ProtectedRoute exact path='/account' component={Account} />
              <Route component={NoMatch} />
            </Switch>
        </Router>
      </div>
    );
  };
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCLUrcCEzJa-tci8ygkhPWjK2zbr3kZ1uo',
})(App);
