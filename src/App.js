import React, { Component } from 'react';
import './App.css';
import Form from './form/Form.js'
import Panel from './panel/Panel.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Panel></Panel>
          <Form></Form>
        </header>
      </div>
    );
  }
}

export default App;
