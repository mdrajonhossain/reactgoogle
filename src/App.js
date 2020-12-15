import React, { useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./firebase.config";
firebase.initializeApp(firebaseConfig);

function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");

  var provider = new firebase.auth.GoogleAuthProvider();


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
     console.log(user)
     // setUsername(user.email)
     setUsername(user.photoURL)
     const token = localStorage.setItem("token", JSON.stringify(user.email));

     if(token === null){
      setUsername("")
     }
    // No user is signed in.
  }
});



  const handlerLogin = () => {
    var auth = firebase.auth();
    firebase
      .auth()
      .signInWithPopup(provider)
      
     
      .then(user => setLogin(true))
      .catch(err => setLogin(false));
  };


  const handlerLogout = () => {
    setUsername("")
    localStorage.removeItem("token");
    firebase
      .auth()
      .signOut()
      .then(user => setLogin(false))
      .catch(err => setLogin(true));
  };


  return (
    <div>
      

      <button onClick={handlerLogin}>Login </button>
      {username && <button onClick={handlerLogout}>Logout</button>}
      

      {username &&  
      <img src={username} alt="Not Photo" width="50" height="60"/>
      }
    </div>
  );
}

export default App;
