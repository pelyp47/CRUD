import React, { Component } from 'react';
import "./Item.css"

class Update extends Component {
    constructor() {
        super()


    }

    render() {
        return(
            <button className={this.props.className} onClick={this.props.updateStatusChange}>Update</button>
        )
    }
}

export default Update