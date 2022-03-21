import React from 'react';
import { useState, useEffect } from 'react';
import fleche from './images/icon/icon_fleche_noire.svg';
import {AES, enc}from 'crypto-js';
import { Link } from 'react-router-dom';


const Parametre = () => {

    let decrypted;
    if(localStorage.getItem('isConnected')){
      decrypted = AES.decrypt(localStorage.getItem('id_user'), 'MYKEY4DEMO');
    }else{
      decrypted = AES.decrypt(sessionStorage.getItem('id_user'), 'MYKEY4DEMO');
    }
         const id_user = decrypted.toString(enc.Utf8);

    const [user, setUser] = useState({
        username:'', 
        email:'', 
        postal:'', 
        birth:''
    })

    useEffect(() => {
        fetch('https://benef-app.fr/api-infos-utilisateur.php', {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_user : id_user})
          })
            .then((response) => response.json())
            .then((data) => {
              setUser({
                username: data.username,
                email: data.email,
                postal: data.postal,
                birth: data.birth
              })
            })
            .catch(err => {
              console.log("Error Reading data " + err);
            });
    }, [])

    return (


        <div className="flex flex-col justify-center items-center h-screen w-screen dark:bg-gray-550 bg-gray-100 xl:bg-white-0 dark:text-white-0">
            <div id="infos" className="overflow-y-auto w-95vw h-full dark:bg-gray-550 xl:bg-white-0 xl:w-1/3 xl:p-5">

          <div className="flex relative flex-row justify-center items-center pt-7">
            <Link to="/Parametre">
              <img className="absolute left-0 mt-10 xl:mt-3 w-4" src={fleche} alt="fleche"  />
                </Link>
                  <span className="text-center text-2xl mt-20 font-bold xl:mt-8">Informations du compte</span>
                </div>

                <h2 className=" text-base pt-7 font-bold ">Nom d'utilisateur</h2>
                <li className='mt-2 list-none'>
                    <ul><p className="opacity-95 text-base">{user.username}</p></ul>
                </li>

                <h2 className="text-base pt-7 font-bold ">E-mail</h2>
                <li className='mt-2 list-none'>
                    <ul><p className="opacity-95 text-base">{user.email}</p></ul>
                </li>


                <h2 className="text-base pt-7 font-bold ">Code postal</h2>
                <li className=' mt-2 list-none'>
                    <ul><p className="opacity-95 text-base">{user.postal}</p></ul>
                </li>


                <h2 className="text-base pt-7 font-bold">Date de naissance</h2>
                <li className=' mt-2 list-none'>
                    <ul className="w-full flex justify-between items-center opacity-95 text-base">{user.birth}</ul>
                </li>


              
            </div>
        </div>
    )
}



export default Parametre

