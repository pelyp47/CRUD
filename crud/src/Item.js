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
        }

        this.updateStatusChange = this.updateStatusChange.bind(this)
        this.updateItem = this.updateItem.bind(this)
    }
    componentDidUpdate(prevProps) {
      if(prevProps.item.campaignFund!=this.props.item.campaignFund) {
        this.props.changeBalanceFunc(prevProps.item.campaignFund, this.props.item.campaignFund)
      }
    }
    updateStatusChange(event) {
      this.setState({...this.state, isUpdating: ! this.state.isUpdating})
    }
    updateItem(newItemObj) {
      this.setState({...this.state, isUpdating:false, item: {...newItemObj}})
    }
    render() {
      if(this.state.isUpdating) {
        return <CreateForm formType="update" key="form" initialObj={this.props.item} updateItem={this.props.changeFunc} changeId={this.props.deleteId} updateStatusChange={this.updateStatusChange}/>
      }
      else {
        return (
        <article className={`item ${this.props.item.status==="off"?"_off":""}`}>
            <h2 className="item__name">{this.props.item.name}</h2>
            <p className="item__info-wrapper" key="keywords">
              <span className="item__info-header" key="infoHeader">Keywords </span>
              <span className='item__keywords-wrapper'>
                {this.props.item.keyWords.map((word, i)=><span className="item__keyword" key={"info"+i}>{word+" "}</span>)}
              </span>
            </p>
            <p className="item__info-wrapper" key="bidAmount">
              <span className="item__info-header" key="infoHeader">Bid amount </span>
              <span className="item__info" key="info">{this.props.item.bidAmount}$</span>
            </p>
            <p className="item__info-wrapper" key="campaignFund">
              <span className="item__info-header" key="infoHeader">Campaign fund </span>
              <span className="item__info" key="info">{this.props.item.campaignFund}$</span>
            </p>
            <p className="item__info-wrapper" key="town">
              <span className="item__info-header" key="infoHeader">Town </span>
              <span className="item__info" key="info">{this.props.item.town}</span>
            </p>
            <p className="item__info-wrapper" key="status">
              <span className="item__info-header" key="infoHeader">Status </span>
              <span className="item__info" key="info">{this.props.item.status}</span>
            </p>
            <p className="item__info-wrapper" key="radius">
              <span className="item__info-header" key="infoHeader">Radius </span>
              <span className="item__info" key="info">{this.props.item.radius}km</span>
            </p>
            <div className="item__button-wrapper">
              <Update className="item__button" updateStatusChange={this.updateStatusChange}/>
              <Delete className="item__button" deleteId={this.props.deleteId} deleteFunc={this.props.deleteFunc}/>
            </div>
          </article>)
      }
    }
}

export default Item