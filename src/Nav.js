import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div>
            <nav>
                <h3>navigation</h3>
                <ul>
                    <Link to ="/">
                    <li>Accueil</li>
                    </Link>
                    <Link to="/recherche">
                    <li>Recherche</li>
                    </Link>
                    <Link to="/post">
                    <li>Post</li>
                    </Link>
                    <Link to="profil">
                    <li>Profil</li>
                    </Link>
                    <Link to="messagerie">
                    <li>Messagerie</li>
                    </Link>
                </ul>
            </nav>
        </div>
    )
}

export default Nav
