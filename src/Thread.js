import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import adresse from './images/icon/adress.svg';
import localisation from './images/icon/icon_localisation.svg';
import sablier from './images/icon/icon_sablier.svg';
import upvoteBas from './images/icon/upvote.svg';
import upvoteHaut from './images/icon/upvote2.svg';
import { motion } from 'framer-motion/dist/framer-motion';
import Lottie from 'react-lottie';
import animationData2 from './images/animation/loading.json';
import coeur from './images/icon/icon_coeur.svg';
import coeurPlein from './images/icon/icon_coeur_rempli.svg';
import pouce from './images/illustrations/pouce.png';
import { AES, enc } from 'crypto-js';

import signaler from './images/icon/icon_signaler.svg';

const Thread = () => {

  const [state, setState] = useState(false);
  // const defaultOptions = {
  //   loop: false,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice'
  //   }
  // };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [isVoted, setIsVoted] = useState(0);
  const [isUpvoted, setIsUpvoted] = useState([])
  const [isDownvoted, setIsDownvoted] = useState([])
  const nbUpvote = useRef(null);
  let history = useHistory();
  const [modalItem, setModalItem] = useState([]);
  const [modalItemUser, setModalItemUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalUser, setOpenModalUser] = useState(false);
  // const [openModalUserPost, setOpenModalUserPost] = useState(false);
  const [isFav, setIsFav] = useState([]);
  let decrypted;
  if (localStorage.getItem('isConnected')) {
    decrypted = AES.decrypt(localStorage.getItem('id_user'), 'MYKEY4DEMO');
  } else {
    decrypted = AES.decrypt(sessionStorage.getItem('id_user'), 'MYKEY4DEMO');
  }
  const id_user = decrypted.toString(enc.Utf8);

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
  }, [isLoaded])

  // useEffect(() => {
  //   fetch('https://benef-app.fr/api-post-user2.php', {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ id_user: id_user })
  //   })
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setUserItems(result.userItems);
  //         console.log(userItems);
  //       },
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     )
  // }, []);

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
          setModalItem(prevState => ({
            ...prevState,
            user_pseudo: data.username,
            file: data.image
          }));
        })
        .catch(err => {
          console.log("Error Reading data " + err);
        });
    }
  }, [openModal])

  useEffect(() => {
    if (openModalUser) {
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
          history.push('/profil2');
          // setModalItemUser(data);
        })
        .catch(err => {
          console.log("Error Reading data " + err);
        });

    }
  }, [openModalUser])

  // useEffect(() => {
  //   if (openModalUser) {
  //     fetch('https://benef-app.fr/api-post-user3.php', {
  //       method: "POST",
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ id_user: modalItem.id_user })
  //     })
  //       .then(res => res.json())
  //       .then(
  //         (result) => {
  //           setIsLoaded(true);
  //           setUserItems(result.userItems);
  //         },
  //         (error) => {
  //           setIsLoaded(true);
  //           setError(error);
  //         }
  //       )
  //   }
  // }, [openModalUser]);

  function handleFav() {
    if (isFav.find(x => x === this) !== this) {
      setIsFav(prevState => [...prevState, this]);
      fetch('https://benef-app.fr/api-favoris.php', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_user: id_user, id_post: this })
      })
        .then((data) => {

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
        body: JSON.stringify({ id_user: id_user, id_post: this })
      })
        .then((data) => {

        })
        .catch(err => {
          console.log("Error Reading data " + err);
        });
    }

    setState(!state);
  }

  function handleUpvote() {
    setIsVoted(this.id_post)
    // setUpvoteNumber(this.upvote)
    setUpvote(true);
    setIsVoting(true);
  }

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

  function compare(a, b) {
    if (parseInt(a.upvote) < parseInt(b.upvote)) {
      return 1;
    }
    if (parseInt(a.upvote) > parseInt(b.upvote)) {
      return -1;
    }
    return 0;
  }

  // function Alert() { alert('Le message à été supprimé'); };
  // function DelayAlert() { setInterval(Alert, 2000); }

  // const btnOuvrir = () => {
  //   setOpenModal(true);
  // }

  // const btnFermer = () => {
  //   setOpenModal(false);
  // }
  const modal = useRef(null);

  function handleModal() {
    setOpenModal(true);
    setModalItem(this);
  }

  function handleModalUser() {
    setOpenModalUser(true);
    setModalItemUser(this);
  }

  // function handleModalUserPost() {
  //   setOpenModalUserPost(true);
  //   setModalItemUserPost(this);
  // }

  // const [user, setUser] = useState({
  //   username: '',
  //   bio: ''
  // });

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
    // setOpenModalSupp(false);
    fetch('https://benef-app.fr/api-report.php', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_post: reportedId })
    })
      .then((data) => {
        setConfirmedReport(true)
      })
      .catch(err => {
        console.log("Error Reading data " + err);
      });
  }


  // useEffect(() => {
  //   fetch('https://benef-app.fr/api-infos-utilisateur.php', {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ id_user: modalItem.id_user })
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUser({
  //         username: data.username,
  //         bio: data.bio
  //       })
  //     })
  //     .catch(err => {
  //       console.log("Error Reading data " + err);
  //     });
  // }, [])

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div className='h-screen w-screen flex justify-center items-center bg-red-450 xl:bg-white-0'>
      <div className='pt-36 flex justify-center items-center h-400px w-400px rounded-full bg-red-450'>
        <Lottie options={defaultOptions2}
          height={500}
          width={500} className="" />
      </div>
    </div>;
  } else {
    return (

      <div className="h-screen w-screen flex justify-center xl:justify-center overflow-x-hidden items-center bg-white-0 xl:dark:bg-gray-550">
        <div id="containerModal" className={openModalReport ? "block" : "hidden"}>
          {!confirmedReport ?
            <div id="modal" ref={modal} className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-center">

              <div className="w-full xl:w-2/6 mb-10 xl:mb-0 relative flex flex-col justify-center items-center rounded-3xl bg-white-0 overflow-auto dark:bg-gray-550 dark:text-white-0">
                <div className="mt-7 mx-3 flex flex-col">
                  <h1 className="text-lg xl:text-xl text-red-650 font-semibold text-align max-w-md mb-2 text-center">Signaler ce post</h1>
                  <h1 className="text-lg xl:text-sm font-light max-w-md mt-2 text-align">Tu peux signaler ce post s’il contient des images choquantes, des textes offensants, un contenu inapproprié ou autre.
                    Ce signalement sera anonyme.<br></br><br></br>
                    <Link to="/Cgu"><span className="font-semibold">En savoir plus </span> </Link>sur nos règles de conditions générales.<br></br><br></br>
                    Es-tu vraiment sûr de vouloir signaler ce post ?</h1>
                  <div className="flex w-full justify-evenly mt-5 mb-8">

                    <button onClick={() => setOpenModalReport(false)} name='bouton annuler' className="block px-4 hover:underline hover:underline-offset-8 text-red-450 font-semibold dark:hover:underline dark:hover:underline-offset-8 dark:hover:text-black transition duration-300 ease-in-out" type="submit">Annuler</button>
                    <button onClick={() => handleReportPost()} name='bouton signaler' className="block px-4 font-semibold py-2 bg-red-650 hover:bg-white-0 hover:text-red-650 hover:border-red-650 border-2 border-red-650 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:border-black dark:text-black rounded-full transition duration-300 ease-in-out text-white-0" type="submit">Signaler</button>


                  </div>
                </div>
              </div>
            </div>
            :
            <div id="modal" ref={modal} className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-center">

              <div className="w-full xl:w-2/6  mb-10 xl:mb-0 relative flex flex-col justify-center items-center rounded-3xl bg-white-0 overflow-auto dark:bg-gray-550 dark:text-white-0">
                <div className="mb-5 mt-5 mx-3 flex flex-col items-center text-center">
                  <img className="mb-5 w-20" src={pouce} alt='emoji pouce' />
                  <h1 className="text-lg xl:text-xl font-semibold max-w-md mt-2">Merci d'avoir signalé ce post !<br></br>
                    <span className="font-light xl:text-base">L'équipe BENEF va maintenant se charger de la suite.</span></h1>
                  <div className="flex w-full justify-evenly mt-5 mb-3">
                    <button onClick={() => resetReport()} name='bouton retour' className="block px-4 font-semibold py-2 bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:border-black dark:text-black rounded-full transition duration-300 ease-in-out text-white-0" type="submit">Retour</button>

                  </div>
                </div>
              </div>
            </div>
          }
        </div>


        {/* <motion.div className="">
          <img src={upvoteHautplein} alt="icon upvote plein"/>
        </motion.div> */}
        <ul className="h-full xl:w-2/6 bg-white-0 xl:dark:bg-gray-550 relative top-14">
          <div className="mt-7 ml-6 mr-6 pb-24 xl:pb-10 xl:dark:bg-gray-550">


            <div id="containerModal" className={openModal ? "block" : "hidden"}>
              <div id="modal" ref={modal} className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-end">

                <div className="w-full xl:w-2/6 h-90vh xl:h-90vh mb-10 xl:mb-0 xl:relative xl:bottom-3 flex flex-col justify-start items-center xl:rounded-xl bg-white-0 overflow-auto dark:bg-gray-550 dark:text-white-0">
                  <div className="mb-5 mt-3 mx-3 flex flex-col">
                    <div className="w-full h-250px">
                      <img className="object-cover rounded-lg h-full w-full" src={modalItem.image} alt="post" />
                    </div>
                    {/* <h1 className="text-lg xl:text-xl font-semibold mx-2 max-w-md">{modalItem.image}</h1> */}
                    <div className="ml-2">
                      <h1 className="text-xl font-semibold max-w-md mt-2">{modalItem.title}</h1>
                      <h1 className="text-base px-4 max-w-max py-1 text-red-450 dark:text-white-0 rounded-full border-2 border-red-450 dark:border-white-0 font-base mt-3">{modalItem.category}</h1>
                      <div className="flex w-92vw max-w-md mt-7 text-sm">
                        <img id="loca" src={localisation} className="opacity-100 h-20px" alt='icon localisation'></img><div className='ml-3'>{modalItem.address}{", "}{modalItem.postal}</div>
                      </div>
                      <div className="flex mt-2 w-92vw max-w-md text-sm">
                        <motion.img animate={{ rotate: 180 }} transition={{ repeat: Infinity, duration: 0.75, ease: "easeOut", repeatDelay: 1 }} id="sablier" src={sablier} className="opacity-100 h-20px" alt="icon sablier"></motion.img>
                        {modalItem.expiration !== '0000-00-00' ? <div className='ml-4'>{modalItem.expiration}</div> : <div className='ml-4'>À vie</div>}
                      </div>
                      <h1 className="text-base max-w-md mt-5">{modalItem.description}</h1>
                      </div>
                      <div className='flex self-end items-center text-sm max-w-md mt-7 mr-2'>
                         Posté par <span className="font-semibold cursor-pointer ml-1 mr-2" onClick={handleModalUser.bind(modalItem)}>{modalItem.user_pseudo}</span>
                          <img className="h-8 w-8 xl:border-2 xl:h-8 xl:w-8 rounded-full xl:rounded-full border-2 border-red-450 cursor-pointer" onClick={handleModalUser.bind(modalItem)} src={modalItem.file} alt="profil" />
                      
                      </div>
                    <div className="flex w-full justify-evenly mt-7 mb-10">
                      <button onClick={() => setOpenModal(false)} name='bouton fermer' className="block px-4 font-semibold py-2 bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:border-black dark:text-black rounded-full transition duration-300 ease-in-out text-white-0" type="submit">Fermer</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            

            {items.sort(compare).map(item => (
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
                      <button name='bouton favoris' className="upvote text-red-450 dark:text-black"
                        onClick={handleFav.bind(item.id_post)}>
                        {
                          isFav.find(x => x === item.id_post) === item.id_post ? <img className='h-20px fill-current cursor-pointer' src={coeurPlein} alt='icon coeur rempli' /> :
                            <img className='h-20px fill-current cursor-pointer' src={coeur} alt='icon coeur' />
                        }

                      </button>
                    </div>
                    <button name='bouton signaler' className="bg-white-0 h-10 w-10 text-black absolute z-30 flex justify-center items-center top-3 right-16 rounded-full" onClick={handleReport.bind(item.id_post)}>
                      <img src={signaler} className="h-22px" alt='icon signaler'></img>
                    </button>
                    <div className="bg-white-0 text-black absolute top-44 text-xl font-bold flex w-max py-1 rounded-lg -left-2 pl-2">
                      <button onClick={handleUpvote.bind(item)} name='bouton upvote haut' className="pl-2 relative">
                        <motion.img whileTap={{ scale: 0.85 }} id="upvote_haut" src={upvoteHaut} className="opacity-100 h-28px" alt="icon upvote haut"></motion.img>
                        {/* <img src={upvoteorange} className="absolute top-0 h-30px dark:opacity-0" alt="icon upvote"></img> */}
                      </button>

                      <span id='nb_upvote' ref={nbUpvote} className="px-2 upvote text-red-450 dark:text-black">{item.upvote}</span>
                      <button onClick={handleDownvote.bind(item)} name='bouton upvote bas' className="pr-2 relative">
                        <motion.img whileTap={{ scale: 0.85 }} id="upvote_bas" src={upvoteBas} className="opacity-100 dark:opacity-100 h-28px" alt="icon upvote bas"></motion.img>
                        {/* <img src={upvoteorange} className="transform rotate-180 absolute top-0 h-30px dark:opacity-0" alt="icon upvote bas"></img> */}
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
