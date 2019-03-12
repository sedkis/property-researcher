import React, { Component } from 'react';
// import EmailResults from './EmailResults';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            principal: 200000,
            mortgageLengthYears: 25,
            paymentFreqPerYear: 12,
            interest: 3.54
        }
        this.handlePrincipalChange = this.handlePrincipalChange.bind(this);
        this.handleMortgageLengthChange = this.handleMortgageLengthChange.bind(this);
        this.handlePaymentFreqChange = this.handlePaymentFreqChange.bind(this);
        this.handleInterestChange = this.handleInterestChange.bind(this);
    }

    handlePrincipalChange(event) {
        this.setState({principal: event.target.value})
    }
    handleMortgageLengthChange(event) {
        this.setState({mortgageLengthYears: event.target.value})
    }

    handlePaymentFreqChange(event) {
        this.setState({paymentFreqPerYear: event.target.value})
    }

    handleInterestChange(event) {
        this.setState({interest: event.target.value});
    }

    render() {    

        return (
        <div>
            <form>

                <label>
                    Principal:
                    <input type="number" value={this.state.principal} onChange={this.handlePrincipalChange}/>
                </label>

                <br></br>

                <label>
                    Term Length (Amortized, Years):
                    <input type="number" value={this.state.mortgageLengthYears} onChange={this.handleMortgageLengthChange}/>
                </label>

                <br></br>

                <label>
                    Payment Frequency:
                    <select value={this.state.paymentFreqPerYear} onChange={this.handlePaymentFreqChange}>
                        <option value={26}>Biweekly</option>
                        <option value={12}>Monthly</option>
                    </select>
                </label>

                <br></br>

                <label>
                    Interest Rate:
                    <input type="number" value={this.state.interest} onChange={this.handleInterestChange}/>
                </label>
            
            </form>
            
            <br>
            </br>
            Payment: { this.calculatePayment() }

            <br></br><br/><br/>
            {/* Email results to me: <EmailResults state={this.state}/> <button>bloop</button> */}
            {/* Text results to me: <TextResults state={this.state}/> <button>bloop</button> */}
        </div>
        )
    }
    calculatePayment()
    {
        const apr = this.state.interest/1200;
        const term = this.state.paymentFreqPerYear * this.state.mortgageLengthYears;
        var payment = this.state.principal*(apr * Math.pow((1 + apr), term))/(Math.pow((1 + apr), term) - 1);
        return payment;
    }
}

export default Form;