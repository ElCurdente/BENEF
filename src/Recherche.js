import React from 'react'


const Recherche = () => {
    fetch('https://benef-app.fr/api-post-render.php', {
        method: "POST",
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          "payload": "yes"
        })
        })        
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch(err => {
        console.log("Error Reading data " + err);
        });
        
    return (
        <div className="flex h-screen w-screen justify-center items-center">
            <h3>Recherche</h3>
        </div>
    )
}

export default Recherche
