import React from 'react'
import Nav from './Nav'
import Post from './Post'
import Messagerie from './Messagerie'
import Profil from './Profil'
import Recherche from './Recherche'
import logo from './images/logo/logo_benef.png';
import logodark from './images/logo/logo_benef_dark.png';
import { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Accueil = () => {

    const [isPosting, setIsPosting] = useState(false);

    function handlePost(e) {
        e.preventDefault();
        setIsPosting(true);
    }

    return (
        <div>

            <div className="flex justify-center">
                <div className="fixed flex h-16 w-96 bg-red-450 justify-center items-center">
                    <img src={logo} alt="Logo" className="w-36 dark:hidden" />
                    <img src={logodark} alt="Logo" className="w-64 hidden dark:block" />
                </div>
            </div>

            {/* <button className="post" onClick={handlePost}>+</button>
            {isPosting ? <Post/> : null}      */}
            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/post" component={Post} />
                        <Route path="/recherche" component={Recherche} />
                        <Route path="/profil" component={Profil} />
                        <Route path="/messagerie" component={Messagerie} />
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
