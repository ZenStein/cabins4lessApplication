import * as types from '../actions/actionTypes'
import initialState from './initialState'
export default function smsBlastReducer(state = initialState.courses, action){
 //   console.log('smsreducer action', action)
    switch(action.type){
        case types.SMS_BLAST_SUCCESS:
            return action.sms
        default:
            return state
    }                    
}