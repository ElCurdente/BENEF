import './App.css';
import Form from './Form';
import './Form.css';
import Accueil from './Accueil';
import Home from './Home';
import Thread from './Thread';
import React, {useState} from "react";


function App() {

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('./serviceWorker.js').then(() => {
        console.log("sw register")
    }).catch((e) => console.log(e))
}

  return (
    <div className=" bg-white-0 dark:bg-gray-550 h-screen overflow-y-hidden transition ease-in-out duration-500">
      {!localStorage.getItem("isConnected") ? ( <Form/>) : (<Accueil/>)}            
    </div>
  );
}

export default App;


