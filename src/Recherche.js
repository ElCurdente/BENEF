import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

// const Recherche = () => {
//     fetch('https://benef-app.fr/api-post-render.php', {
//         method: "POST",
//         headers: {
//           'Accept' : 'application/json',
//           'Content-Type' : 'application/json'
//         },
//         body: JSON.stringify({
//           "payload": "yes"
//         })
//         })        
//         .then((response) => response.json())
//         .then((data) => {
//           console.log(data);
//         })
//         .catch(err => {
//         console.log("Error Reading data " + err);
//         });
        
//     return (
//         <div className="flex h-screen w-screen justify-center items-center">
//             <h3>Recherche</h3>
//         </div>
//     )
// }


function Recherche() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Remarque : le tableau vide de dépendances [] indique
  // que useEffect ne s’exécutera qu’une fois, un peu comme
  // componentDidMount()
  useEffect(() => {
    fetch("https://benef-app.fr/api-post-render.php")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.items);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.title}>
            {item.title} {item.description}
          </li>
        ))}
      </ul>
    );
  }
}

export default Recherche
