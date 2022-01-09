import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Parametre from './Parametre'
import Post from './Post'
import Messagerie from './Messagerie'
import Home from './Home'
import Profil from './Profil'
import Recherche from './Recherche'
import Infos from './Infos'
import Bloque from './Bloque'
import logo from './images/logo/logo_benef.png';
import logodark from './images/logo/logo_benef_dark.png';
import parameter from './images/icon/icon_parametres.svg';
import { useState } from "react"


const Accueil = () => {

    const [isPosting, setIsPosting] = useState(false);

    function handlePost(e) {
        e.preventDefault();
        setIsPosting(true);
    }

    return (
        <div className="dark:bg-gray-550">

            <div className="flex justify-center z-50 relative">
                <div className="fixed flex h-10vh w-100vw bg-red-450 dark:bg-black justify-center items-center rounded-b-lg">
                    <img src={logo} alt="Logo" className="w-36 dark:hidden" />
                    <img src={logodark} alt="Logo" className="w-36 hidden dark:block" />                   
                </div>
            </div>


            <Router>
            <Link to="/parametre">
                    <img src={parameter} alt="Paramètres" className="absolute h-25px right-6 top-6 z-50" />
                    </Link>
                <div>
                    <Nav />
                    <Switch>
                    <Route path="/home" exact component={Home} />
                        <Route path="/recherche" component={Recherche} />
                        <Route path="/post" component={Post} />
                        <Route path="/messagerie" component={Messagerie} />
                        <Route path="/profil" component={Profil} />
                        <Route path="/parametre" component={Parametre} />
                            <Route path="/infos" component={Infos} />
                            <Route path="/bloque" component={Bloque} />
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


export default Accueil
