import React, { Component } from 'react';
import './App.css';
import Form from './form/Form.js'

const emptyProperty = {
  address: "",
  monthlyIncome: 0,
  mortgage: {
    downPayment: 0,
    principal: 0,
    mortgageLengthYears: 25,
    paymentFreqPerYear: 12,
    interest: 3.25,
  },
  operatingCosts: {
    utilities: 0,
    propertyTax: 0,
    insurance: 0,
    maintenance: 0,
    other: 0,
  }
}

const backendUrl = "http://properties.sedky.ca:8080"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      currentProperty: JSON.parse(JSON.stringify(emptyProperty))
    }
    this.addPropertyToList = this.addPropertyToList.bind(this)
    this.editOtherProperty = this.editOtherProperty.bind(this)
    this.newProperty = this.newProperty.bind(this);

    // get all properties on page load
    fetch(backendUrl + '/properties', {
      method: 'GET',
      mode: 'cors'
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({ properties: data })
      })
      .catch(console.log)

      this.closeNav = this.closeNav.bind(this)
  }




/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
closeNav() {
  console.log('hello')
  document.getElementById("panel").style.width = "0";
  document.getElementById("panel").style.minWidth = "0";
  document.getElementById("main-form").style.marginLeft = "auto";
  document.getElementById("openBtn").style.visibility = "visible";
}

  render() {
    return (
      <div className="App">
        <header className="App-header">

          {/* Side Panel */}
          <div className="panel" id="panel">
          <button className="closebtn" onClick={this.closeNav}>&times;</button>
            <h4>Saved Properties</h4>
            <button className="newButton" onClick={this.newProperty}>New</button>
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

  editOtherProperty(event) {
    this.setState({
      currentProperty: JSON.parse(event.target.value)
    })
  }

  newProperty(event) {
    this.setState({
      currentProperty: JSON.parse(JSON.stringify(emptyProperty))
    })
  }

  addPropertyToList(property) {
    // persist then show in browser
    fetch(backendUrl + '/saveproperty', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...property })
    }).then((data) => {
      // If new property, add it to list
      fetch(backendUrl + '/properties', {
        method: 'GET',
        mode: 'cors'
      })
        .then(res => res.json())
        .then((data) => {
          this.setState({ properties: data, currentProperty: property })
        })
        .catch(console.log)
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
          {this.state.properties.map((value, index) =>
            <li key={index}>
              <button value={JSON.stringify(value)} onClick={this.editOtherProperty}>{value.address}
              </button>
            </li>
          )}
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
