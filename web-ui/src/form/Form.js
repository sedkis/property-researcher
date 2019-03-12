import React, { Component } from 'react';
import EmailResults from './EmailResults';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lengthYears: 5,
            sprintLength: 12,
            interest: 0.05
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLengthChange = this.handleLengthChange.bind(this);
        this.handleSprintLengthChange = this.handleSprintLengthChange.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value})
    }
    handleLengthChange(event) {
        this.setState({lengthYears: event.target.value})
    }

    handleSprintLengthChange(event) {
        this.setState({sprintLength: event.target.value})
    }

    render() {    

        return (
        <div>
            <form>

                <label>
                    Lab Name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
                </label>

                <br></br>

                <label>
                    MVP Release Years:
                    <input type="number" value={this.state.lengthYears} onChange={this.handleLengthChange}/>
                </label>

                <br></br>

                <label>
                    Sprint Length:
                    <select value={this.state.sprintLength} onChange={this.handleSprintLengthChange}>
                        <option value={26}>Biweekly</option>
                        <option value={12}>Monthly</option>
                    </select>
                </label>

                <br></br>

                <label>
                    Interest Rate:
                    <input type="number" value={this.state.interest} onChange={this.handleLengthChange}/>
                </label>
            
                <br/>
                <input type="submit" value="Submit" />
            
            </form>

            <br/>
            Return: { this.state.lengthYears * this.state.sprintLength * this.state.interest }
            <br></br><br/><br/>
            {/* Email results to me: <EmailResults state={this.state}/> <button>bloop</button> */}
            {/* Text results to me: <TextResults state={this.state}/> <button>bloop</button> */}
        </div>
        )
    }
}

export default Form;