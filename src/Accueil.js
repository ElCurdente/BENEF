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
import plus from './images/icon/icon_plus.svg';
import plusnoir from './images/icon/icon_plus_noir.svg';
import { NavLink } from 'react-router-dom';
import { useState } from "react"


const Accueil = () => {

    const [isPosting, setIsPosting] = useState(false);

    function handlePost(e) {
        e.preventDefault();
        setIsPosting(true);
    }

    return (
        
       
                    
              
            


            <Router>
            <Link to="/parametre">
                    <img src={parameter} alt="Paramètres" className="absolute xl:w-14 xl:h-14 xl:mr-96 h-25px right-6 top-6 z-50" />
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
       
    )

}

// const Home = () => (
//     <div>
//         <h1>Page d'accueil</h1>
//     </div>
// )


export default Accueil
