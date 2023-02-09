import React, { Component } from 'react';
import "./Item.css"

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
            <button className={this.props.className} onClick={this.deleteItem}>Delete</button>
        )
    }
}

export default Delete