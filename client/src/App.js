import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Home from './components/pages/Home';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import ViewEBook from './components/pages/ViewEBook';
import Dashboard from './components/pages/Dashboard';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <TopNav />
            <Route exact path="/" component={Home} />
            <Route path="/ebook" component={ViewEBook} />
            <Route path="/dashboard" component={Dashboard} />
          </Router>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
