import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav'
import Parametre from './Parametre'
import Post from './Post'
import Messagerie from './Messagerie'
import Home from './Home'
import Profil from './Profil'
import Profil2 from './Profil2'
import Recherche from './Recherche'
import Infos from './Infos'
import Cgu from './Cgu'
import LandingPage from './testImage'
import Favoris from './Favoris'
import BackOffice from './BackOffice'
import logo from './images/logo/logo_benef.svg';
import logodark from './images/logo/logo_benef_dark.svg';
import plus from './images/icon/icon_plus.svg';
import plusnoir from './images/icon/icon_plus_noir.svg';
import etiquettedark from './images/icon/icon_etiquette_dark.svg';
import favorisdark from './images/icon/icon_coeur_dark.svg';
import recherchedark from './images/icon/icon_recherche_dark.svg';
import { useState } from "react";


const Accueil = () => {

    const [searchValue, setSearchValue] = useState("");
    const [openModal, setOpenModal] = useState(true);


    return (

        /*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*--*-*-*-*/
        /*                  Bandeau                    */
        /*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*--*-*-*-*/


        <div className="dark:bg-gray-550 xl:bg-white-0 xl:overflow-x-hidden">

            <div className="flex justify-center z-50 relative xl:hidden">
                <div className="fixed flex h-50px w-100vw bg-red-450 dark:bg-black xl:justify-start justify-center items-center rounded-b-lg transition duration-500">

                    <img src={logo} alt="Logo" className="w-32 dark:hidden xl:ml-96" />
                    <img src={logodark} alt="Logo" className="w-32 hidden dark:block" />

                    <div className="xl:flex xl:items-center xl:justify-center xl:ml-52 hidden">
                        <form method="GET">
                            <div className="relative text-gray-600 focus-within:text-gray-400">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <button type="submit" className="p-1 focus:outline-none focus:shadow-outline" name='submit'>
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </button>
                                </span>
                                <input type="search" name="q" className="py-2 text-sm text-white xl:bg-white h-12 rounded-lg pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                                    placeholder="Recherche" autoComplete="off">
                                </input>

                            </div>
                        </form>
                        <div className="relative flex justify-center items-center h-14 w-14 ml-48 bg-white-0 rounded-full shadow-custom">
                            <img className="h-25px dark:hidden" src={plus} alt="logo plus" />
                            <img className="h-25px hidden dark:block" src={plusnoir} alt="logo plus" />
                        </div>
                        <img className="w-14 h-14 ml-6 bg-black dark:bg-gray-650 border-3 border-white dark:border-black rounded-full object-cover transition ease-in-out duration-500" alt='img' />

                    </div>
                </div>
            </div>

            {/*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*--*-*-*-*/
            /*            Modale de Bienvenue               */
            /*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*--*-*-*-*/}

            {openModal &&
                <div id="modal" className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center overflow-auto z-40 items-center">
                    <div className="w-95vw xl:w-2/6 mb-10 xl:mb-0 relative flex flex-col justify-center items-center rounded-3xl bg-white-0 dark:bg-gray-550 dark:text-white-0  xl:h-auto overflow-y-auto mt-96 xl:mt-10 pb-20 xl:pb-10 ">
                        <div className="mt-7 xl:mt-0 flex flex-col">
                            <h1 className="text-xl xl:text-xl text-red-650 font-semibold max-w-md mb-2 pt-20 xl:pt-10 text-center">Bienvenue sur BENEF !</h1>
                            <h1 className="text-lg xl:text-base max-w-md font-semibold mt-2">C'est quoi Benef ?</h1>
                            <p className="text-lg xl:text-base font-light max-w-md mt-2">Benef est une “Application Web” unique en son genre.<br></br>
                             Elle permet te permet d’échanger des bons plans en Île-de-France avec la communauté sur différentes catégories comme des soirées, des expositions ou encore des restaurants pour vous inviter à sortir plus malin.<br></br><br></br>
                             Pour une immersion totale nous te demandons de partager uniquement des offres authentiques et donc de respecter nos CGU.<br></br> <br></br>
                            Alors n'attends plus et profite des bons plans, partages-en et personnalise ton profil pour te faire reconnaître !
</p><br></br>
                            <h1 className="text-lg xl:text-base max-w-md mt-2 font-semibold">Voici quelques explications :</h1>
                            <div className='max-w-d mt-3'>
                                <div className='flex mb-3 font-light'>
                                    <img className="h-24px xl:h-20px dark:hidden xl:hidden" src={etiquettedark} alt="logo plus" />
                                    <img className="h-24px xl:h-20px dark:hidden hidden xl:block" src={logo} alt="logo plus" /> <p className='ml-2'> est la page d'accueil</p>
                                </div>

                                <div className='flex mb-3 font-light'>
                                    <img className="h-24px xl:h-20px dark:hidden" src={recherchedark} alt="logo plus" /> <p className='ml-2'>est la page recherche</p> 
                                </div>

                                <div className="flex mb-3 font-light">
                                    <img className="h-24px xl:h-20px dark:hidden" src={plus} alt="logo plus" /> <p className='ml-2'>te permet de créer ton bon plan</p> 
                                </div>

                                <div className='flex mb-3 font-light'>
                                <img className="h-24px xl:h-20px dark:hidden" src={favorisdark} alt="logo plus" /> <p className='ml-2'>affiche tes favoris</p> 
                                </div>
                            </div>



                            <div className='xl:hidden'>
                                <h1 className="text-lg xl:text-xl text-red-650 font-semibold max-w-md mb-2 text-center mt-5">L'appli web est désormais disponible !</h1>
                                <h1 className="text-lg xl:text-base font-light max-w-md mt-2">Si vous souhaitez l'installer :</h1>
                                <div className='mt-2'>
                                    <h1 className='mb-1'>Sur iOS :</h1> 
                                    <p className='mb-1'>- Cliquez sur l'icône partager</p>
                                    <p>- Cliquez sur "Sur l'écran d'accueil"</p>
                                </div>
                                    
                                <div className='mt-4'>
                                    <h1 className='mb-1'>Sur Android :</h1>
                                    <p className='mb-1'>- Cliquez sur l'icône ... en haut à droite</p>
                                    <p>- Cliquez sur "Ajouter à l'écran d'accueil"</p>
                                    <p className='mt-7'>Prêt à participer à l'aventure BENEF ?</p>
                                </div>
                            </div>
                            <div className="flex w-full justify-evenly mt-7 mb-8">

                                <button onClick={() => setOpenModal(false)} className="block px-4 hover:underline hover:underline-offset-8 text-red-450 font-semibold dark:hover:underline dark:hover:underline-offset-8 dark:hover:text-black transition duration-300 ease-in-out" type="submit" name='bouton fermer'>Fermer</button>
                            </div>
                        </div>
                    </div>


                </div>
            }

            {/*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*--*-*-*-*/
            /*    Routeur - Permet de créer des liens       */
            /*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*--*-*-*-*/}

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
                        <Route path="/profil2" component={Profil2} />
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

export default Accueil;
