import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import adresse from './images/icon/adress.svg';
import upvoteBas from './images/icon/upvote.svg';
import upvoteHaut from './images/icon/upvote2.svg';
import upvoteBasDark from './images/icon/upvote_dark.svg';
import upvoteHautDark from './images/icon/upvote2_dark.svg';
import localisation from './images/icon/icon_localisation.svg';
import sablier from './images/icon/icon_sablier.svg';
import { motion } from 'framer-motion/dist/framer-motion';
import coeur from './images/icon/icon_coeur.svg';
import coeurB from './images/icon/icon_coeur_b.svg';
import coeurPlein from './images/icon/icon_coeur_rempli.svg';
import pleure from './images/illustrations/pleure.png';
import { AES, enc } from 'crypto-js';
import animationData2 from './images/animation/loading.json';
import animationData3 from './images/animation/loader_light.json';
import animationData4 from './images/animation/loader_dark.json';
import sablierB from './images/icon/icon_sablier_b.svg';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';


function Favoris() {

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData3,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const defaultOptions3 = {
    loop: true,
    autoplay: true,
    animationData: animationData4,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  /* Permet de décrypter l'id_user présent dans le Storage du client */

  let decrypted;
  if (localStorage.getItem('isConnected')) {
    decrypted = AES.decrypt(localStorage.getItem('id_user'), 'MYKEY4DEMO');
  } else {
    decrypted = AES.decrypt(sessionStorage.getItem('id_user'), 'MYKEY4DEMO');
  }
  const id_user = decrypted.toString(enc.Utf8);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [isSuppr, setIsSuppr] = useState('');
  const [suppr, setSuppr] = useState(false);
  const [modalItem, setModalItem] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isFav, setIsFav] = useState([])
  const [isVoting, setIsVoting] = useState(false);
  const [isVoted, setIsVoted] = useState(0);
  const [isUpvoted, setIsUpvoted] = useState([]);
  const [isDownvoted, setIsDownvoted] = useState([]);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const nbUpvote = useRef(null);

  /* Fetch permettant de récuprérer les posts favoris de l'utilisateur */

  useEffect(() => {
    fetch("https://benef-app.fr/api-favoris-render.php", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_user: id_user })
    })
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
  }, [isLoaded])

  /* Fonction permettant de supprimer un post favoris côté serveur */

  function handleFav() {
    setIsSuppr(this);
    fetch('https://benef-app.fr/api-favoris-sup.php', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_user: id_user, id_post: this })
    })
      .then((data) => {
        // setIsLoaded(false);
        setSuppr(true)
      })
      .catch(err => {
        console.log("Error Reading data " + err);
      });
  }

  /* Fonction permettant de supprimer un post favoris côté client */

  useEffect(() => {
    for (var i = 0; i < items.length; i++) {
      if (items[i].id_post === isSuppr) {
        items.splice(i, 1);
        i--;
        setSuppr(false);
      }
    }
  }, [suppr])


  /* Fonction permettant d'ajouter un vote côté serveur */

  function handleUpvote() {
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
        // setRefreshKey(oldKey => oldKey + 1)
      })
      .catch(err => {
        console.log("Error Reading data " + err);
      });
  }

  /* Fonction permettant de retirer un vote côté serveur */

  function handleDownvote() {
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
      })
      .catch(err => {
        console.log("Error Reading data " + err);
      });
  }

  /* Fonction qui permet de trier les posts selon les votes */

  function compare(a, b) {
    if (parseInt(a.upvote) < parseInt(b.upvote)) {
      return 1;
    }
    if (parseInt(a.upvote) > parseInt(b.upvote)) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    fetch("https://benef-app.fr/api-favoris-render-2.php", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_user: id_user })
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsFav(result)
        },
        (error) => {
          setError(error);
        }
      )
  }, [isLoaded])

  /* Stock les valeurs dans les states */

  function handleUpvote() {
    setIsVoted(this.id_post)
    setUpvote(true);
    setIsVoting(true);
  }

  /* Grosse fonction pour gérer les votes côté client */

  useEffect(() => {
    if (upvote) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].id_post === isVoted) {
          let feed = isUpvoted.find(x => x === isVoted);
          if (feed === isVoted) {
            fetch('https://benef-app.fr/api-downvote.php', {
              method: "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(items[i])
            })
              .then((response) => response.json())
              .then((data) => {
              })
              .catch(err => {
                console.log("Error Reading data " + err);
              });
            items[i].upvote--;
            setUpvote(false)
            setIsUpvoted(isUpvoted.filter(item => item !== isVoted));
          }
          else {
            setIsUpvoted(prevState => [...prevState, isVoted])
            fetch('https://benef-app.fr/api-upvote.php', {
              method: "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(items[i])
            })
              .then((response) => response.json())
              .then((data) => {
                // setRefreshKey(oldKey => oldKey + 1)
              })
              .catch(err => {
                console.log("Error Reading data " + err);
              });
            items[i].upvote++;
            setUpvote(false)
            setIsDownvoted(isDownvoted.filter(item => item !== isVoted));

          }

        }
      }
    } else if (downvote) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].id_post === isVoted) {
          let feed = isDownvoted.find(x => x === isVoted);
          if (feed === isVoted) {
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
                // setRefreshKey(oldKey => oldKey + 1)
              })
              .catch(err => {
                console.log("Error Reading data " + err);
              });
            items[i].upvote++;
            setDownvote(false)
            setIsDownvoted(isDownvoted.filter(item => item !== isVoted));

          }
          else {
            setIsDownvoted(prevState => [...prevState, isVoted])
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
              })
              .catch(err => {
                console.log("Error Reading data " + err);
              });
            items[i].upvote--;
            setDownvote(false)
            setIsUpvoted(isUpvoted.filter(item => item !== isVoted));
          }

        }


      }
    }
    setIsVoting(false)
  }, [isVoting])

  function handleDownvote() {
    setIsVoted(this.id_post)
    setDownvote(true);
    setIsVoting(true);
  }

  const modal = useRef(null);

  function handleModal() {
    setOpenModal(true);
    setModalItem(this);
  }

  /* Récupère les infos utilisateurs pour la modale */

  useEffect(() => {
    if (openModal) {
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
          const envryptedString = AES.encrypt(data.id_user, 'MYKEY4DEMO');
          localStorage.setItem('id_user_post', envryptedString.toString());
          setModalItem(prevState => ({
            ...prevState,
            user_pseudo: data.username,
            file: data.image
          }));
        })
        .catch(err => {
          console.log("Error Reading data " + err);
        });
      console.log(modalItem);
    }
  }, [openModal])

  if (error) {
    /* S'affiche si l'on arrive pas à fetch (problème de connexion par exemple) */ 
    return <div className="flex flex-col justify-center items-center text-center h-screen w-screen">
    <img className="mb-5 w-20" src={pleure} alt='emoji pleure' />
    <h1 className="text-lg xl:text-xl font-semibold max-w-md mt-2">
      Mince, il y a un petit problème<br></br>
      <div className="font-light xl:text-base flex flex-wrap justify-center mt-2"><span>Nous te conseillons de rafraîchir la page !</span></div>
    </h1>
  </div>;
  } else if (!isLoaded) {
    /* S'affiche pendant le chargement des donnés (loader) */ 
    return <div className='h-screen w-screen flex justify-center items-center bg-red-450 dark:bg-black xl:bg-white-0 xl:dark:bg-white-0'>
      <div className='flex justify-center items-center dark:hidden'>
        <Lottie options={defaultOptions2}
          height={500}
          width={500} className="" />
      </div>
      <div className='justify-center items-center hidden dark:flex'>
        <Lottie options={defaultOptions3}
          height={500}
          width={500} className="" />
      </div>
    </div>;
  } else {

    return (
      
      <div className=" h-screen w-screen flex flex-col justify-center xl:justify-center overflow-x-hidden overflow-auto items-center bg-white-0 dark:bg-gray-550 xl:p-5">
        {/* <motion.div className="">
              <img src={upvoteHautplein} alt='icon upvote'/>
            </motion.div> */}
        <ul className="h-full xl:w-2/6 bg-white-0 dark:bg-gray-550 relative top-10">
        <h1 className="text-center dark:text-white-0 text-2xl font-bold mt-5">Bons plans favoris</h1>
          <div className="mt-5 ml-4 mr-4 pb-24 xl:pb-12 dark:bg-gray-550">

            <div id="containerModal" className={openModal ? "block" : "hidden"}>
              <div id="modal" ref={modal} className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-end">

                <div className="w-full xl:w-2/6 h-90% xl:h-95% mb-10 xl:mb-0 relative flex flex-col justify-start items-center rounded-t-3xl bg-white-0 overflow-auto dark:bg-gray-550 dark:text-white-0">
                  <div className="mb-5 mt-7 mx-3 flex flex-col">
                    <div className="w-full h-250px relative">
                      <img className="object-cover rounded-t-lg h-full w-full" src={modalItem.image} alt="modale" />
                    </div>
                    {/* <h1 className="text-lg xl:text-xl font-semibold mx-2 max-w-md">{modalItem.image}</h1> */}
                    <h1 className="text-lg xl:text-xl font-semibold max-w-md mt-2">{modalItem.title}</h1>
                    <h1 className="text-base xl:text-lg px-4 max-w-max py-1 text-red-450 dark:text-white-0 rounded-full border-2 border-red-450 dark:border-white-0 font-semibold mt-4">{modalItem.category}</h1>

                    <div className="flex w-92vw max-w-md mt-4">
                      <motion.img animate={{ y: ["-10%", "-40%"] }} transition={{ yoyo: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="loca" src={localisation} className="opacity-100 h-20px dark:hidden" alt="icon localisation"></motion.img>
                      <motion.img animate={{ y: ["-10%", "-40%"] }} transition={{ yoyo: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="loca" src={adresse} className="opacity-100 h-20px hidden dark:block" alt="icon localisation"></motion.img>
                      <div className='ml-6'>{modalItem.place}{", "}{modalItem.address}{", "}{modalItem.postal}</div>
                    </div>

                    <div className="flex mt-2 w-92vw max-w-md">
                      <motion.img animate={{ rotate: 180 }} transition={{ repeat: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="sablier" src={sablier} className="opacity-100 h-20px dark:hidden" alt="icon sablier"></motion.img>
                      <motion.img animate={{ rotate: 180 }} transition={{ repeat: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="sablier" src={sablierB} className="opacity-100 h-20px hidden dark:block" alt="icon sablier"></motion.img>
                      {modalItem.expiration !== '0000-00-00' ? <div className='ml-7'>{modalItem.expiration}</div> : <div className='ml-7'>A vie</div>}

                    </div>

                    <h1 className="text-sm xl:text-sm max-w-md mt-4">{modalItem.description}</h1>

                    <div className='flex self-end items-center text-sm max-w-md mt-4'>
                      <Link to="/profil2" className='flex items-center'>
                        Posté par <span className="font-semibold cursor-pointer ml-1 mr-2" onClick={handleModal.bind(modalItem)}>{modalItem.user_pseudo}</span>
                        <img className="h-8 w-8 xl:border-2 cursor-pointer xl:h-8 xl:w-8 rounded-full xl:rounded-full border-2 border-red-450 dark:border-white-0" src={modalItem.file} alt="profil" /></Link>
                    </div>

                    <div className="flex w-full justify-evenly mt-5 mb-10">
                      <button onClick={() => setOpenModal(false)} name='bouton fermer' className="block px-4 font-semibold py-2 bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:border-black dark:text-black rounded-full transition duration-300 ease-in-out text-white-0" type="submit">Fermer</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            {items.length === 0 ?
                <div className="flex flex-col items-center justify-center text-center">
                  <img className="mb-5 w-20" src={pleure} alt='emoji pleure' />
                  <h1 className="text-lg xl:text-xl font-semibold max-w-md mt-2 dark:text-white-0">
                    Oups... tu n'as aucun bon plan favori<br></br>
                    <div className="font-light xl:text-base flex flex-wrap justify-center mt-2 dark:text-white-0"><span className="w-fit">Il te suffit de cliquer sur</span> <img className="h-6 mx-2 hidden dark:block" src={coeurB} alt='icone coeur' /><img className="h-6 mx-2 dark:hidden" src={coeur} alt='icone coeur' /><span className="w-fit"> des bons plans qui</span><span className="w-fit">t'intéressent et ils s'afficheront ici !</span></div>
                  </h1>
                </div>
          
          :

          items.sort(compare).map(item => (
            <motion.div key={item.id_post} className="w-92vw xl:w-full relative bg-red-450 dark:bg-black rounded-lg text-white-0 mb-4 xl:mb-5 shadow-customm"
              whileHover={{ scale: 1.01 }}>
              <div className="w-full h-250px relative" onClick={handleModal.bind(item)}>
                <img className="object-cover rounded-t-lg h-full w-full" src={item.image} alt="post" />
              </div>
              <div className="w-full min-h-max pb-4 md:cursor-pointer" onClick={handleModal.bind(item)} >
                <h1 className="text-lg font-semibold mx-2 max-w-md mt-2	">{item.title}</h1>
                <div className="flex mt-2 text-sm w-92vw max-w-md">
                  <img src={adresse} className="ml-2 mr-1 w-3.5" alt='icon adresse'></img> {item.address} <div className="absolute right-3">{item.postal}</div>
                </div>

              </div>
              <li key={item.id_post} className="mt-1 w-92vw max-w-md">
                <div>
                  <div className="bg-white-0 h-10 w-10 text-black absolute flex justify-center items-center top-3 right-2 rounded-full">
                    <button className="upvote text-red-450 dark:text-black" name='bouton fav'
                      onClick={handleFav.bind(item.id_post)}>
                      {
                        isFav.find(x => x === item.id_post) === item.id_post ? <img className='h-20px fill-current cursor-pointer active:h-24px' src={coeurPlein} alt='icon coeur rempli' /> :
                          <img className='h-20px fill-current cursor-pointer' src={coeur} alt='icon coeur' />
                      }

                    </button>
                  </div>
                  <div className="bg-white-0 text-black absolute top-44 text-xl font-bold flex w-max py-1 rounded-lg -left-2 pl-2">
                    <button onClick={handleUpvote.bind(item)} className="pl-2 relative" name='bouton upvote haut'>
                      <motion.img whileTap={{ scale: 0.85 }} id="upvote_haut" src={upvoteHaut} className="block dark:hidden h-28px" alt="icon upvote haut"></motion.img>
                      <motion.img whileTap={{ scale: 0.85 }} id="upvote_haut" src={upvoteHautDark} className="hidden dark:block h-28px" alt="icon upvote haut"></motion.img>
                    </button>

                    <span id='nb_upvote' ref={nbUpvote} className="px-2 upvote text-red-450 dark:text-black">{item.upvote}</span>
                    <button onClick={handleDownvote.bind(item)} className="pr-2 relative" name='bouton upvote bas'>
                      <motion.img whileTap={{ scale: 0.85 }} id="upvote_bas" src={upvoteBas} className="block dark:hidden h-28px" alt="icon upvote bas"></motion.img>
                      <motion.img whileTap={{ scale: 0.85 }} id="upvote_haut" src={upvoteBasDark} className="hidden dark:block h-28px" alt="icon upvote haut"></motion.img>
                    </button>
                  </div>
                </div>
              </li>
            </motion.div>
          ))
          
          }

            

          </div>
        </ul>
      </div >
    );
  }
};

export default Favoris
