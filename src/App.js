import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1 className ='teal-text text-darken-3'>E-Accountant</h1>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
