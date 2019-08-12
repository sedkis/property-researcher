import React, {Component} from 'react';
import CurrencyFormat from 'react-currency-format'

class Currency extends Component {

    render() {
        return (<CurrencyFormat value={ this.props.value.toFixed(2) } 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                prefix={'$'} />
        );
    }

}

export default Currency;