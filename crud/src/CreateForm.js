import './App.css';
import React, { Component } from 'react';
import './CreateForm.css';

const keywords = ["phone", "laptop", "expensive", "cheap", "IOS"]
const cities = ["", "New York", "London", "Warsaw", "Berlin", "Barcelona"]
const minBidAmount = 100

class CreateForm extends Component {
    constructor(props) {
        super(props)
        this.state={...this.props.initialObj}

        this.keyWordInput = React.createRef()

        this.submitHandle = this.submitHandle.bind(this)
        this.nameChangeHandle = this.nameChangeHandle.bind(this)
        this.addKeyword = this.addKeyword.bind(this)
        this.deleteKeyWord = this.deleteKeyWord.bind(this)
        this.bidAmountChangeHandle = this.bidAmountChangeHandle.bind(this)
        this.campaignFundChangeHandle = this.campaignFundChangeHandle.bind(this)
        this.statusChangeHandle = this.statusChangeHandle.bind(this)
        this.townChangeHandle = this.townChangeHandle.bind(this)
        this.radiusChangeHandle = this.radiusChangeHandle.bind(this)
    }
    
    submitHandle(event) {
        event.preventDefault()

        //validation
        if (!this.state.name || !this.state.town) {
            alert("fill all empty fields please")
            return
        }
        if (this.state.keyWords.length===0) {
            alert("enter some key words")
            return
        }
        if (this.state.bidAmount<minBidAmount) {
            alert("the bid amount is too low")
            return
        }
        if (this.state.radius<0) {
            alert("incorrect radius")
            return
        }
        if (this.state.campaignFund<1) {
            alert("incorrect campaign fund")
            return
        }
        if(this.props.formType==="create") {
            this.props.addItem({...this.state})
        }
        else {
            this.props.updateItem(this.state)
        }
        this.setState({...this.props.initialObj})
    }

    nameChangeHandle(event) {
        this.setState({...this.state, name: event.target.value})
    }

    addKeyword(event) {
        if(!this.keyWordInput.current.value)return
        if(this.state.keyWords.includes(this.keyWordInput.current.value)) {
            alert("you've already added this keyword")
            return
        }
        if(!keywords.includes(this.keyWordInput.current.value)) {
            alert("this keyword is unavailable for now")
            return
        }
        this.setState({...this.state, keyWords:[...this.state.keyWords, this.keyWordInput.current.value]})
        this.keyWordInput.current.value=""
    }

    deleteKeyWord(event) {
        this.setState({...this.state, keyWords: [...this.state.keyWords.filter((el, i)=>{
            return i!=event.target.getAttribute("iter");
        })]})
    }

    bidAmountChangeHandle(event) {
        this.setState({...this.state, bidAmount: event.target.value})
    }

    campaignFundChangeHandle(event) {
        this.setState({...this.state, campaignFund: event.target.value})
    }

    statusChangeHandle(event) {
        this.setState({...this.state, status: event.target.checked ? "on" : "off"})
    }

    townChangeHandle(event) {
        this.setState({...this.state, town: event.target.value})
    }

    radiusChangeHandle(event) {
        this.setState({...this.state, radius: event.target.value})
    }

    render() {
        return (
            <div className='input-form'>
                <label htmlFor="name">Enter campaign name:
                <input required type = "text" autoComplete="off" placeholder='campaign name' id="name" value={this.state.name} onChange={this.nameChangeHandle}/>
                </label>

                <label for="keywords">Enter keywords: 
                {this.state.keyWords.map((el, iter)=>{
                    return <div><span>{el}</span> <button iter={iter} onClick={this.deleteKeyWord}>-</button></div>
                    })
                }
                <input required autoComplete="off" type = "text" placeholder='keywords' name="keywords" list="keywords" ref={this.keyWordInput} onBlur={this.addKeyword}/>
                <input value="+" type="submit" onClick={this.addKeyword}/>
                <datalist id="keywords">
                    {keywords.filter((el)=>!this.state.keyWords.includes(el)).map(value=><option>{value}</option>)}
                </datalist>
                </label>


                <label for="bid">Enter bid amount:
                <input required type = "number" placeholder="bid amount" name = "bid" min={minBidAmount+""} value={this.state.bidAmount} onChange={this.bidAmountChangeHandle}/>
                </label>

                <label for="fund">Enter the campaign fund:
                <input required type = "number" placeholder='campaign fund' name="fund" min="1" value={this.state.campaignFund} onChange={this.campaignFundChangeHandle}/>
                </label>

                <label for="status">Enter the status:
                <input required type = "checkbox" name="status" checked={this.state.status==="on"} onChange={this.statusChangeHandle}/>
                </label>
                
                <label for="town">Choose the town:
                <select name = "town" value={this.state.town} onChange={this.townChangeHandle}>
                    {cities.map(value=><option value={value}>{value}</option>)}
                </select>
                </label>

                <label for="radius">Enter the radius:
                    <input type="number" name="radius" min="0" value={this.state.radius} onChange={this.radiusChangeHandle}/>
                </label>
                
                <button type="submit" onClick={this.submitHandle}>submit</button>
            </div>
        )
    }
}

export default CreateForm