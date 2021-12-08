import React from 'react'
import Nav from './Nav'
import Post from './Post'
import Messagerie from './Messagerie'
import Profil from './Profil'
import Recherche from './Recherche'
import logo from './images/logo/logo_benef.png';
import logodark from './images/logo/logo_benef_dark.png';
import parameter from './images/icon/icon_parametres.svg';
import { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Parametre from './Parametre'

const Accueil = () => {

    const [isPosting, setIsPosting] = useState(false);

    function handlePost(e) {
        e.preventDefault();
        setIsPosting(true);
    }

    return (
        <div className="dark:bg-gray-550">

            <div className="flex justify-center">
                <div className="fixed flex h-10vh w-100vw bg-red-450 dark:bg-black justify-center items-center rounded-b-lg">
                    <img src={logo} alt="Logo" className="w-36 dark:hidden" />
                    <img src={logodark} alt="Logo" className="w-36 hidden dark:block" />
                    <img src={parameter} alt="Paramètres" className="absolute white w-8 right-10" />
                </div>
            </div>

            {/* <button className="post" onClick={handlePost}>+</button>
            {isPosting ? <Post/> : null}      */}
            <Router>
                <div>
                    <Nav />
                    <Switch>
                    <Route path="/" exact component={Home} />
                        <Route path="/recherche" component={Recherche} />
                        <Route path="/post" component={Post} />
                        <Route path="/messagerie" component={Messagerie} />
                        <Route path="/profil" component={Profil} />
                       
                    </Switch>
                </div>
            </Router>
        </div>
    )

}

const Home = () => (
    <div>
        <h1>Page d'accueil</h1>
    </div>
)


export default Accueil
