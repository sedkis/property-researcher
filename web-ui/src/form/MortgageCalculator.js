import React, {Component} from 'react';

class MortgageCalculator extends Component {
    render() {
        return (
            <form>
                <h3>Mortgage Expenses</h3>
                <label>
                    Principal:
                    <input type={'number'} 
                            name='principal'
                            value={this.props.stateProp.principal} 
                            onChange={this.props.onClick}/>
                </label>

                <br></br>

                <label>
                    Term Length (Amortized, Years):
                    <input type="number" 
                            name='mortgageLengthYears'
                            value={this.props.stateProp.mortgageLengthYears} 
                            onChange={this.props.onClick}/>
                </label>

                <br></br>

                <label>
                    Payment Frequency:
                    <select value={this.props.stateProp.paymentFreqPerYear} 
                            name='paymentFreqPerYear'
                            onChange={this.props.onClick}>
                        <option value={26}>Biweekly</option>
                        <option value={12}>Monthly</option>
                    </select>
                </label>

                <br></br>

                <label>
                    Interest Rate:
                    <input type="number" 
                            name='interest'
                            value={this.props.stateProp.interest} 
                            onChange={this.props.onClick}/>
                </label>
            
            </form>
        )
    }
}

export default MortgageCalculator;