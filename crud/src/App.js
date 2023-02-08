import './App.css';
import React, { Component } from 'react';
import CreateForm from './CreateForm';
import Item from './Item';
import axios from 'axios';

const initialItem = {
  name: "",
  keyWords: [],
  bidAmount: 0,
  campaignFund: 0,
  status: "off",
  town: "",
  radius: 0
}
       
class App extends Component {
  constructor(props) {
    super()
    this.state={
      items: []
    }
    this.addItem=this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  addItem(item) {
    this.setState({...this.state, items: [...this.state.items, item]})
  }

  deleteItem(id) {
    this.setState({...this.state, items: [...this.state.items.filter((value, iter)=>iter!=id)]})
  }

  render() {
    return (
      <>
        <CreateForm addItem={this.addItem} formType="create" initialObj={initialItem}/>
        <main className='main'>
          {this.state.items.map((item, iter)=>{
            return (
              <Item key={iter} deleteId={iter} item={item} deleteFunc={this.deleteItem}/>
            )
          })}
        </main>
      </>
    )
  }
}

export default App;
