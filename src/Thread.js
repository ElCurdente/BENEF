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
import localisation from './images/icon/icon_localisation.svg';
import sablier from './images/icon/icon_sablier.svg';
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
import fleche from './images/icon/icon_fleche.svg';

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
  const [modalItem, setModalItem] = useState([])

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

  const [openModal, setOpenModal] = useState(false);

  const btnOuvrir = () => {
    setOpenModal(true);
  }

  const btnFermer = () => {
    setOpenModal(false);
  }
  const modal = useRef(null);

  function handleModal() {
    setOpenModal(true);
    setModalItem(this);
    fetch('https://benef-app.fr/api-infos-utilisateur.php', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_user: modalItem.id_user })
    })
      .then((response) => response.json())
      .then((data) => {
        setModalItem(prevState => ({
          ...prevState,
          user_pseudo: data.username,
        }));
      })
      .catch(err => {
        console.log("Error Reading data " + err);
      });
    console.log(modalItem);
  }

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
          <div className="mt-16 ml-6 mr-6 pb-12 xl:dark:bg-gray-550">


            <div id="containerModal" className={openModal ? "block" : "hidden"}>
              <div id="modal" ref={modal} className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-end">

                <div className="w-full xl:w-2/6 h-90% mb-10 xl:mb-0 relative flex flex-col justify-start items-center rounded-t-3xl bg-white-0 overflow-auto">
                  <div className="mb-5 mt-7 mx-3 flex flex-col">
                    <div className="w-full h-250px relative">
                      <img className="object-cover rounded-t-lg h-full w-full" src={modalItem.image} alt="" />
                    </div>
                    {/* <h1 className="text-lg xl:text-xl font-semibold mx-2 max-w-md">{modalItem.image}</h1> */}
                    <h1 className="text-lg xl:text-xl font-semibold max-w-md mt-2">{modalItem.title}</h1>
                    <h1 className="text-base xl:text-lg px-4 max-w-max py-1 text-red-450 rounded-full border-2 border-red-450 font-semibold mt-4">{modalItem.category}</h1>

                    <div className="flex w-92vw max-w-md mt-4">
                      <motion.img animate={{ y: ["-10%", "-40%"] }} transition={{ yoyo: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="loca" src={localisation} className="opacity-100 h-20px"></motion.img><div className='ml-6'>{modalItem.address}{", "}{modalItem.postal}</div>
                    </div>

                    <div className="flex mt-2 w-92vw max-w-md">
                      <motion.img animate={{ rotate: 180 }} transition={{ repeat: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="sablier" src={sablier} className="opacity-100 h-20px "></motion.img><div className='ml-7'>{modalItem.expiration}</div>
                    </div>

                    <h1 className="text-sm xl:text-sm max-w-md mt-4">{modalItem.description}</h1>

                    <h1 className="self-end text-sm mt-4"> Posté par <span className="font-semibold">{modalItem.user_pseudo}</span></h1>

                    <div className="flex w-full justify-evenly mt-10 mb-10">
                      <button onClick={() => setOpenModal(false)} className="block px-4 font-semibold py-2 bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:text-black rounded-full transition duration-300 ease-in-out text-white-0" type="submit">Fermer</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            {items.sort(compare).map(item => (
              <motion.div className="w-92vw xl:w-full relative bg-red-450 dark:bg-black rounded-lg text-white-0 mb-4 xl:mb-5 shadow-customm"
                whileHover={{ scale: 1.01 }}>
                <div className="w-full h-250px relative">
                  <img className="object-cover rounded-t-lg h-full w-full" src={item.image} alt="" />
                </div>
                <div className="w-full min-h-max pb-4 md:cursor-pointer" onClick={handleModal.bind(item)} >
                  <h1 className="text-lg font-semibold mx-2 max-w-md mt-2	">{item.title}</h1>
                  <div className="flex mt-2 text-sm w-92vw max-w-md">
                    <img src={adresse} className="ml-2 mr-1 w-3.5"></img> {item.address} <div className="absolute right-3">{item.postal}</div>
                  </div>

                </div>
                <li key={item.id_post} className="mt-1 w-92vw max-w-md">
                  <div>
                    <div className="bg-white-0 h-7 w-7 text-black absolute flex justify-center items-center top-3 right-2 rounded-full">
                      <button className="upvote text-red-450 dark:text-black"
                        onClick={
                          // () => {
                          // setState(!state);

                          handleFav.bind(item.id_post)
                          // }
                        }
                      >
                        {state ? state && <Lottie options={defaultOptions} height={17} width={17} id={item.id_post} /> : <img className='h-15px fill-current cursor-pointer' id={item.id_post} src={coeur} alt='' />}
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



                </li>


              </motion.div>
            ))}

          </div>
        </ul>
      </div >

    );
  }
};

export default Thread;
