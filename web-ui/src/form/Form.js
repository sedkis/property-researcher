import React, { Component } from 'react';
// import EmailResults from './EmailResults';
import CurrencyFormat from 'react-currency-format';
import MortgageCalculator from './MortgageCalculator';
import OperatingExpenses from './OperatingExpenses';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            principal: 200000,
            mortgageLengthYears: 25,
            paymentFreqPerYear: 12,
            interest: 3.54,
            utilities: 400,
            propertyTax: 150,
            insurance: 175,
            maintenance: 200,
            rent: 2500
        }

        // Binding to let the UI use these 
        this.handleEventChange = this.handleEventChange.bind(this);
    }

    handleEventChange(event) {
        this.setState({ [event.target.name] : parseInt(event.target.value)})
    }
    
    render() {    

        return (
        <div>
            <MortgageCalculator 
                stateProp = {Object.assign({}, this.state)}
                onClick = {this.handleEventChange}
            ></MortgageCalculator>
            <br/>
            Monthly Payment: <CurrencyFormat value={ this.calculatePayment().toFixed(2) } displayType={'text'} thousandSeparator={true} prefix={'$'} />
            <br/>
            Equity gained per year: <CurrencyFormat value={this.calculateEquityGainedAfterYear().toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            
            <hr/>

            <OperatingExpenses 
                stateProp = {Object.assign({}, this.state)}
                onClick = {this.handleEventChange}
            ></OperatingExpenses>
            <br></br>
            Operating Expenses: <CurrencyFormat value={ this.calculateOperatingExpenses() } 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                prefix={'$'} />
           <br/>
           
           <form>
                <label>
                    Monthly Rent Collected:
                    <input type="number" 
                            name='rent'
                            value={this.state.rent} 
                            onChange={this.handleEventChange}/>
                </label>
                <br/>
                <label>
                    <br/>
                    Monthly Cash Flow:  {<p style={this.getCashFlowStyle()}>{ this.calculateCashFlow() }</p>}
                </label>

                <h3>Yearly Turnover</h3>
                equity gain: {this.calculateEquityGainedAfterYear()} <br/>
                cash flow gain: {this.calculateCashFlow() * 12} <br/>
                Yearly Net Income: {this.calculateEquityGainedAfterYear() + this.calculateCashFlow() * 12}

           </form>



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
        return this.state.principal - this.calculateBalance()
    }

    calculateOperatingExpenses() {
        return this.state.utilities.valueOf() + 
                this.state.propertyTax +
                this.state.insurance + 
                this.state.maintenance + this.calculatePayment();
    }

    calculateCashFlow() {
        return this.state.rent - this.calculateOperatingExpenses()
    }

    getCashFlowStyle() {
        return ((this.state.rent - this.calculateOperatingExpenses()) > 0) ?
        {color:'green', display:'inline'} : {color:'red', display:'inline'}
    }
}

export default Form;