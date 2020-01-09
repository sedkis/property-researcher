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
      property: Object.assign({},this.props.property)
    };

    // Binding to let the UI use these
    this.handleOperatingCostsFloatChange = this.handleOperatingCostsFloatChange.bind(this);
    this.handleMortgageFloatChange = this.handleMortgageFloatChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleFloatChange = this.handleFloatChange.bind(this);
    this.saveProperty = this.saveProperty.bind(this);
  }

  // Update State whens App.js passes in new Property
  UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({
        property: Object.assign({},nextProps.property)
      });
  }

  render() {
    return (
      <div className="container-fluid form">

        <button className="saveButton" onClick={this.saveProperty}>Save</button>
        {/* TODO */}
        {/* Email results to me: <EmailResults state={this.state}/> <button>bloop</button> */}{" "}
        {/* Text results to me: <TextResults state={this.state}/> <button>bloop</button> */}{" "}
        {/* <button className="saveButton" onClick={this.saveProperty}>Duplicate</button>
        {/* <button className="saveButton" onClick={this.saveProperty}>Import from API?</button>
        <button className="saveButton" onClick={this.saveProperty}>Delete</button> */}

        <br></br>

        <div className="row">
          <div className="">Address:</div>
          <input
            className="col-md-6"
            type="text"
            name="address"
            value={this.state.property.address}
            onChange={this.handleAddressChange}
          />
        </div>

        <br></br>

        {/* Mortgage Expenses */}
        <div className='logic-section col-lg-6'>
          <MortgageCalculator
            stateProp={Object.assign({}, this.state.property.mortgage)}
            onFloatChange={this.handleMortgageFloatChange}
          />
          <div className='totals'>
            Monthly Payment: <Currency value={this.calculateMortgagePayment()}> </Currency>
          </div>
        </div>

        {/* Operating Expenses */}
        <div className='logic-section col-lg-6'>
          <OperatingExpenses
            operatingCosts={Object.assign({}, this.state.property.operatingCosts)}
            onFloatChange={this.handleOperatingCostsFloatChange}
          />
          <div className='totals'>
            Operating Expenses: <Currency value={this.calculateOperatingExpenses()}> </Currency>
          </div>
        </div>

        <hr />

        {/* Totals! */}
        <form>
          <h3>Cashflow</h3>
          <label>
            <p>Monthly Rent Collected:</p>
            <input
              type="number"
              name="monthlyIncome"
              value={this.state.property.monthlyIncome}
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

        <hr />
      </div>
    );
  }

  copyProperty(){
    return JSON.parse(JSON.stringify({
      mortgage: this.state.property.mortgage,
      operatingCosts: this.state.property.operatingCosts,
      monthlyIncome: this.state.property.monthlyIncome,
      address: this.state.property.address,
      id: this.state.property.id
    }))
  }

  handleAddressChange(event) {
    var property = this.copyProperty()
    property.address = event.target.value;
    this.setState({property})
  }

  handleFloatChange(event) {
    if (!parseFloat(event.target.value))
      event.target.value = 0 

    var property = this.copyProperty()
    property.monthlyIncome = parseFloat(event.target.value)
    this.setState({property})
  }

  handleMortgageFloatChange(event) {
    if (!parseFloat(event.target.value))
      event.target.value = 0

    var property = this.copyProperty();
    property.mortgage[event.target.name] = parseFloat(event.target.value)
    this.setState({property})  
  }

  handleOperatingCostsFloatChange(event) {
    if (!parseFloat(event.target.value))
      event.target.value = 0

    var property = this.copyProperty();
    property.operatingCosts[event.target.name] = parseFloat(event.target.value)
    this.setState({property})  
  }

  saveProperty(event) {
    this.props.addPropertyToList(this.state.property)
  }

  calculateMortgagePayment() {
    const apr = this.state.property.mortgage.interest / 1200;
    const term = this.state.property.mortgage.paymentFreqPerYear * this.state.property.mortgage.mortgageLengthYears;
    var payment =
      (this.state.property.mortgage.principal - this.state.property.mortgage.downPayment)* (apr * Math.pow(1 + apr, term)) /
      (Math.pow(1 + apr, term) - 1);
    return payment;
  }

  calculateBalance() {
    const apr = this.state.property.mortgage.interest / 1200;
    const term = this.state.property.mortgage.paymentFreqPerYear * this.state.property.mortgage.mortgageLengthYears;
    return (
      this.state.property.mortgage.principal *
      ((Math.pow(1 + apr, term) - Math.pow(1 + apr, 12)) /
        (Math.pow(1 + apr, term) - 1))
    );
  }

  calculateEquityGainedAfterYear() {
    return this.state.property.mortgage.principal - this.calculateBalance();
  }

  calculateOperatingExpenses() {
    return (
      this.state.property.operatingCosts.utilities +
      this.state.property.operatingCosts.propertyTax +
      this.state.property.operatingCosts.insurance +
      this.state.property.operatingCosts.maintenance +
      this.state.property.operatingCosts.other
    );
  }

  calculateCashFlow() {
    return this.state.property.monthlyIncome - this.calculateMortgagePayment() - this.calculateOperatingExpenses();
  }

  getCashFlowStyle() {
    return this.state.property.monthlyIncome - this.calculateOperatingExpenses() > 0
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
