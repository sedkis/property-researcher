import React, { Component } from 'react';
// import EmailResults from './EmailResults';
import MortgageCalculator from './MortgageCalculator';
import OperatingExpenses from './OperatingExpenses';
import Currency from '../formatters/Currency'
import DownPayment from './DownPayment.js'
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
            
            Monthly Payment: <Currency value={this.calculatePayment()}></Currency><br/>
            Equity gained per year: <Currency value={this.calculateEquityGainedAfterYear()}></Currency>
            
            <hr/>

            <OperatingExpenses 
                stateProp = {Object.assign({}, this.state)}
                onClick = {this.handleEventChange}
            ></OperatingExpenses> 
            Operating Expenses: <Currency value={this.calculateOperatingExpenses()}></Currency>
           
           
           <form>
                <label>
                    Monthly Rent Collected:
                    <input type="number" 
                            name='rent'
                            value={this.state.rent} 
                            onChange={this.handleEventChange}/>
                </label><br/>
                <label>
                    Monthly Cash Flow: <p style={this.getCashFlowStyle()}><Currency value={this.calculateCashFlow()}></Currency></p>
                </label>

                <h3>Yearly Turnover</h3>
                equity gain: <Currency value={this.calculateEquityGainedAfterYear()}></Currency> <br/>
                cash flow gain: <Currency value={this.calculateCashFlow() * 12}></Currency><br/>
                Yearly Net Income: <Currency value={this.calculateYearlyIncome()}></Currency>

           </form>

           <form>
                <DownPayment yearlyIncome = {Object.assign({}, this.state)}></DownPayment>
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

    calculateYearlyIncome() {
        return this.calculateEquityGainedAfterYear() + (this.calculateCashFlow() * 12);
    }
}

export default Form;