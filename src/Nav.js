import React from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import ChatIcon from '@material-ui/icons/Chat';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AddIcon from '@material-ui/icons/Add';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import etiquette from './images/icon/icon_etiquette.svg';
import recherche from './images/icon/icon_recherche.svg';
import plus from './images/icon/icon_plus.svg';
import message from './images/icon/icon_message.svg';
import profil from './images/profil-gaelle.png';
import plusnoir from './images/icon/icon_plus_noir.svg';
import logo from './images/logo/logo_benef.png';
import logodark from './images/logo/logo_benef_dark.png';
import Parametre from './Parametre'
import parameter from './images/icon/icon_parametres.svg';

const Nav = () => {
    return (
        <div className="flex justify-center z-50 relative">
            <div className="fixed justify-center xl:top-0 xl:h-10vh xl:w-100vw xl:justify-start bottom-0 h-7vh w-100vw bg-red-450 dark:bg-black rounded-t-lg transition duration-500">
                <nav className="w-100vw h-7vh">
                    <ul className="flex justify-around">
                        <Link to="/home">
                            <div className="relative top-3 ">
                                <li className=""><img className="h-25px xl:hidden " src={etiquette} alt="" /></li>
                                <img src={logo} alt="Logo" className="w-36 dark:hidden xl:ml-96 xl:block hidden" />
                    <img src={logodark} alt="Logo" className="w-36 hidden dark:block sm:hidden" />  
                            </div>
                            
                        </Link>
                        <Link to="/recherche">
                            
                        <div className="relative top-3 xl:top-5">
                                <li><img className="h-25px xl:hidden" src={recherche} alt="" /></li>
                                
    <div class="relative text-gray-600 focus-within:text-gray-400 sm:hidden hidden xl:block">
      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </span>
            <input type="search" name="q" class="py-2 text-sm text-white xl:bg-white h-12 rounded-lg pl-10 focus:outline-none focus:bg-white focus:text-gray-900" 
                placeholder="Recherche" autocomplete="off">
                                </input>
                                
                            </div>     
  
                            </div>
                           
                        </Link>
                        <Link to="/post" className="hover:animate-bounce">
                            <div className="relative xl:bottom-0 xl:top-4 bottom-6 flex justify-center xl:p-0 items-center h-16 w-16 bg-white-0 rounded-full shadow-custom">
                            <li ><img className="h-25px dark:hidden" src={plus} alt=""/>
                            <img className="h-25px hidden dark:block" src={plusnoir} alt=""/></li>
                            </div>
                        </Link>
                        <Link to="/messagerie">
                        <div className="relative top-3 hidden xl:hidden">
                            <li><img className="h-25px" src={message} alt=""/></li>
                            </div>
                        </Link>
                        <Link to="/profil">
                        <div className="relative top-3 xl:top-4">
                            <li><img className="h-25px xl:h-16 xl:w-16 xl:mr-32 xl:rounded-full rounded-xl border-2 border-white" src={profil} alt=""/></li>
                            </div>
                        </Link>
                        <Link to="/Parametre">
                            <div className="relative xl:block hidden top-3 xl:top-5 xl:mr-5">
                            <li><img src={parameter} alt="Paramètres" className="xl:h-14 xl:w-14 h-25px right-6 top-6 z-50" /></li>
                            </div>
                        </Link>
                    </ul>
                </nav>
            </div>
        </div>


        
    )
}

export default Nav
