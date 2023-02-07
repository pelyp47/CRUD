import React, { Component } from 'react';
import Update from './Update';
import Delete from './Delete';

class Item extends Component {
    constructor() {
        super()
    }
    render() {
        return (
        <article>
            <h2>{this.props.item.name}</h2>
            <p>{this.props.item.keyWords.map(word=><span>{word+" "}</span>)}</p>
            <p>{this.props.item.bidAmount}$</p>
            <p>{this.props.item.campaignFund}$</p>
            <p>{this.props.item.town}</p>
            <p>{this.props.item.status}</p>
            <p>{this.props.item.radius}km</p>
            <div>
              <Update/>
              <Delete/>
            </div>
          </article>)
    }
}

export default Item