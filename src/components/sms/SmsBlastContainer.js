import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as smsActions from '../../actions/smsBlastActions'
import toastr from 'toastr'
import 'whatwg-fetch'

class SmsBlast extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            numbers: [],
            message: 'Welcome Cabins 4 Less arrival'
        }
       this.blastSms = this.blastSms.bind(this); 
       this.onChangeNumber = this.onChangeNumber.bind(this);
       this.onChangeMessage = this.onChangeMessage.bind(this);
       this.didPaste = this.didPaste.bind(this);
    }
    blastSms(event){
        event.preventDefault()
        // console.log('fetching data', this.state)
        // fetch('/testems', {
        //     method: 'POST',
        //     headers: {'Content-type': 'application/json'},
        //     body: JSON.stringify(this.state)
        // })
        console.log('this.props from blastSms:', this.props)
        this.props.actions.smsBlast(this.state).then(() => {
             toastr.success('Sms-blasted')
        })
    }
    onChangeNumber(event){
        console.log('onchangeNumber')
      //  console.log(this.refs.phoneNumbers.value)
        event.preventDefault()
        let newNumbers = numberStringToFormattedArray(event.target.value)
        this.setState({numbers: newNumbers})
  //      console.log('onChangeNumber', this.state.numbers)
    }
    onChangeMessage(event){
        event.preventDefault()
        const newMessage = event.target.value
        this.setState({message: newMessage})
        console.log('onChangeMessage',this.state.message)
    }
    didPaste(event){
        console.log('didpaste')
        console.log(this.refs.phoneNumbers.value)
        let newNumbers = numberStringToFormattedArray(event.clipboardData.getData('Text'))
        this.setState({numbers: newNumbers})
    }
    render() {
        return (
            <div>
                <h1>Sms Blaster</h1>
                <form className="form-horizontal" onSubmit={this.blastSms}>
                    <div className="form-group">
                        <label for="phoneNumbers" className="col-sm-2 control-label">Numbers</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="phoneNumbers" ref="phoneNumbers" onChange={this.onChangeNumber} onPaste={this.didPaste} placeholder="Phone Numbers" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="message" className="col-sm-2 control-label">Message</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" rows="3" onChange={this.onChangeMessage} id="smsMessage" value={this.state.message}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary">Blast Messages</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
    
}
function numberStringToFormattedArray(text){
    return text.split(',')
        .map(number => {
            return number.replace(/[^0-9,]/g, "");
        })
        .filter(number => {
           // console.log(number.length > 0)
            return number.length > 0 || number === ','
        })        
}
SmsBlast.propTypes = {

};
function mapstate(state){
    return state
}
function mapdispatch(dispatch){
    return {
        actions: bindActionCreators(smsActions, dispatch)
    }    
}
export default connect(mapstate, mapdispatch)(SmsBlast);