import React, { Component } from 'react';
// import EmailResults from './EmailResults';
import CurrencyFormat from 'react-currency-format';
import MortgageCalculator from './MortgageCalculator';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            principal: 200000,
            mortgageLengthYears: 25,
            paymentFreqPerYear: 12,
            interest: 3.54
        }

        // Binding to let the UI use these 
        this.handlePrincipalChange = this.handlePrincipalChange.bind(this);
        this.handleMortgageLengthChange = this.handleMortgageLengthChange.bind(this);
        this.handlePaymentFreqChange = this.handlePaymentFreqChange.bind(this);
        this.handleInterestChange = this.handleInterestChange.bind(this);
        // Binding to state to pass to MortgageCalculator
        this.state.handlePrincipalChange = this.handlePrincipalChange;
        this.state.handleMortgageLengthChange = this.handleMortgageLengthChange;
        this.state.handlePaymentFreqChange = this.handlePaymentFreqChange;
        this.state.handleInterestChange = this.handleInterestChange;
    }

    handlePrincipalChange(event) {this.setState({principal: event.target.value})}
    handleMortgageLengthChange(event) {this.setState({mortgageLengthYears: event.target.value})}
    handlePaymentFreqChange(event) {this.setState({paymentFreqPerYear: event.target.value})}
    handleInterestChange(event) { this.setState({interest: event.target.value});}
    
    render() {    

        return (
        <div>
            <MortgageCalculator 
                stateProp = {Object.assign({}, this.state)}
            ></MortgageCalculator>
            <br/>
            Payment: <CurrencyFormat value={ this.calculatePayment().toFixed(2) } displayType={'text'} thousandSeparator={true} prefix={'$'} />
            <br/>
            Equity gained per year: <CurrencyFormat value={(this.state.principal - this.calculateBalance()).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            
            <hr></hr>

            <form>
            <h3>Cash flow projection</h3>
            </form>

            <br></br><br/><br/>
            {/* Email results to me: <EmailResults state={this.state}/> <button>bloop</button> */}
            {/* Text results to me: <TextResults state={this.state}/> <button>bloop</button> */}
        </div>
        )
    }

    calculatePayment() {
        const apr = this.state.interest/1200;
        const term = this.state.paymentFreqPerYear * this.state.mortgageLengthYears;
        var payment = this.state.principal*(apr * Math.pow((1 + apr), term))/(Math.pow((1 + apr), term) - 1);
        return payment;
    }

    calculateBalance() {
        const apr = this.state.interest/1200;
        const term = this.state.paymentFreqPerYear * this.state.mortgageLengthYears;
        return this.state.principal*((Math.pow(1+apr, term)-Math.pow(1+apr, 12)) / (Math.pow(1+apr, term) -1));
    }

    calculateEquityGainedAfterYear() {

    }
}

export default Form;