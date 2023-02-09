import './App.css';
import React, { Component } from 'react';
import './CreateForm.css';

let keywords = ["phone", "laptop", "expensive", "cheap", "IOS"]
const cities = ["", "New York", "London", "Warsaw", "Berlin", "Barcelona"]
const minBidAmount = 100

class CreateForm extends Component {
    constructor(props) {
        super(props)
        this.state={...this.props.initialObj, bidAmount: minBidAmount}

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
            this.props.updateItem(this.state, this.props.changeId)
            this.props.updateStatusChange()
        }
        this.setState({...this.props.initialObj, bidAmount: minBidAmount})
        this.keyWordInput.current.value=""
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
            <form className='input-form'>

                <div className='input-form__group' key="nameGroup">
                    <label>Enter campaign name:</label>
                    <input required type = "text" autoComplete="off" placeholder='campaign name' id="name" value={this.state.name} onChange={this.nameChangeHandle}/>
                </div>

                <div className='input-form__group' key="keywordsGroup">
                    <label>Enter keywords: </label>
                    <div>
                        <input required autoComplete="off" type = "text" placeholder='keywords' key="keywords" name="keywords" list="keywords" ref={this.keyWordInput} onBlur={this.addKeyword}/>
                        <input value="+" type="submit" onClick={this.addKeyword} key="keywordsSubmit"/>
                        <datalist id="keywords">
                            {keywords.map(value=><option key={value}>{value}</option>)}
                        </datalist>
                    </div>
                    {
                        this.state.keyWords.map((el, iter)=>{
                                return <div><span>{el}</span> <button iter={iter} onClick={this.deleteKeyWord}>-</button></div>
                            }
                        )
                    }
                </div>

                <div className='input-form__group' key="bidAmountGroup">
                    <label>Enter bid amount:</label>
                    <input required type = "number" placeholder="bid amount" id = "bid" min={minBidAmount+""} value={this.state.bidAmount} onChange={this.bidAmountChangeHandle}/>
                </div>

                <div className='input-form__group' key="campaignFoundGroup">
                    <label>Enter the campaign fund:</label>
                    <input required type = "number" placeholder='campaign fund' id="fund" min="1" value={this.state.campaignFund} onChange={this.campaignFundChangeHandle}/>
                </div>

                <div className='input-form__group' key="statusGroup">
                    <label>Enter the status:
                        <input required type = "checkbox" id="status" checked={this.state.status==="on"} onChange={this.statusChangeHandle}/>
                    </label>
                </div>

                <div className='input-form__group' key="townGroup">
                    <label>Choose the town:</label>
                    <select name = "town" value={this.state.town} id="town" onChange={this.townChangeHandle}>
                        {cities.map(value=><option key={value} value={value}>{value}</option>)}
                    </select>
                </div>

                <div className='input-form__group' key="radiusGroup">
                    <label>Enter the radius: </label>
                    <input type="number" id="radius" min="0" value={this.state.radius} onChange={this.radiusChangeHandle}/>
                </div>

                <button className="input-form__button" type="submit" onClick={this.submitHandle}>submit</button>
            </form>
        )
    }
}

export default CreateForm