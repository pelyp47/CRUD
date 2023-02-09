import './App.css';
import React, { Component } from 'react';
import CreateForm from './CreateForm';
import Item from './Item';
import EmeraldBalance from './EmeraldBalance';
import axios from 'axios';

const initialItem = {
  name: "",
  keyWords: [],
  bidAmount: 0,
  campaignFund: 1,
  status: "off",
  town: "",
  radius: 0
}
const initialBalance = 2000

const initialState = {
  items:[],
  balance: initialBalance
}
//localStorage.clear()
if(!localStorage.getItem("appState")) {
  localStorage.setItem("appState", JSON.stringify(initialState))
}
       
class App extends Component {
  constructor(props) {
    super()
    this.state=JSON.parse(localStorage.getItem("appState"))
    this.addItem=this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.changeItem = this.changeItem.bind(this)
    this.changeBalanceOnChangeBalance = this.changeBalanceOnChangeBalance.bind(this)
  }
  componentDidUpdate() {
    localStorage.setItem("appState", JSON.stringify(this.state))
  }
  changeBalanceOnChangeBalance(prevCampaignFund, newCampaignFund) {
    this.setState({...this.state, balance: this.state.balance-(newCampaignFund-prevCampaignFund)})
  }
  addItem(item) {
    this.setState({...this.state, items: [...this.state.items, item], balance: this.state.balance-item.campaignFund})
  }

  deleteItem(id) {
    this.setState({...this.state, items: [...this.state.items.filter((value, iter)=>iter!=id)], balance: this.state.balance+this.state.items[id].campaignFund})
  }

  changeItem(item, id) {
    this.setState({...this.state, items:  [...this.state.items.map((value, iter)=>id===iter?item:value)]})
  }

  render() {
    return (
      <>
        <header className="header">
          <EmeraldBalance balance={this.state.balance}/>
        </header>
        <main className='main'>
          <CreateForm key="mainForm" addItem={this.addItem} formType="create" initialObj={initialItem}/>
        
          {this.state.items.map((item, iter)=>{
            return (
              <Item key={iter+"item"} deleteId={iter} item={item} deleteFunc={this.deleteItem} changeFunc={this.changeItem} changeBalanceFunc={this.changeBalanceOnChangeBalance}/>
            )
          })}
        </main>
      </>
    )
  }
}

export default App;
