import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import profil from './images/profil-gaelle.png';
import resto from './images/resto.jpg';
import musee from './images/musee.jpg';
import adresse from './images/icon/adress.svg';
import Upvote from './Upvote';
import upvoteBas from './images/icon/upvote.svg';
import upvoteHaut from './images/icon/upvote2.svg';
import upvoteHautplein from './images/icon/icon_vote_fill.svg';
import upvoteBasplein from './images/icon/icon_vote_fill_r.svg';
import upvoteOrange from './images/icon/icon_vote_orange.svg';
import upvoteorangeplein from './images/icon/icon_vote_fill_orange.svg';
import { motion } from 'framer-motion/dist/framer-motion';
import Lottie from 'react-lottie';
import animationData from './images/animation/like.json';
import coeur from './images/icon/icon_coeur.svg';

const Thread = () => {

  const [state, setState] = useState(false);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [upvote, setUpvote] = useState();
  const [refreshKey, setRefreshKey] = useState(0);

  const nbUpvote = useRef(null);
  let history = useHistory();

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

  function handleFav() {
    console.log({ id_user: sessionStorage.getItem('id_user'), id_post: this });
    fetch('https://benef-app.fr/api-favoris.php', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_user: sessionStorage.getItem('id_user'), id_post: this })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch(err => {
        console.log("Error Reading data " + err);
      });

      setState(!state);
  }

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
        // setRefreshKey(oldKey => oldKey + 1)
      })
      .catch(err => {
        console.log("Error Reading data " + err);
      });
    // window.location.reload(true);


    // const srcUpvoteHaut1 = upvoteHaut1.getAttribute('src');

    // if (srcUpvoteHaut1 == upvoteHautplein) {
    //   upvoteHaut1.src = upvoteHaut;
    // } else {
    //   upvoteHaut1.src = upvoteHautplein;
    //   upvoteBas1.src = upvoteBas;
    // }

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

    // window.location.reload(true);

    // const srcUpvoteBas1 = upvoteBas1.getAttribute('src');

    // if (srcUpvoteBas1 == upvoteBasplein) {
    //   upvoteBas1.src = upvoteBas;
    // } else {
    //   upvoteBas1.src = upvoteBasplein;
    //   upvoteHaut1.src = upvoteHaut;
    // }
  }

  function compare(a, b) {
    if (parseInt(a.upvote) < parseInt(b.upvote)) {
      return 1;
    }
    if (parseInt(a.upvote) > parseInt(b.upvote)) {
      return -1;
    }
    return 0;
  }

  function Alert() { alert('Le message à été supprimé'); };
  function DelayAlert() { setInterval(Alert, 2000); }


  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div className=" h-screen w-screen flex justify-center xl:justify-center overflow-x-hidden overflow-auto items-center bg-white-0 xl:dark:bg-gray-550">
        {/* <motion.div className="">
          <img src={upvoteHautplein} />
        </motion.div> */}
        <ul className="h-full xl:w-2/6 bg-white-0 xl:dark:bg-gray-550 ">
          <div className="mt-24 ml-6 mr-6 pb-12 xl:dark:bg-gray-550">

            {items.sort(compare).map(item => (
              <motion.div className="w-92vw xl:w-full h-300px xl:h-96 relative bg-red-450 dark:bg-black rounded-lg text-white-0 mb-4 xl:mb-5 shadow-customm"
                whileHover={{ scale: 1.01 }}>
                <div className="w-full h-75% relative">
                  <img className="object-cover rounded-t-lg h-full w-full" src={resto} alt="" />
                  <div className="absolute bottom-5 -left-1.5">
                  </div>
                </div>
                <div className="w-full h-25% md:cursor-pointer">
                  <li key={item.id_post} className="mt-1 w-92vw max-w-md">
                    <div>
                      <div className="bg-white-0 px-2 py-2 text-black absolute flex justify-center items-center top-3 right-2 rounded-full">
                        <button className="upvote text-red-450 dark:text-black"
                          onClick={
                            // () => {
                            // setState(!state);
                            handleFav.bind(item.id_post)
                          // }
                        }
                        >
                          {state ? state && <Lottie options={defaultOptions} height={17} width={17} id={item.id_post} /> : <img className='h-15px fill-current cursor-pointer' src={coeur} alt='' />}
                        </button>
                        {/* <div> */}
                        {/* {state && <Lottie options={defaultOptions} height={40} width={40} />} */}
                        {/* </div> */}
                        {/* <button onClick={handleFav.bind(item.id_post)} className="px-2 upvote text-red-450 cursor-pointer dark:text-black">Fav</button> */}
                      </div>
                      <div className="bg-white-0 text-black absolute top-44 text-xl font-bold flex w-max py-1 rounded-lg">
                        <button onClick={handleUpvote.bind(item)} className="pl-2 relative">
                          <motion.img whileTap={{ scale: 0.85 }} id="upvote_haut" src={upvoteHaut} className="opacity-100 h-28px"></motion.img>
                          {/* <img src={upvoteorange} className="absolute top-0 h-30px dark:opacity-0"></img> */}
                        </button>

                        <span id='nb_upvote' ref={nbUpvote} className="px-2 upvote text-red-450 dark:text-black">{item.upvote}</span>
                        <button onClick={handleDownvote.bind(item)} className="pr-2 relative">
                          <motion.img whileTap={{ scale: 0.85 }} id="upvote_bas" src={upvoteBas} className="opacity-100 dark:opacity-100 h-28px"></motion.img>
                          {/* <img src={upvoteorange} className="transform rotate-180 absolute top-0 h-30px dark:opacity-0"></img> */}
                        </button>
                      </div>
                    </div>
                    <h1 className="text-lg font-semibold mx-2 max-w-md	">{item.title}</h1>
                    <div className="flex mt-2 text-sm w-92vw max-w-md	">
                      <img src={adresse} className="ml-2 mr-1 w-3.5"></img> {item.address} <div className="absolute right-3">{item.postal}</div>
                    </div>
                  </li>
                </div>
              </motion.div>
            ))}

          </div>
        </ul>
      </div >
    );
  }
};

export default Thread;
