import 'whatwg-fetch' 



class smsBlastApi {

    static sendBlast(sms){
         fetch('/testems', {
             method: 'POST',
             headers: {'Content-type': 'application/json'},
             body: JSON.stringify(sms)
         })        
        //console.log('here in sendBlastApi2', sms)
        return new Promise((resolve, reject) => {
            resolve({this: 'supposed to be blasted'})
        })
    }
}

export default smsBlastApi