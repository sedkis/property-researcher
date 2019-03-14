import React, { Component } from "react";

class MortgageCalculator extends Component {
  render() {
    return (
      <form>
        <h3>Mortgage Expenses</h3>
        <label>
          <p>Principal:</p>
          <input
            type={"number"}
            name="principal"
            value={this.props.stateProp.principal}
            onChange={this.props.onClick}
          />
        </label>   

        <label>
          <p>Term Length (Amortized, Years):</p>
          <input
            type="number"
            name="mortgageLengthYears"
            value={this.props.stateProp.mortgageLengthYears}
            onChange={this.props.onClick}
          />
        </label>

        <label>
        <p>Payment Frequency:</p>
          <select
            value={this.props.stateProp.paymentFreqPerYear}
            name="paymentFreqPerYear"
            onChange={this.props.onClick}
          >
            <option value={26}>Biweekly</option>
            <option value={12}>Monthly</option>
          </select>
        </label>

        <label>
        <p>Interest Rate:</p>
          <input
            type="number"
            name="interest"
            value={this.props.stateProp.interest}
            onChange={this.props.onClick}
          />
        </label>
      </form>
    );
  }
}

export default MortgageCalculator;
