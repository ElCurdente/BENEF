import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import profil from './images/profil-gaelle.png';
import adresse from './images/icon/adress.svg';
import Upvote from './Upvote';

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
        <ul className="h-full">
          <div className="mt-20 pb-12">
            {items.map(item => (
              <div className="w-92vw h-300px relative bg-red-450 dark:bg-black rounded-lg text-white-0 mb-2">
                <div className="w-full h-75% relative">
                  <img className="object-cover rounded-t-lg h-full w-full" src={item.image} alt="" />
                  <div className="absolute bottom-5 -left-1.5">
                    <Upvote />
                  </div>
                </div>
                <div className="w-full h-25%">

                  <li key={item.title} className="mt-1 w-92vw">
                    <h1 className="text-lg font-semibold mx-2">{item.title}</h1>
                    <div className="flex mt-2 text-sm w-92vw">
                      <img src={adresse} className="ml-2 mr-1 w-3.5"></img> {item.address}  <div className="absolute right-3">{item.postal}</div>
                    </div>
                  </li>
                </div>
              </div>
            ))}
          </div>
        </ul>
      </div >
    );
  }
}

export default Home
