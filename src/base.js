// import Rebase from 're-base';
import firebase from 'firebase'

 const config = {
     apiKey: "AIzaSyDtjqg7ZLSGwip3tSDJtx4UcqYRnGDgLGQ",
     authDomain: "cabins4lesstexting.firebaseapp.com",
     databaseURL: "https://cabins4lesstexting.firebaseio.com"    
 }
 export default firebase.initializeApp(config)

// const base = Rebase.createClass({
//     apiKey: "AIzaSyDtjqg7ZLSGwip3tSDJtx4UcqYRnGDgLGQ",
//     authDomain: "cabins4lesstexting.firebaseapp.com",
//     databaseURL: "https://cabins4lesstexting.firebaseio.com"    
// })
// export default base