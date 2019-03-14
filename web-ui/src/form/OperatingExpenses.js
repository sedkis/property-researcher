import React, { Component } from "react";

class OperatingExpenses extends Component {
  render() {
    return (
      <form>
        <h3>Monthly Operating Expenses</h3>
        <label>
          <p>Utilities:</p>
          <input
            type="number"
            name="utilities"
            value={this.props.stateProp.utilities}
            onChange={this.props.onClick}
          />
        </label>

        <label>
          <p>Property Tax:</p>
          <input
            type="number"
            name="propertyTax"
            value={this.props.stateProp.propertyTax}
            onChange={this.props.onClick}
          />
        </label>

        <label>
          <p>Insurance:</p>
          <input
            type="number"
            name="insurance"
            value={this.props.stateProp.insurance}
            onChange={this.props.onClick}
          />
        </label>

        <label>
          <p>Maintenance:</p>
          {/* <select value={this.props.stateProp.paymentFreqPerYear} 
                            onChange={this.props.stateProp.handlePaymentFreqChange}>
                        <option value={'%'}>Percenteage</option>
                        <option value={'$'}>Dollar Amount</option>
                    </select> */}
          <input
            type="number"
            name="maintenance"
            value={this.props.stateProp.maintenance}
            onChange={this.props.onClick}
          />
        </label>
      </form>
    );
  }
}

export default OperatingExpenses;
