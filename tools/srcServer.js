import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import colors from 'colors'
import bodyParser from 'body-parser'
import firebase from '../src/base'

/* eslint-disable no-console */
import twilio from 'twilio'
var accountSid = 'AC2af87bd237bb23944bc873bb62c075a1';
var authToken = '1233cce6cec6474cdfc156c315980ddf';

//require the Twilio module and create a REST client
const client = twilio(accountSid, authToken);

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/testems', function(req, res){
  console.log('post testems called'.red)
  req.body.numbers.forEach((number) => {
        client.messages.create({
      to: `+1${number}`,
      from: "+14153196596",
      body: req.body.message
    }, function(err, message) {
      console.log(message.sid);
    });
  })
  res.send(JSON.stringify(req.body))
})

app.post('/save-unit', function(req, res){
  console.log('body'.grey, req.body.unit)
  console.log('key'.grey,req.body.key.green)
  const unit = req.body.unit
  const key = req.body.key
  let updated = false
  let created = false
 let unitRef =  firebase.database().ref(`units/${key}`)
 let unitsRef = firebase.database().ref('units')
 unitRef.once('value', (snap)=>{
  let exists = snap.val() !== null
  if(exists){
    updated = true
    unitRef.update(unit, (err) => {
    console.log(`updated unit ${key}`.green)
    })
  }
  else{
   // console.log('saving new unit'.green)
   created = true
    unitRef.set(unit, (err) => {
      console.log(`created unit ${key}`.green)
    })
  }
  let returnObj = {unit, created, updated}
  console.log('returning'.yellow, returnObj)
  res.send(JSON.stringify(returnObj))
 })
//  allUnitsRef.once('value', (snap) =>{
//    let units = snap.val()
//    console.log('units on value'.blue, units)
//    res.send(JSON.stringify(units))
//  })
// let unitNumber = req.body.unitNumber
// console.log('unitNumber', unitNumber)
// let test = dbRef.child(unitNumber)
// //res.send(JSON.stringify(req.body))
// test.once('value', (snap)=>{
//   let exists = snap.val() !== null
//   if(exists){
//     console.log('if fired and req=', req.body)
//     test.update(req.body, (err)=>{
//       if(err){
//         console.log('save unit error', err)
//       }
//       })
//   }
//   else{
//    // dbRef.set({[req.body.unitNUmber]: req.body})
//    console.log('else fired', req.body)
//   }
//   res.send(JSON.stringify(req.body))
// })


// let dbRef =  firebase.database().ref('units').push(req.body, (err)=>{
//   if(err){
//     console.warn('save unit error', err)
//   }
//   else{
//     res.send(JSON.stringify(req.body))
//   }
// })
//   const updateIf = () => {
//       dbRef.set(req.body)  
//   }
//   console.log('save unit called'.red)
//   console.log('req.body = ',req.body)
 
//  dbRef.on('value', snap => {
//    let exists = (snap.val() !== null)
//    if(exists){
//     throw('unit already exists')
//    }
//    else{
//     updateIf()
//     res.send(JSON.stringify(req.body))
//    }
//  })
})

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on port ${port}`.green);
    open(`http://localhost:${port}`);
  }
});
