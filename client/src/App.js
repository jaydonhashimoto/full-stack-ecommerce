import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Home from './components/pages/Home';
import TopNav from './components/TopNav';
import ViewEBook from './components/pages/ViewEBook';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App" >
          <TopNav />
          <Router>
            <Route exact path='/' component={Home} />
            <Route path='/ebook' component={ViewEBook} />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
