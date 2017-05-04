import React, { Component } from 'react';
import logo from './logo.svg';
import Board from './Board';
import './App.css';
import './board.css';

class App extends Component {
  render() {
    return (
      <div className="game">
        <Board />
      </div>
    );
  }
}

export default App;
