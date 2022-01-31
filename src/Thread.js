import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import profil from './images/profil-gaelle.png';
import adresse from './images/icon/adress.svg';
import Upvote from './Upvote';
import upvoteBas from './images/icon/upvote.svg';
import upvoteHaut from './images/icon/upvote2.svg';
import upvoteHautplein from './images/icon/icon_vote_fill.svg';
import upvoteBasplein from './images/icon/icon_vote_fill_r.svg';
import upvoteOrange from './images/icon/icon_vote_orange.svg';
import upvoteorangeplein from './images/icon/icon_vote_fill_orange.svg';

const Thread = () => {
  const html = document.querySelector('html');
  const upvoteHaut1 = document.querySelector("#upvote_haut");
  const upvoteBas1 = document.querySelector("#upvote_bas");

  if (html.classList.contains('dark')) {
    upvoteHaut1.src = upvoteHaut;
  } else {
    upvoteHaut1.src = upvoteOrange;
  }

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://benef-app.fr/api-post-render.php")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.items);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  function handleUpvote() {
    console.log(this)
    fetch('https://benef-app.fr/api-upvote.php', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch(err => {
        console.log("Error Reading data " + err);
      });
    this.upvote++;

    const srcUpvoteHaut1 = upvoteHaut1.getAttribute('src');

    if (srcUpvoteHaut1 == upvoteHautplein) {
      upvoteHaut1.src = upvoteHaut;
    } else {
      upvoteHaut1.src = upvoteHautplein;
      upvoteBas1.src = upvoteBas;
    }

  }

  function handleDownvote() {
    console.log(this)
    fetch('https://benef-app.fr/api-downvote.php', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch(err => {
        console.log("Error Reading data " + err);
      });

    const srcUpvoteBas1 = upvoteBas1.getAttribute('src');

    if (srcUpvoteBas1 == upvoteBasplein) {
      upvoteBas1.src = upvoteBas;
    } else {
      upvoteBas1.src = upvoteBasplein;
      upvoteHaut1.src = upvoteHaut;
    }
  }


  // function img1() {
  //   if (html.classList.contains('dark')) {
  //        upvoteHaut1.src = './images/icon/upvote2.svg';
  //     } else {
  //       upvoteHaut1.src = './images/icon/icon_vote_orange.svg';
  //     }

  //   img1();
  // }
  // if (html.classList.contains('dark')) {
  //   src1 = './images/icon/upvote2.svg';
  // } else {
  //   src1 = './images/icon/icon_vote_orange.svg';
  // }



  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div className=" h-screen w-screen flex justify-center xl:justify-start xl:ml-72 overflow-auto items-center">
        <button></button>
        <ul className="h-full xl:w-2/6 xl:bg-gray-50">
          <div className="mt-32 ml-6 mr-6 pb-12 xl:bg-gray-50">
            {items.map(item => (
              <div className="w-92vw xl:w-full h-300px xl:h-96 relative bg-red-450 dark:bg-black rounded-lg text-white-0 mb-2 xl:mb-5">
                <div className="w-full h-75% relative">
                  <img className="object-cover rounded-t-lg h-full w-full" src={profil} alt="" />
                  <div className="absolute bottom-5 -left-1.5">
                  </div>
                </div>
                <div className="w-full h-25%">
                  <li key={item.id_post} className="mt-1 w-92vw">
                    <div>
                      <div className="bg-white-0 text-black absolute top-44 text-xl font-bold flex w-max py-1 rounded-lg">
                        <button onClick={handleUpvote.bind(item)} className="pl-2 relative">
                          <img id="upvote_haut" src={upvoteHaut} className="opacity-100 h-28px"></img>
                          {/* <img src={upvoteorange} className="absolute top-0 h-30px dark:opacity-0"></img> */}
                        </button>

                        <span id='nb_upvote' className="px-2 upvote text-red-450 dark:text-black">{item.upvote}</span>
                        <button onClick={handleDownvote.bind(item)} className="pr-2 relative">
                          <img id="upvote_bas" src={upvoteBas} className="opacity-100 dark:opacity-100 h-28px"></img>
                          {/* <img src={upvoteorange} className="transform rotate-180 absolute top-0 h-30px dark:opacity-0"></img> */}
                        </button>
                      </div>
                    </div>
                    <h1 className="text-lg font-semibold mx-2">{item.title}</h1>
                    <div className="flex mt-2 text-sm w-92vw">
                      <img src={adresse} className="ml-2 mr-1 w-3.5"></img> {item.address} <div className="absolute right-3">{item.postal}</div>
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
};
export default Thread;
