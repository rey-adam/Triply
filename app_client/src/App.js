import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/register' component={Login} />
              <Route exact path='/home' component={Home} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
