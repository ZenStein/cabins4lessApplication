import * as types from '../actions/actionTypes'
import initialState from './initialState'
export default function adminReducer(state = initialState.units, action){
   // console.log('action in adminReducer', action)
    switch(action.type){
        case types.SAVE_UNIT_SUCCESS:
            return action.unit
        case types.GET_UNITS_SUCCESS:
            return action.units            
        default: 
            return state
    }
}