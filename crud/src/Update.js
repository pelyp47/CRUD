import React, { Component } from 'react';

class Update extends Component {
    constructor() {
        super()


    }

    render() {
        return(
            <button onClick={this.props.updateStatusChange}>Update</button>
        )
    }
}

export default Update