import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import NoMatch from './components/NoMatch';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/register' component={Login} />
              <ProtectedRoute exact path='/home' component={Home} />
              <Route component={NoMatch} />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
