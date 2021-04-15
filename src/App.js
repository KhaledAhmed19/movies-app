import React from 'react'
//import firebase from './firebase'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Current from './components/Current'
import Search from './components/Search'
function App() {
 // var database = firebase.firestore()
  /*database.collection("users").add({
    first: "Aida",
    last: "Lovelace",
    born: 1816
})*/
/*database.collection("users").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      
      console.log(doc.id, " => ", doc.data().born);
  });
});*/
 
  
  return (
    <>
    <BrowserRouter>
    <div className="container">
    <Switch>
    <Route exact path="/" component={Current} />
    <Route  path="/search" component={Search} />

    </Switch>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;

