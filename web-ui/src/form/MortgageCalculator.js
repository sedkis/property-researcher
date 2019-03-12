import React, {Component} from 'react';

class MortgageCalculator extends Component {
    render() {
        return (
            <form>

                <label>
                    Principal:
                    <input type="number" 
                            value={this.props.stateProp.principal} 
                            onChange={this.props.stateProp.handlePrincipalChange}/>
                </label>

                <br></br>

                <label>
                    Term Length (Amortized, Years):
                    <input type="number" 
                            value={this.props.stateProp.mortgageLengthYears} 
                            onChange={this.props.stateProp.handleMortgageLengthChange}/>
                </label>

                <br></br>

                <label>
                    Payment Frequency:
                    <select value={this.props.stateProp.paymentFreqPerYear} 
                            onChange={this.props.stateProp.handlePaymentFreqChange}>
                        <option value={26}>Biweekly</option>
                        <option value={12}>Monthly</option>
                    </select>
                </label>

                <br></br>

                <label>
                    Interest Rate:
                    <input type="number" 
                            value={this.props.stateProp.interest} 
                            onChange={this.props.stateProp.handleInterestChange}/>
                </label>
            
            </form>
        )
    }
}

export default MortgageCalculator;