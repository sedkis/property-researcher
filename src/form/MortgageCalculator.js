import React, { Component } from "react";

class MortgageCalculator extends Component {
  render() {
    return (
      <form>
        <div className="row">
          <h3>Mortgage Expenses</h3>
        </div>
        <div className="row">
          <div className="col-md-6 text-right">Principal:</div>
            <input
              className="from-control col-md-6"
              type={"number"}
              name="principal"
              value={this.props.stateProp.principal}
              onChange={this.props.onClick}
            />
        </div>
        <div className="row">
          <div className="col-md-6 text-right">Term Length (Amortized, Years):</div>
          <input
            className="from-control col-md-6"
            type="number"
            name="mortgageLengthYears"
            value={this.props.stateProp.mortgageLengthYears}
            onChange={this.props.onClick}
          />
        </div>

        <div className="row">
          <div className="col-md-6 text-right">Payment Frequency:</div>
          <select
            className="from-control col-md-6"
            value={this.props.stateProp.paymentFreqPerYear}
            name="paymentFreqPerYear"
            onChange={this.props.onClick}
          >
            <option value={26}>Biweekly</option>
            <option value={12}>Monthly</option>
          </select>
        </div>

        <div className="row">
          <div className="col-md-6 text-right">Interest Rate:</div>
          <input
            className="from-control col-md-6"
            type="number"
            name="interest"
            value={this.props.stateProp.interest}
            onChange={this.props.onClick}
          />
        </div>
      </form>
    );
  }
}

export default MortgageCalculator;
