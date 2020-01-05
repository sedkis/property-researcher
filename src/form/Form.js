import React, { Component } from "react";
// import EmailResults from './EmailResults';
import MortgageCalculator from "./MortgageCalculator";
import OperatingExpenses from "./OperatingExpenses";
import Currency from "../formatters/Currency";
import DownPayment from "./DownPayment.js";
import "./Form.css";
class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "hey you",
      principal: 200000,
      mortgageLengthYears: 25,
      paymentFreqPerYear: 12,
      interest: 3.54,
      utilities: 400,
      propertyTax: 150,
      insurance: 175,
      maintenance: 200,
      rent: 2500
    };

    // Binding to let the UI use these
    this.handleChange = this.handleChange.bind(this);
    this.handleFloatChange = this.handleFloatChange.bind(this);
    this.saveProperty = this.saveProperty.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleFloatChange(event) {
    this.setState({
      [event.target.name]: parseFloat(event.target.value)
    });
  }
  saveProperty(event) {
    console.log(this.state)
  }

  render() {
    return (
      <div className="container-fluid form">
        
        <button className="saveButton" onClick={this.saveProperty}>Save</button>
        {/* <button className="saveButton" onClick={this.saveProperty}>Duplicate</button>
        <button className="saveButton" onClick={this.saveProperty}>Delete</button> */}
        <div className="row">
          <div className="">Address:</div>
            <input
              className="col-md-6"
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
            />
        </div>
        
        <br></br>

        {/* Mortgage Expenses */}
        <div className='logic-section col-lg-6'>
          <MortgageCalculator
            stateProp={Object.assign({}, this.state)}
            onClick={this.handleFloatChange}
          />
          <div className='totals'>
            Monthly Payment: <Currency value={this.calculatePayment()}> </Currency>
          </div>
          <div className='totals'>
            Equity gained per year: <Currency value={this.calculateEquityGainedAfterYear()}> </Currency>
          </div>
        </div>

        {/* Operating Expenses */}
        <div className='logic-section col-lg-6'>
          <OperatingExpenses
            stateProp={Object.assign({}, this.state)}
            onClick={this.handleFloatChange}
          />
          <div className='totals'>
            Operating Expenses: <Currency value={this.calculateOperatingExpenses()}> </Currency>
          </div>
        </div>
        
        <hr/>

        {/* Totals! */}
        <form>
          <h3>Cashflow</h3>
          <label>
            <p>Monthly Rent Collected:</p>
            <input
              type="number"
              name="rent"
              value={this.state.rent}
              onChange={this.handleFloatChange}
            />{" "}
          </label>
          
          <label>
            <p>Monthly Cash Flow:{" "}</p>
            <p style={this.getCashFlowStyle()}>
              {" "}
              <Currency value={this.calculateCashFlow()}> </Currency>
            </p>
          </label>
          <h3> Yearly Turnover </h3>
          <div className='totals'>
            equity gain:{" "}
            <Currency value={this.calculateEquityGainedAfterYear()}>
              {" "}
            </Currency>{" "}
            <br />
            cash flow gain:{" "}
            <Currency value={this.calculateCashFlow() * 12}> </Currency>
            <br />
            Yearly Net Income:{" "}
            <Currency value={this.calculateYearlyIncome()}> </Currency>
          </div>
        </form>
        <hr/>
        <form>
          <DownPayment yearlyIncome={this.calculateYearlyIncome()}>
            {" "}
          </DownPayment>{" "}
        </form>
        {/* Email results to me: <EmailResults state={this.state}/> <button>bloop</button> */}{" "}
        {/* Text results to me: <TextResults state={this.state}/> <button>bloop</button> */}{" "}
      </div>
    );
  }

  calculatePayment() {
    const apr = this.state.interest / 1200;
    const term = this.state.paymentFreqPerYear * this.state.mortgageLengthYears;
    var payment =
      (this.state.principal * (apr * Math.pow(1 + apr, term))) /
      (Math.pow(1 + apr, term) - 1);
    return payment;
  }

  calculateBalance() {
    const apr = this.state.interest / 1200;
    const term = this.state.paymentFreqPerYear * this.state.mortgageLengthYears;
    return (
      this.state.principal *
      ((Math.pow(1 + apr, term) - Math.pow(1 + apr, 12)) /
        (Math.pow(1 + apr, term) - 1))
    );
  }

  calculateEquityGainedAfterYear() {
    return this.state.principal - this.calculateBalance();
  }

  calculateOperatingExpenses() {
    return (
      this.state.utilities.valueOf() +
      this.state.propertyTax +
      this.state.insurance +
      this.state.maintenance +
      this.calculatePayment()
    );
  }

  calculateCashFlow() {
    return this.state.rent - this.calculateOperatingExpenses();
  }

  getCashFlowStyle() {
    return this.state.rent - this.calculateOperatingExpenses() > 0
      ? {
          color: "green",
          display: "inline"
        }
      : {
          color: "red",
          display: "inline"
        };
  }

  calculateYearlyIncome() {
    return (
      this.calculateEquityGainedAfterYear() + this.calculateCashFlow() * 12
    );
  }
}

export default Form;
