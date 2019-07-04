import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/pages/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={Home} />
      </Router>
    </div>
  );
}

export default App;
