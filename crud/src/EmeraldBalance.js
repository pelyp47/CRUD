import React, { Component } from 'react';

class EmeraldBalance extends Component {
    render() {
        return <span>Balance: {this.props.balance}</span>
    }
}

export default EmeraldBalance