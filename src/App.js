import React, { Component } from 'react';
import './App.css';
import Form from './form/Form.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: [{address:123}],
      currentProperty: {address:123}
    }
    this.addPropertyToList = this.addPropertyToList.bind(this)
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">

          {/* Side Panel */}
          <div className="panel">
            <h4>Saved Properties</h4>
            {this.getPanelContent()}
          </div>

          {/* Form */}
          <Form
            addPropertyToList={this.addPropertyToList}
            property={this.state.currentProperty}
          ></Form>

        </header>
      </div>
    );
  }

  addPropertyToList(property) {
    var newProps = this.state.properties
    newProps.push(property)
    this.setState({
      properties: newProps
    })
  }

  getPanelContent() {
    var panelContent;
    // TODO
    // if not logged in show log in button
    if (this.state.properties && this.state.properties.length > 0) {
      panelContent =
        <ul>
          {this.state.properties.map((value, index) => <li key={index}>{value.address}</li>)}
        </ul>
    } else {
      panelContent =
        <p>
          Add something new!
        </p>
    }

    return panelContent
  }
}

// const mockPayload = [
//   {
//     "address": "55 hale street",
//     "insurance": 175,
//     "interest": 3.54,
//     "maintenance": 200,
//     "mortgageLengthYears": 25,
//     "paymentFreqPerYear": 12,
//     "principal": 450000,
//     "propertyTax": 150,
//     "rent": 2500,
//     "utilities": 400
//   },
//   {
//     "address": "810 wild rose",
//     "insurance": 175,
//     "interest": 3.54,
//     "maintenance": 200,
//     "mortgageLengthYears": 25,
//     "paymentFreqPerYear": 12,
//     "principal": 200000,
//     "propertyTax": 150,
//     "rent": 2500,
//     "utilities": 400
//   }
// ]

export default App;
