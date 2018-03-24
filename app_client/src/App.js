import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';
import Search from './pages/Search';
import NextSearch from './pages/NextSearch';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import NoMatch from './components/NoMatch';
import MapContainerB from './pages/MapContainerB';

class App extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Router>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Login} />
              <ProtectedRoute exact path='/park' component={Search} />
              <ProtectedRoute exact path='/search/trails' component={NextSearch} />
              <ProtectedRoute exact path='/search/activities' component={NextSearch} />
              <ProtectedRoute exact path='/search/campsites' component={NextSearch} />
              <ProtectedRoute exact path='/search/visitor' component={NextSearch} />
              <ProtectedRoute exact path='/map' component={MapContainerB} />
              <ProtectedRoute exact path='/' component={Dashboard} />
              <ProtectedRoute exact path='/account' component={Account} />
              <Route component={NoMatch} />
            </Switch>
        </Router>
      </div>
    );
  };
};

export default App;
