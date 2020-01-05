import React, { Component } from "react";
import './Panel.css'

class Panel extends Component {
    render() {
        return (
            <div className="panel">
                <h4>Potential Properties</h4>
                {this.getPanelContent()}
            </div>
        )
    }

    getPanelContent() {
        var panelContent;
        if (mockPayload && mockPayload.length > 0) {
            panelContent =
                <ul>
                    {mockPayload.map((value, index) => <li key={index}>{value.address}</li>)}
                </ul>
        } else {
            panelContent =
                <p>
                    Add something new!
                </p>
        }

        return panelContent
    }
}



const mockPayload = [
    {
        "address": "55 hale street",
        "insurance": 175,
        "interest": 3.54,
        "maintenance": 200,
        "mortgageLengthYears": 25,
        "paymentFreqPerYear": 12,
        "principal": 450000,
        "propertyTax": 150,
        "rent": 2500,
        "utilities": 400
    },
    {
        "address": "810 wild rose",
        "insurance": 175,
        "interest": 3.54,
        "maintenance": 200,
        "mortgageLengthYears": 25,
        "paymentFreqPerYear": 12,
        "principal": 200000,
        "propertyTax": 150,
        "rent": 2500,
        "utilities": 400
    }
]

export default Panel;