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
import coeurPlein from './images/icon/icon_coeur_rempli.svg';
import fleche from './images/icon/icon_fleche.svg';
import signaler from './images/icon/icon_signaler.svg';

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
  const [userItems, setUserItems] = useState([]);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [isVoted, setIsVoted] = useState(0);
  const [isUpvoted, setIsUpvoted] = useState([])
  const [isDownvoted, setIsDownvoted] = useState([])
  const [refreshKey, setRefreshKey] = useState(0);
  const nbUpvote = useRef(null);
  let history = useHistory();
  const [modalItem, setModalItem] = useState([]);
  const [modalItemUser, setModalItemUser] = useState([]);
  const [modalItemUserPost, setModalItemUserPost] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalUser, setOpenModalUser] = useState(false);
  const [openModalUserPost, setOpenModalUserPost] = useState(false);
  const [isFav, setIsFav] = useState([])

  useEffect(() => {
    fetch("https://benef-app.fr/api-post-render.php")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.items);

          console.log(items[0]);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [isLoaded])

  useEffect(() => {
    fetch('https://benef-app.fr/api-post-user2.php', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_user: sessionStorage.getItem('id_user') })
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUserItems(result.userItems);
          console.log(userItems);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  useEffect(() => {
    fetch("https://benef-app.fr/api-favoris-render-2.php", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_user: sessionStorage.getItem('id_user') })
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setIsFav(result)
          console.log(isFav)
        },
        (error) => {
          setError(error);
        }
      )
  }, [isLoaded])

  useEffect(() => {
    if (openModal) {
      console.log("prêt à fetch")
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
          console.log(data)
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
  }, [openModal])

  useEffect(() => {
    if (openModalUser) {
      console.log("prêt à fetch")
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
          console.log(data)
          setModalItemUser(prevState => ({
            ...prevState,
            user_pseudo: data.username,
          }));
        })
        .catch(err => {
          console.log("Error Reading data " + err);
        });
      console.log(modalItemUser);
    }
  }, [openModalUser])

  function handleFav() {
    console.log({ id_user: sessionStorage.getItem('id_user'), id_post: this });
    if (isFav.find(x => x == this) != this) {
      setIsFav(prevState => [...prevState, this]);
      console.log(isFav);
      fetch('https://benef-app.fr/api-favoris.php', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_user: sessionStorage.getItem('id_user'), id_post: this })
      })
        .then((data) => {
          console.log(data);

        })
        .catch(err => {
          console.log("Error Reading data " + err);
        });
    } else {
      setIsFav(isFav.filter(item => item !== this));
      fetch('https://benef-app.fr/api-favoris-sup.php', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_user: sessionStorage.getItem('id_user'), id_post: this })
      })
        .then((data) => {
          console.log(data);

        })
        .catch(err => {
          console.log("Error Reading data " + err);
        });
    }

    setState(!state);
  }

  function handleUpvote() {
    console.log(this)
    setIsVoted(this.id_post)
    setUpvote(true);
    setIsVoting(true);
  }

  useEffect(() => {
    if (upvote) {
      console.log(isUpvoted)
      for (var i = 0; i < items.length; i++) {
        if (items[i].id_post === isVoted) {
          let feed = isUpvoted.find(x => x == isVoted);
          if (feed == isVoted) {
            console.log(feed + ", ne peut upvote")
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
                console.log(data);
              })
              .catch(err => {
                console.log("Error Reading data " + err);
              });
            items[i].upvote--;
            setUpvote(false)
            setIsUpvoted(isUpvoted.filter(item => item !== isVoted));
          }
          else {
            console.log(feed + "n'est pas upvote donc peut upvote")
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
                console.log(data);
                // setRefreshKey(oldKey => oldKey + 1)
              })
              .catch(err => {
                console.log("Error Reading data " + err);
              });
            items[i].upvote++;
            console.log(items[i].upvote);
            setUpvote(false)
            setIsDownvoted(isDownvoted.filter(item => item !== isVoted));

          }

        }
      }
    } else if (downvote) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].id_post === isVoted) {
          let feed = isDownvoted.find(x => x == isVoted);
          if (feed == isVoted) {
            console.log(feed + ", ne peut upvote")
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
            items[i].upvote++;
            
            setDownvote(false)
            setIsDownvoted(isDownvoted.filter(item => item !== isVoted));

          }
          else {
            console.log(feed + "n'est pas upvote donc peut upvote")
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
                console.log(data);
              })
              .catch(err => {
                console.log("Error Reading data " + err);
              });
            items[i].upvote--;
            console.log(items[i].upvote);
            
            setDownvote(false)
            setIsUpvoted(isUpvoted.filter(item => item !== isVoted));
          }

        }


      }
    }
    setIsVoting(false)
  }, [isVoting])

  function handleDownvote() {
    console.log(this)
    setIsVoted(this.id_post)
    setDownvote(true);
    setIsVoting(true);
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

  const btnOuvrir = () => {
    setOpenModal(true);
  }

  const btnFermer = () => {
    setOpenModal(false);
  }
  const modal = useRef(null);
  const modalUser = useRef(null);
  const modalUserPost = useRef(null);

  function handleModal() {
    setOpenModal(true);
    setModalItem(this);
  }

  function handleModalUser() {
    setOpenModalUser(true);
    setModalItemUser(this);
  }

  const [user, setUser] = useState({
    username: '',
    bio: ''
  });

  const [openModalReport, setOpenModalReport] = useState(false);
  const [reportedId, setReportedId] = useState(0);
  const [confirmedReport, setConfirmedReport] = useState(false);

  function handleReport() {
    setOpenModalReport(true);
    setReportedId(this);
  }

  function resetReport() {
    setOpenModalReport(false);
    setConfirmedReport(false);
  }

  const handleReportPost = () => {
    console.log("Suppression du post n°"+ reportedId);
    // setOpenModalSupp(false);
    fetch('https://benef-app.fr/api-report.php', {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({id_post: reportedId})
})
  .then((data) => {
    console.log(data);
    setConfirmedReport(true)
  })
  .catch(err => {
    console.log("Error Reading data " + err);
  });
}


  useEffect(() => {
    console.log({ id_user: modalItem.id_user })
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
        console.log(data);
        setUser({
          username: data.username,
          bio: data.bio
        })
        console.log(user)
      })
      .catch(err => {
        console.log("Error Reading data " + err);
      });
  }, [])

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (

      <div className=" h-screen w-screen flex justify-center xl:justify-center overflow-x-hidden overflow-auto items-center bg-white-0 xl:dark:bg-gray-550">
        <div id="containerModal" className={openModalReport ? "block" : "hidden"}>
          {!confirmedReport ? 
           <div id="modal" ref={modal} className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-center">

           <div className="w-full xl:w-2/6  mb-10 xl:mb-0 relative flex flex-col justify-center items-center rounded-3xl bg-white-0 overflow-auto dark:bg-gray-550 dark:text-white-0">
               <div className="mb-5 mt-7 mx-3 flex flex-col">                 
                  <h1 className="text-lg xl:text-xl font-semibold text-align max-w-md mt-2 text-center">Voulez-vous signaler ce post ?</h1>
                  <h1 className="text-lg xl:text-sm font-light max-w-md mt-2 text-align">Vous pouvez signaler ce post s’il contient des images choquantes, des textes offensants, un contenu inapproprié ou autre.
                    Ce signalement sera anonyme.<br></br><br></br>
                  <span className="font-semibold">En savoir plus </span> sur nos règles de conditions générales.</h1>
                  <div className="flex w-full justify-evenly mt-5 mb-10">
                    
                    <button onClick={() => setOpenModalReport(false)} className="block px-4 border-red-450  text-red-450 font-semibold border-2 border-white-0 bg-white-0 hover:bg-red-450 hover:text-white-0 hover:border-white-0 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:text-black rounded-full transition duration-300 ease-in-out" type="submit">Annuler</button>
                   <button onClick={() => handleReportPost()} className="block px-4 font-semibold py-2 bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:border-black dark:text-black rounded-full transition duration-300 ease-in-out text-white-0" type="submit">Signaler</button>
                       

                   </div>
               </div>
           </div>
       </div>
          : 
          <div id="modal" ref={modal} className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-center">

           <div className="w-full xl:w-2/6  mb-10 xl:mb-0 relative flex flex-col justify-center items-center rounded-3xl bg-white-0 overflow-auto dark:bg-gray-550 dark:text-white-0">
               <div className="mb-5 mt-7 mx-3 flex flex-col">                 
                   <h1 className="text-lg xl:text-xl font-semibold max-w-md mt-2">Merci, ce post a bien été signalé.</h1>
                   <div className="flex w-full justify-evenly mt-5 mb-10">
                       <button onClick={() => resetReport()} className="block px-4 font-semibold py-2 bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:border-black dark:text-black rounded-full transition duration-300 ease-in-out text-white-0" type="submit">Retour</button>

                   </div>
               </div>
           </div>
       </div>
          }
             </div>

                   
        {/* <motion.div className="">
          <img src={upvoteHautplein} />
        </motion.div> */}
        <ul className="h-full xl:w-2/6 bg-white-0 xl:dark:bg-gray-550 ">
          <div className="mt-16 ml-6 mr-6 pb-12 xl:dark:bg-gray-550">


            <div id="containerModal" className={openModal ? "block" : "hidden"}>
              <div id="modal" ref={modal} className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-end">

                <div className="w-full xl:w-2/6 h-90% xl:h-95% mb-10 xl:mb-0 relative flex flex-col justify-start items-center rounded-t-3xl bg-white-0 overflow-auto dark:bg-gray-550 dark:text-white-0">
                  <div className="mb-5 mt-7 mx-3 flex flex-col">
                    <div className="w-full h-250px relative">
                      <img className="object-cover rounded-t-lg h-full w-full" src={modalItem.image} alt="" />
                    </div>
                    {/* <h1 className="text-lg xl:text-xl font-semibold mx-2 max-w-md">{modalItem.image}</h1> */}
                    <h1 className="text-lg xl:text-xl font-semibold max-w-md mt-2">{modalItem.title}</h1>
                    <h1 className="text-base xl:text-lg px-4 max-w-max py-1 text-red-450 dark:text-white-0 rounded-full border-2 border-red-450 dark:border-white-0 font-semibold mt-4">{modalItem.category}</h1>

                    <div className="flex w-92vw max-w-md mt-4">
                      <motion.img animate={{ y: ["-10%", "-40%"] }} transition={{ yoyo: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="loca" src={localisation} className="opacity-100 h-20px"></motion.img><div className='ml-6'>{modalItem.address}{", "}{modalItem.postal}</div>
                    </div>

                    <div className="flex mt-2 w-92vw max-w-md">
                      <motion.img animate={{ rotate: 180 }} transition={{ repeat: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="sablier" src={sablier} className="opacity-100 h-20px "></motion.img>
                      {modalItem.expiration != '0000-00-00' ? <div className='ml-7'>{modalItem.expiration}</div> : <div className='ml-7'>A vie</div>}

                    </div>

                    <h1 className="text-sm xl:text-sm max-w-md mt-4">{modalItem.description}</h1>

                    <h1 className="self-end text-sm mt-4"> Posté par <span className="font-semibold cursor-pointer" onClick={handleModalUser.bind(modalItem)}>{modalItem.user_pseudo}</span></h1>

                    <div className="flex w-full justify-evenly mt-5 mb-10">
                      <button onClick={() => setOpenModal(false)} className="block px-4 font-semibold py-2 bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:border-black dark:text-black rounded-full transition duration-300 ease-in-out text-white-0" type="submit">Fermer</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="containerModal" className={openModalUser ? "block" : "hidden"}>
              <div id="modal" ref={modalUser} className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-end">

                <div className="relative overflow-auto flex flex-col justify-start pt-16 items-center xl:mt-15 h-screen w-screen bg-white-0 xl:dark:bg-gray-550 dark:text-white-0">

                  <div className="absolute flex w-full z-50 justify-end mt-5 mr-5">
                    <button onClick={() => setOpenModalUser(false)} className="block px-4 font-semibold py-2 bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:border-black dark:text-black rounded-full transition duration-300 ease-in-out text-white-0" type="submit">Fermer</button>
                  </div>

                  <div id="containerModal" className={openModalUserPost ? "block" : "hidden"}>
                    <div id="modal" ref={modalUserPost} className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-end">

                      <div className="w-full xl:w-2/6 h-90% xl:h-95% mb-10 xl:mb-0 relative flex flex-col justify-start items-center rounded-t-3xl bg-white-0 overflow-auto dark:bg-gray-550 dark:text-white-0">
                        <div className="mb-5 mt-7 mx-3 flex flex-col">
                          <div className="w-full h-250px relative">
                            <img className="object-cover rounded-t-lg h-full w-full" src={modalItemUserPost.image} alt="" />
                          </div>
                          {/* <h1 className="text-lg xl:text-xl font-semibold mx-2 max-w-md">{modalItem.image}</h1> */}
                          <h1 className="text-lg xl:text-xl font-semibold max-w-md mt-2">{modalItemUserPost.title}</h1>
                          <h1 className="text-base xl:text-lg px-4 max-w-max py-1 text-red-450 dark:text-white-0 rounded-full border-2 border-red-450 dark:border-white-0 font-semibold mt-4">{modalItemUserPost.category}</h1>

                          <div className="flex w-92vw max-w-md mt-4">
                            <motion.img animate={{ y: ["-10%", "-40%"] }} transition={{ yoyo: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="loca" src={localisation} className="opacity-100 h-20px"></motion.img><div className='ml-6'>{modalItemUserPost.address}{", "}{modalItemUserPost.postal}</div>
                          </div>

                          <div className="flex mt-2 w-92vw max-w-md">
                            <motion.img animate={{ rotate: 180 }} transition={{ repeat: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="sablier" src={sablier} className="opacity-100 h-20px "></motion.img>
                            {modalItemUserPost.expiration != '0000-00-00' ? <div className='ml-7'>{modalItemUserPost.expiration}</div> : <div className='ml-7'>A vie</div>}

                          </div>

                          <h1 className="text-sm xl:text-sm max-w-md mt-4">{modalItemUserPost.description}</h1>

                          {/* <h1 className="self-end text-sm mt-4"> Posté par <span className="font-semibold">{modalItem.user_pseudo}</span></h1> */}

                          <div className="flex w-full justify-evenly mt-5 mb-10">
                            <button onClick={() => setOpenModalUserPost(false)} className="block px-4 font-semibold py-2 bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:border-black dark:text-black rounded-full transition duration-300 ease-in-out text-white-0" type="submit">Fermer</button>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="infos" className="relative xl:w-2/6 w-95vw px-4 xl:-px-0">
                    <div className="flex items-center">
                      <img className="w-100px h-100px bg-transparent dark:bg-gray-650 border-3 border-red-450 dark:border-black rounded-full object-cover" />
                      <h1 className="ml-3 text-xl font-semibold">{modalItemUser.username}</h1>
                    </div>
                    <p className="col-span-2 mt-2">{user.bio}</p>
                    <div className="flex items-center justify-between col-span-2 h-16 pt-4">
                      {/* <button onClick={handleModify} className="flex items-center h-10 bg-red-450 py-2 px-4 rounded-3xl text-white-0 dark:text-black hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:bg-white-0 dark:border-white-0">Modifie ton profil</button> */}
                      <Link to="/favoris"><button className="flex items-center text-red-450 dark:text-white-0 hover:underline">Voir mes favoris <img className="pl-1 h-15px fill-current" src={coeur} alt="" /></button></Link>
                    </div>

                  </div>
                  <div id="barre1" className="h-1px w-95vw xl:w-2/6 mt-4 bg-gray-200"></div>
                  <div id="badges" className="w-95vw h-100px xl:w-2/6">
                    <h3 className="font-bold pt-4 pl-4">Badges</h3>
                  </div>
                  <div id="barre1" className="h-1px w-95vw mt-10 bg-gray-200 xl:w-2/6"></div>
                  <div id="bp_perso" className="w-95vw xl:w-2/6">
                    <h3 className="font-bold pt-4 pl-4 ">Bons plans publiés</h3>
                    <div className='w-full h-full flex flex-col items-center mt-5'>
                      {items.map(item => (
                        <motion.div className="w-92vw xl:w-full relative bg-red-450 dark:bg-black rounded-lg text-white-0 mb-4 xl:mb-5 shadow-customm"
                          whileHover={{ scale: 1.01 }}>
                          <div className="w-full h-250px relative" onClick={handleModal.bind(item)}>
                            <img className="object-cover rounded-t-lg h-full w-full" src={item.image} alt="" />
                          </div>
                          <div className="w-full min-h-max pb-4 md:cursor-pointer" onClick={handleModal.bind(item)} >
                            <h1 className="text-lg font-semibold mx-2 max-w-md mt-2	">{item.title}</h1>
                            <div className="flex mt-2 text-sm w-92vw max-w-md">
                              <img src={adresse} className="ml-2 mr-1 w-3.5"></img> {item.address} <div className="absolute right-3">{item.postal}</div>
                            </div>

                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {items.sort(compare).map(item => (
              <motion.div className="w-92vw xl:w-full relative bg-red-450 dark:bg-black rounded-lg text-white-0 mb-4 xl:mb-5 shadow-customm"
                whileHover={{ scale: 1.01 }}>
                <div className="w-full h-250px relative" onClick={handleModal.bind(item)}>
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
                    <div className="bg-white-0 h-10 w-10 text-black absolute flex justify-center items-center top-3 right-2 rounded-full">
                      <button className="upvote text-red-450 dark:text-black"
                        onClick={handleFav.bind(item.id_post)}>
                        {
                          isFav.find(x => x == item.id_post) == item.id_post ? <img className='h-20px fill-current cursor-pointer' src={coeurPlein} alt='' /> :
                            <img className='h-20px fill-current cursor-pointer' src={coeur} alt='' />
                        }

                      </button>
                    </div>
                    <button className="bg-white-0 h-10 w-10 text-black absolute z-30 flex justify-center items-center top-3 right-16 rounded-full" onClick={handleReport.bind(item.id_post)}>
                      <img src={signaler} className="w-6 h-6"></img>
                    </button>
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
