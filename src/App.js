import React, { Component } from 'react';
import './App.css';
import Form from './form/Form.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      currentProperty: {
        address: "123 test lane",
        monthlyIncome: 2500,
        mortgage: {
          principal: 200000,
          mortgageLengthYears: 25,
          paymentFreqPerYear: 12,
          interest: 3.54,
        },
        operatingCosts: {
          utilities: 500,
          propertyTax: 150,
          insurance: 175,
          maintenance: 200,
          other: 0,
        }
      }
    }
    this.addPropertyToList = this.addPropertyToList.bind(this)

    // Get properties
    fetch('http://www.tyk-test.com:8080/properties/')
      .then(res => res.json())
      .then((data) => {
        this.setState({ properties: data })
      })
      .catch(console.log)
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
    // persist then show in browser
    fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...property
      })
    }).then(res => res.json())
      .then((data) => {
        // After save, fetch new properties
        var newProps = this.state.properties
        newProps.push(property)
        this.setState({
          properties: newProps
        })
      })
      .catch(console.log)
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

export default App;
