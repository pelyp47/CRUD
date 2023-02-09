import React, { Component } from 'react';

const initialBalance = 2000

class EmeraldBalance extends Component {
    render() {
        return <span>Balance: {this.props.balance}</span>
    }
}

export default EmeraldBalance