import React from 'react';
import fleche from './images/icon/icon_fleche_noire.svg';
import flecheDark from './images/icon/icon_fleche_blanche.svg';
import ToggleBtn from './toggleBtn';
import { Link } from 'react-router-dom';
import './index.css';
import { useHistory } from "react-router-dom";

const Parametre = () => {

    let history = useHistory();

    function handleDeconnexion() {
        history.push("/");
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
    }

    function handleSuppression() {
        
        fetch('https://benef-app.fr/api-suppression.php', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_user: sessionStorage.getItem('id_user')})
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.clear();
        window.location.reload();
      })
      .catch(err => {
        console.log("Error Reading data " + err);
      });
  }
    

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen dark:bg-gray-550 bg-gray-100 xl:bg-white-0 dark:text-white-0">
            <div id="infos" className="overflow-y-auto w-95vw h-full dark:bg-gray-550 xl:bg-white-0 xl:w-1/3 xl:p-5 pb-32">
                <div className=" relative top-10">
                    <h1 className="text-center text-2xl font-bold pt-5">Paramètres</h1>
    
                    <h2 className=" text-xl pt-10 font-semibold ">Compte</h2>
                    <li className='mt-2 list-none'>
    
                        <ul className="pb-2">
                            <Link to="/Infos" className="flex justify-between cursor-pointer font-normal hover:font-semibold">
    
                                Informations du compte
                                <img src={fleche} alt="fleche" className="block dark:hidden w-2 transform rotate-180 mr-2"/>
                                <img src={flecheDark} alt="fleche" className="hidden dark:block w-2 transform rotate-180 mr-2"/>
                            </Link>
                        </ul>
                        {/* <ul>
                            <a className="flex justify-between cursor-pointer font-normal" href='#'>
                                Bons plans enregistrés
                                <img src={fleche} alt="fleche" className="w-2 transform rotate-180 mr-2"/>
                            </a>
                        </ul> */}
                    </li>
    
                    <h2 className="mt-2 text-xl pt-7 font-semibold">Affichage</h2>
                    <li className=' mt-2 list-none'>
                        <ul className="w-full flex justify-between items-center font-normal">Mode sombre
                            <ToggleBtn id='toggleBtn1' />
                        </ul>
                    </li>
    
    
                    <h2 className="mt-2 text-xl pt-7 font-semibold ">À propos</h2>
                    <li className='mt-2 list-none'>
    
                        <ul className="w-full flex justify-between items-center font-normal pb-2">
                            <Link to="/Cgu" className="cursor-pointer font-normal">
                               Conditions d'utilisations générales
                            </Link>
                        </ul>
    
                    <ul className="w-full flex justify-between items-center font-normal pb-2">
                         <a className="cursor-pointer font-normal" href="mailto:admin@benef-app.fr">Nous contacter</a>
                    </ul>
    
                    </li>
                    <h2 onClick={handleDeconnexion} className="mt-2  pt-7 text-base font-semibold cursor-pointer ">Déconnexion</h2>
                    <h2 onClick={handleSuppression} className="mt-2 text-base font-semibold text-red-500 cursor-pointer">Supprimer le compte</h2>
                </div>
            </div>
        </div>
    )
}



export default Parametre

