import React from 'react';
import ToggleBtn from './toggleBtn';
import ToggleBtn2 from './toggleBtn_2';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Parametre = () => {

    const checkboxLight = document.querySelector('._3maKS');
    const html = document.querySelector('html');
    const toggleDot = document.querySelector('#toggle_dot');


    const [checked, setChecked] = React.useState(true);
    const [checked2, setChecked2] = React.useState(true);
    const [checked3, setChecked3] = React.useState(true);


    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen dark:bg-gray-550 bg-gray-50 dark:text-white-0">
            <div id="infos" className="overflow-y-auto w-95vw h-full mt-20 dark:bg-gray-550 xl:bg-gray-200 xl:w-1/3 xl:p-5 xl:mr-72 ">


                <h1 className="text-center text-2xl font-bold pt-7">Paramètres</h1>

                <h2 className=" text-xl pt-6 font-semibold ">Compte</h2>
                <li className='mt-2 list-none'>

                    <ul className="pb-2">
                        <Link to="/Infos">
                            <a className="cursor-pointer opacity-95 font-light">Informations du compte</a>
                        </Link>
                    </ul>
                    <ul className="pb-2"><a className="cursor-pointer opacity-95 font-light">Changer son mot de passe</a></ul>
                    <ul><a className="cursor-pointer opacity-95 font-light">Bons plans enregistrés</a></ul>
                </li>


                <h2 className="mt-2 text-xl pt-7 font-semibold ">Confidentialité</h2>
                <li className=' mt-2 list-none'>
                    <ul> <Link to="/Bloque">
                        <a className="cursor-pointer opacity-95 font-light">Utilisateurs bloqués</a>
                    </Link></ul>
                </li>


                <h2 className="mt-2 text-xl pt-7 font-semibold">Affichage</h2>
                <li className=' mt-2 list-none'>
                    <ul className="w-full flex justify-between items-center opacity-95 font-light">Mode sombre
                        <ToggleBtn id='toggleBtn1' />
                    </ul>
                </li>


                <h2 className="mt-2 text-xl pt-7 font-semibold ">Notifications</h2>
                <li className='mt-2 list-none'>
                    <ul className="w-full flex justify-between items-center opacity-95 font-light pb-2">Messages privés
                        <ToggleBtn2 id='2' />
                    </ul>
                    <ul className="w-full flex justify-between items-center opacity-95 font-light pb-2">"UpVotes" sur un post publié
                        {/* <input type="checkbox" id="toggle_btn_3" class="hidden w-10 h-5 text-green-600 mr-2 rounded-full" checked={checked3}
                            onChange={() => setChecked3(!checked3)} ></input>
                        <label for="toggle_btn_3">
                            <div className="container-toggle-dot flex w-9 h-5 items-center bg-gray-300 rounded-full p-1 mr-2 transform transition duration-300">
                                <div id="toggle_dot_3" className="toggle-dot-3 w-4 h-4 bg-white-0 rounded-full shadow-md transform transition duration-300"></div>
                            </div>
                        </label> */}
                        <ToggleBtn2 id='3' />
                    </ul>
                    <ul className="w-full flex justify-between items-center opacity-95 font-light">Autres
                    </ul>

                </li>
                <h2 className="mt-2 p-0 text-base pt-10 font-semibold cursor-pointer ">Aide</h2>
                <h2 className="mt-2 text-base font-semibold cursor-pointer ">Déconnexion</h2>
                <h2 className="mt-2 text-base font-semibold text-red-500 cursor-pointer">Supprimer le compte</h2>

            </div>
        </div>
    )
}



export default Parametre

