import './App.css';
import React, { Component } from 'react';
import CreateForm from './CreateForm';
import Item from './Item';
import axios from 'axios';

// class App extends Component {
//   state = {
//     items: [],
//     item: {
//       name: '',
//       description: ''
//     }
//   };

//   componentDidMount() {
//     this.getItems();
//   }

//   getItems = () => {
//     axios.get('https://jsonplaceholder.typicode.com/posts')
//       .then(res => this.setState({ items: res.data }))
//       .catch(err => console.log(err));
//   };

//   handleChange = e => {
//     this.setState({
//       item: {
//         ...this.state.item,
//         [e.target.name]: e.target.value
//       }
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     axios.post('https://jsonplaceholder.typicode.com/posts', this.state.item)
//       .then(res => {
//         this.setState({
//           item: {
//             name: '',
//             description: ''
//           },
//           items: [...this.state.items, res.data]
//         });
//       })
//       .catch(err => console.log(err));
//   };

//   handleUpdate = (id, item) => {
//     axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, item)
//       .then(res => {
//         const items = this.state.items.map(i => (i.id === id ? res.data : i));
//         this.setState({ items });
//       })
//       .catch(err => console.log(err));
//   };

//   handleDelete = id => {
//     axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
//       .then(res => {
//         const items = this.state.items.filter(i => i.id !== id);
//         this.setState({ items });
//       })
//       .catch(err => console.log(err));
//   };

//   render() {
//     return (
//       <main>
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             value={this.state.item.name}
//             onChange={this.handleChange}
//             placeholder="Name"
//           />
//           <input
//             type="text"
//             name="description"
//             value={this.state.item.description}
//             onChange={this.handleChange}
//             placeholder="Description"
//           />
//           <button type="submit">Add Item</button>
//         </form>
//         </div>
//         <ul>
//           {this.state.items.map(item => (
//             <li key={item.id}>
//               {item.name} - {item.description}
//               <button onClick={() => this.handleUpdate(item.id, item)}>Update</button>
//               <button onClick={() => this.handleDelete(item.id)}>Delete</button>
//             </li>))}
//         </ul>
//       </main>
//         )
//       }
//     }
let initialItem = {
  name: "",
  keyWords: [],
  bidAmount: 0,
  campaignFund: 0,
  status: "",
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
        <CreateForm addItem={this.addItem}/>
        <main className='main'>
          {this.state.items.map((item, iter)=>{
            return (
              <Item key={iter} id={iter} item={item} deleteFunc={this.deleteItem}/>
            )
          })}
        </main>
      </>
    )
  }
}

export default App;
