import './App.css';
import Form from './Form';
import './Form.css';
import Accueil from './Accueil';
import React from "react";
import { useEffect } from 'react';


function App() {

  const html = document.querySelector('html');
  useEffect(() => {
    if (localStorage.getItem('theme') == 'dark') {
        html.classList.add("dark");
        // dragswitch.style.transform = "translateX(20px)";
    } else {
    }
}, [])

  return (
    <div className=" bg-white-0 dark:bg-gray-550 h-screen overflow-y-hidden transition ease-in-out duration-500">

      {/* Affichage conditionnel : si la personne est connectée, il affiche l'accueil, sinon le formulaire*/}
      
      {!localStorage.getItem("isConnected") ? ( <Form/>) : (<Accueil/>)}            
    </div>
  );
}

export default App;


