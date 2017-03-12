import 'whatwg-fetch' 
import firebase from '../base'



class adminApi {

    static saveUnit(unit, key){
        console.log('savingUnit', unit)
        return fetch('/save-unit', {
             method: 'POST',
             headers: {'Content-type': 'application/json'},
             body: JSON.stringify({unit, key})
         }).then((res) => {
             //console.log('saveUnit second param', t)
             if(res.status != 200){
                 throw('error saving unit')
             }
             console.log('res', res)
             return res.json()
         })      
        //console.log('here in sendBlastApi2', sms)
        // return new Promise((resolve, reject) => {
        //     resolve(unit)
        // })
    }
    static getUnits(){
       // console.log('getunits called')
        return new Promise((resolve, reject) =>{
        let unitsRef = firebase.database().ref('units')
        unitsRef.once('value', snap => {
    //    console.log('units', snap.val())
          resolve(snap.val())
        })
        })
    }
}

export default adminApi