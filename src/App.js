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
        {/*<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>*/}
      </div>
    );
  }
}

export default App;
