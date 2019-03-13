import React, {Component} from 'react';
import Currency from 'react-currency-format'

class DownPayment extends Component {
    constructor(props) {
        super(props);
        this.state={
            downPayment: 50000
        }
        // Binding to let the UI use these
        this.handleEventChange = this.handleEventChange.bind(this);
    }

    handleEventChange(event) {
        this.setState({
          [event.target.name]: parseInt(event.target.value)
        });
      }

    render() {
        return (
            <div>
                <label>
                    Down Payment (Optional):
                    <input
                        type="number"
                        name="downPayment"
                        value={this.state.downPayment}
                        onChange={this.handleEventChange}
                    />
                </label>

                <br/>

                <label>
                    ROI: % { (this.props.yearlyIncome / this.state.downPayment * 100).toFixed(3) }
                </label>
            </div>
        );
    }
}

export default DownPayment;