import React from 'react'
import { Link } from 'react-router-dom'
import etiquette from './images/icon/icon_etiquette.svg';
import recherche from './images/icon/icon_recherche.svg';
import plus from './images/icon/icon_plus.svg';
import plusnoir from './images/icon/icon_plus_noir.svg';
import logo from './images/logo/logo_benef.svg';
import logodark from './images/logo/logo_benef_dark.svg';
import parameter from './images/icon/icon_parametres.svg';
import favoris from './images/icon/icon_coeur_b.svg';
import {motion } from 'framer-motion/dist/framer-motion';
import { AES, enc } from 'crypto-js';
import { useState } from 'react';
import { useEffect } from 'react';


const Nav = ({ searchValue, setSearchValue }) => {

    let decrypted;
    if(localStorage.getItem('isConnected')){
      decrypted = AES.decrypt(localStorage.getItem('id_user'), 'MYKEY4DEMO');
    }else{
      decrypted = AES.decrypt(sessionStorage.getItem('id_user'), 'MYKEY4DEMO');
    }
         const id_user = decrypted.toString(enc.Utf8);

    const [user, setUser] = useState({
        id: '',
        username: '',
        bio: '',
        image: undefined
    });

    useEffect(() => {
        fetch('https://benef-app.fr/api-infos-utilisateur.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_user: id_user })
        })
            .then((response) => response.json())
            .then((data) => {
                setUser({
                    id: data.id_user,
                    username: data.username,
                    bio: data.bio,
                    image: data.image
                })
            })
            .catch(err => {
                console.log("Error Reading data " + err);
            });
    }, [])


    return (
        <div className="flex justify-center z-50 relative">
            <div className="fixed flex justify-center items-center xl:top-0 xl:h-50px xl:justify-start bottom-0 w-100vw rounded-t-lg transition duration-500">
                <nav className="w-100vw">
                    <ul className="flex justify-around xl:justify-evenly xl:grid xl:grid-cols-nav xl:pr-40 xl:pl-40 items-center h-60px xl:h-50px bg-red-450 dark:bg-black pb-3">

                        <motion.div whileHover={{ scale: 1.03 }} className="justify-self-start">
                            <Link to="/" name="lien vers le fil d'actualité" onClick={() => {}}>
                                <li><img className="h-25px xl:hidden" src={etiquette} alt="logo etiquette" /></li>
                                <img src={logo} alt="Logo" className="w-32 dark:hidden xl:block hidden" />
                                <img src={logodark} alt="Logo dark mode" className="w-32 hidden sm:dark:hidden dark:hidden xl:dark:block" />
                            </Link>
                        </motion.div>

                        <Link to="/recherche" name='lien vers la page recherche' className="justify-self-center">
                            <motion.div whileHover={{ scale: 1.03 }}>
                                <li><img className="h-25px xl:hidden" src={recherche} alt="logo recherche" /></li>

                                <div className="relative text-gray-650 focus-within:text-gray-650 sm:hidden hidden xl:block">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                        <button name='bouton recherche' type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 25 25" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        </button>
                                    </span>
                                    <input type="text" name="q" className="py-2 text-sm text-gray-650 xl:bg-white h-9 rounded-lg pl-12 focus:outline-none focus:bg-white focus:text-gray-550"
                                        placeholder="Recherche" autoComplete="off" value={searchValue} onChange={event => setSearchValue(event.target.value)}>
                                    </input>
                                </div>

                            </motion.div>
                        </Link>

                        <Link to="/post" name='lien vers la page post' className="xl:justify-self-end">
                            <motion.div whileHover={{ scale: 1.075 }} className="relative xl:bottom-0 bottom-6 flex justify-center items-center h-16 w-16 xl:h-8 xl:w-8 bg-white-0 rounded-full shadow-custom ">
                                <li ><img className="h-24px xl:h-20px dark:hidden" src={plus} alt="logo plus" />
                                    <img className="h-24px xl:h-20px hidden dark:block" src={plusnoir} alt="logo plus" /></li>
                            </motion.div>
                        </Link>

                        <Link to="/favoris" name='lien vers la page favoris' className="xl:justify-self-end">
                            <motion.div whileHover={{ scale: 1.075 }} className="">
                                <li><img className="h-24px xl:h-8 xl:w-8" src={favoris} alt="logo favoris" /></li>
                            </motion.div>
                        </Link>

                        {/* <Link to="/messagerie">
                        <div className="relative top-3 hidden xl:hidden">
                            <li><img className="h-25px" src={message} alt="logo message"/></li>
                            </div>
                        </Link> */}

                        <Link to="/profil" name='lien vers la page profil' className="xl:justify-self-end">
                            <motion.div whileHover={{ scale: 1.075 }} className="">
                                <li><img className="xl:border-3 h-25px w-25px xl:h-8 xl:w-8 object-cover xl:rounded-full rounded-full border-2 border-white" src={user.image} alt="image utilisateur" /></li>
                            </motion.div>
                        </Link>

                        <Link to="/parametre" name='lien vers la page paramètre' className="fixed top-3 right-7 xl:top-0 xl:right-0 xl:relative xl:block xl:justify-self-end">
                            <motion.div whileHover={{ scale: 1.075 }}>
                                <li><img className="h-25px xl:h-8 xl:w-8" src={parameter} alt="logo paramètre" /></li>
                            </motion.div>
                        </Link>

                    </ul>
                </nav>
            </div>
        </div>



    )
}

export default Nav
