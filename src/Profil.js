import React, {useState} from "react";

const Profil = () => {

    return (
        <div>
            <h3>Profil</h3>
            <p>Nom d'utilisateur = {sessionStorage.getItem("user")}</p>
        </div>
    )
}

export default Profil
