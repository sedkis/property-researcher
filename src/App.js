import React, { Component } from 'react';
import './App.css';
import Form from './form/Form.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         <Form></Form>
        </header>
      </div>
    );
  }
}

export default App;
