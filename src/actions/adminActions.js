import adminApi from '../api/adminApi'
import * as types from './actionTypes'
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions'

export function saveUnitSuccess(unit){
    return {type: types.SAVE_UNIT_SUCCESS, unit}
}
export function getUnitsSuccess(units){
    return {type: types.GET_UNITS_SUCCESS, units}
}
export function getUnits(){
    return function(dispatch){
        dispatch(beginAjaxCall())
        return adminApi.getUnits().then(units => {
            dispatch(getUnitsSuccess(units))
            return units
        }).catch(error => {
            throw(error)
        })
    }
}
export function saveUnit(unit, key){
    return function(dispatch){
        dispatch(beginAjaxCall())
        return adminApi.saveUnit(unit, key).then(units => {
            //console.log('.then in save units', units)
            dispatch(saveUnitSuccess(units))
            return units
        }).catch(error => {
            throw(error)
        })
    }
}
