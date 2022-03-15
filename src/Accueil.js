import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {AnimationPresence, motion} from 'framer-motion/dist/framer-motion';
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Parametre from './Parametre'
import Post from './Post'
import Messagerie from './Messagerie'
import Home from './Home'
import Profil from './Profil'
import Recherche from './Recherche'
import Infos from './Infos'
import Cgu from './Cgu'
import LandingPage from './testImage'
import Favoris from './Favoris'
import BackOffice from './BackOffice'
import logo from './images/logo/logo_benef.svg';
import logodark from './images/logo/logo_benef_dark.svg';
import parameter from './images/icon/icon_parametres.svg';
import plus from './images/icon/icon_plus.svg';
import plusnoir from './images/icon/icon_plus_noir.svg';
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


const Accueil = () => {

    const [searchValue, setSearchValue] = useState("");
    const [openModal, setOpenModal] = useState(true);
    // let location = useLocation();

    // useEffect(() => {
    //     history.push("/home")
    //   }, [])


    return (

        <div className="dark:bg-gray-550 xl:bg-white-0 xl:overflow-x-hidden">

            <div className="flex justify-center z-50 relative xl:hidden">
                <div className="fixed flex h-7vh w-100vw bg-red-450 dark:bg-black xl:justify-start justify-center items-center rounded-b-lg transition duration-500">

                    <img src={logo} alt="Logo" className="w-32 dark:hidden xl:ml-96" />
                    <img src={logodark} alt="Logo" className="w-32 hidden dark:block" />

                    <div className="xl:flex xl:items-center xl:justify-center xl:ml-52 hidden">
                        <form method="GET">
                            <div className="relative text-gray-600 focus-within:text-gray-400">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </button>
                                </span>
                                <input type="search" name="q" className="py-2 text-sm text-white xl:bg-white h-12 rounded-lg pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                                    placeholder="Recherche" autoComplete="off">
                                </input>

                            </div>
                        </form>
                        <div className="relative flex justify-center items-center h-14 w-14 ml-48 bg-white-0 rounded-full shadow-custom">
                            <img className="h-25px dark:hidden" src={plus} alt="" />
                            <img className="h-25px hidden dark:block" src={plusnoir} alt="" />
                        </div>
                        <img className="w-14 h-14 ml-6 bg-black dark:bg-gray-650 border-3 border-white dark:border-black rounded-full object-cover transition ease-in-out duration-500" />

                    </div>
                </div>
            </div>
            {openModal && 
            <div id="modal" className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-center">
        <div className="w-full xl:w-2/6 mb-10 xl:mb-0 relative flex flex-col justify-center items-center rounded-3xl bg-white-0 overflow-auto dark:bg-gray-550 dark:text-white-0">
    <div className="mt-7 mx-3 flex flex-col">                 
       <h1 className="text-lg xl:text-xl text-red-650 font-semibold text-align max-w-md mb-2 text-center">L'application Web est désormais disponible !</h1>
       <h1 className="text-lg xl:text-sm font-light max-w-md mt-2 text-align">Si vous souhaitez l'installer :</h1>
       <br></br>
       <h2>Sur iOS :</h2>
       <p>-Cliquez sur l'icône partager</p>
       <p>-Cliquez sur "Sur l'écran d'accueil"</p>
       <br></br>
       <h2>Sur Android :</h2>
       <p>-Cliquez sur l'icône ... en haut à droite</p>
       <p>-Cliquez sur "Ajouter à l'écran d'accueil"</p>
       <br></br>
       <h1>Prêt à participer à l'aventure BENEF ?</h1>
       <div className="flex w-full justify-evenly mt-5 mb-8">
         
         <button onClick={() => setOpenModal(false)} className="block px-4 hover:underline hover:underline-offset-8 text-red-450 font-semibold dark:hover:underline dark:hover:underline-offset-8 dark:hover:text-black transition duration-300 ease-in-out" type="submit">Fermer</button>
        </div>
    </div>
</div>
        

</div>
}
            <Router>
                
                <div>
                    <Nav searchValue={searchValue} setSearchValue={setSearchValue} />
                    
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/recherche">
                            <Recherche
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                            />
                        </Route>
                        <Route path="/post" component={Post} />
                        <Route path="/messagerie" component={Messagerie} />
                        <Route path="/profil" component={Profil} />
                        <Route path="/parametre" component={Parametre} />
                        <Route path="/infos" component={Infos} />
                        <Route path="/cgu" component={Cgu} />
                        <Route path="/testImage" component={LandingPage} />
                        <Route path="/favoris" component={Favoris} />
                        <Route path="/backoffice" component={BackOffice} />

                    </Switch>
                    
                </div>
            </Router>
        </div>
    )

}

// const Home = () => (
//     <div>
//         <h1>Page d'accueil</h1>
//     </div>
// )


export default Accueil;
