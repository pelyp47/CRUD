import React, { Component } from 'react';
import Update from './Update';
import Delete from './Delete';
import CreateForm from './CreateForm';
import "./Item.css"

class Item extends Component {
    constructor(props) {
        super(props)

        this.state = {
          isUpdating: false,
          item: {...this.props.item}
        }

        this.updateStatusChange = this.updateStatusChange.bind(this)
        this.updateItem = this.updateItem.bind(this)
    }

    updateStatusChange(event) {
      this.setState({...this.state, isUpdating: ! this.state.isUpdating})
    }
    updateItem(newItemObj) {
      this.setState({...this.state, isUpdating:false, item: {...newItemObj}})
    }
    render() {
      if(this.state.isUpdating) {
        return <CreateForm formType="update" key="form" initialObj={this.state.item} updateItem={this.updateItem}/>
      }
      else {
        return (
        <article className="item">
            <h2>{this.state.item.name}</h2>
            <p>{this.state.item.keyWords.map(word=><span>{word+" "}</span>)}</p>
            <p>{this.state.item.bidAmount}$</p>
            <p>{this.state.item.campaignFund}$</p>
            <p>{this.state.item.town}</p>
            <p>{this.state.item.status}</p>
            <p>{this.state.item.radius}km</p>
            <div className="item__button-wrapper">
              <Update className="item__button" updateStatusChange={this.updateStatusChange}/>
              <Delete className="item__button" deleteId={this.props.deleteId} deleteFunc={this.props.deleteFunc}/>
            </div>
          </article>)
      }
    }
}

export default Item