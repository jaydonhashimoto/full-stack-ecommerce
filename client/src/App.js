import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Home from './components/pages/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App" >
          <Router>
            <Route exact path='/' component={Home} />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
