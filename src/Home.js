import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import profil from './images/profil-gaelle.png';

function Home() {
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
      <div className="h-screen w-screen flex justify-center overflow-auto items-center">

        <ul className="h-full mt-40">
          {items.map(item => (
            <div className="w-95vw h-300px bg-red-450 dark:bg-black rounded-lg text-white-0 mb-2">
              <div className="w-full h-75% ">
                <img className="object-cover rounded-t-lg h-full w-full" src={profil} alt=""/>
              </div>
              <div>
                <li key={item.title}>
                  <h1 className="text-lg font-semibold">{item.title}</h1> {item.address}
                </li>
              </div>
            </div>
          ))}
        </ul>
      </div >
    );
  }
}

export default Home
