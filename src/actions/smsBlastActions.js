import smsBlastApi from '../api/smsBlastApi'
import * as types from './actionTypes'


export function smsBlastSuccess(sms){
    return {type: types.SMS_BLAST_SUCCESS, sms}
}

export function smsBlast(sms){
    return function(dispatch){
        return smsBlastApi.sendBlast(sms).then(blasted => {
            console.log('blasted=', blasted)
            dispatch(smsBlastSuccess(blasted))
        }).catch(err => {
            throw(err)
        })
    }
}