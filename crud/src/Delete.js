import React, { Component } from 'react';

class Delete extends Component {
    constructor() {
        super()

        this.deleteItem = this.deleteItem.bind(this)
    }

    deleteItem() {
        console.log(this.props.id)
        this.props.deleteFunc(this.props.deleteId)
    }

    render() {
        return(
            <button onClick={this.deleteItem}>Delete</button>
        )
    }
}

export default Delete