import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import DragItem from './DragItem';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React sample of Point Events</h1>
        </header>
        <div className="App-intro">
          <DragItem />
        </div>
      </div>
    );
  }
}

export default App;
