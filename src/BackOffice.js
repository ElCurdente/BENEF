import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import adresse from './images/icon/adress.svg';
import localisation from './images/icon/icon_localisation.svg';
import sablier from './images/icon/icon_sablier.svg';
import { motion } from 'framer-motion/dist/framer-motion';
import {AES, enc}from 'crypto-js';



const BackOffice = () => {

// States / Variables

const decrypted = AES.decrypt(sessionStorage.getItem('id_user'), 'MYKEY4DEMO');
const id_user = decrypted.toString(enc.Utf8);
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [items, setItems] = useState([]);
const [modalItem, setModalItem] = useState([]);
const modal2 = useRef(null);
const [openModal2, setOpenModal2] = useState(false);
const [user, setUser] = useState(0);
const [suppr, setSuppr] = useState(false)
const [deleteId, setDeleteId] = useState(0)

function handleModal() {
  //Permet de déclarer la modal et de déclencher un useEffect
    setOpenModal2(true);
    setModalItem(this);
  }

  /* Fetch permettant de récupérer les informations de l'utilisateur pour afficher sa page */

  useEffect(() => {
    if (openModal2) {
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
    }
  }, [openModal2])

 /* Fetch permettant de récupérer les post qui ont été signalés au chargement de la page */

useEffect(() => {
    fetch("https://benef-app.fr/api-reported-posts-render.php")
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

  /* Permet de récupérer l'id de l'utilisateur au chargement de la page*/

useEffect(() => {
    fetch('https://benef-app.fr/api-infos-utilisateur.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_user: id_user })
    })
        .then((response) => response.json())
        .then((data) => {
            setUser(data.id_user);
        })
        .catch(err => {
            console.log("Error Reading data " + err);
        });

}, [])

/* Fonction permettant de supprimer un post dans la base de donnée*/

function handleDelete() {
  setDeleteId(this)
  fetch('https://benef-app.fr/api-post-sup.php', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id_post: this})
    })
      .then((data) => {
        setSuppr(true);
        setOpenModal2(false);
      })
      .catch(err => {
        console.log("Error Reading data " + err);
      });
}

/* Fonction permettant de supprimer un post côté client lors de chaque suppression en base de données */

useEffect(() => {
  for (var i = 0; i < items.length; i++) {
    if (items[i].id_post === deleteId) {
      items.splice(i, 1);
      i--;
      setSuppr(false);
    }
  }
}, [suppr])


  return (
    <div className="h-screen w-screen  bg-white-0 xl:dark:bg-gray-550 flex justify-center overflow-auto items-center">

      {/* Modal pour accéder aux détails d'un post lors du clic sur celui-ci*/}

        <div id="containerModal" className={openModal2 ? "block" : "hidden"}>
          <div id="modal" ref={modal2} className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-end">

            <div className="w-full xl:w-2/6 h-90% xl:h-95% mb-10 xl:mb-0 relative flex flex-col justify-start items-center rounded-t-3xl bg-white-0 overflow-auto dark:bg-gray-550 dark:text-white-0">
              <div className="mb-5 mt-7 mx-3 flex flex-col">
                <div className="w-full h-250px relative">
                  <img className="object-cover rounded-t-lg h-full w-full" src={modalItem.image} alt=" modale" />
                </div>
                <h1 className="text-lg xl:text-xl font-semibold max-w-md mt-2">{modalItem.title}</h1>
                <h1 className="text-base xl:text-lg px-4 max-w-max py-1 text-red-450 dark:text-white-0 rounded-full border-2 border-red-450 dark:border-white-0 font-semibold mt-4">{modalItem.category}</h1>

                <div className="flex w-92vw max-w-md mt-4">
                  <motion.img animate={{ y: ["-10%", "-40%"] }} transition={{ yoyo: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="loca" src={localisation} className="opacity-100 h-20px" alt='logo localisation'></motion.img><div className='ml-6'>{modalItem.address}{", "}{modalItem.postal}</div>
                </div>

                <div className="flex mt-2 w-92vw max-w-md">
                  <motion.img animate={{ rotate: 180 }} transition={{ repeat: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="sablier" src={sablier} className="opacity-100 h-20px " alt='logo sablier'></motion.img>
                  {modalItem.expiration !== '0000-00-00' ? <div className='ml-7'>{modalItem.expiration}</div> : <div className='ml-7'>A vie</div>}

                </div>

                <h1 className="text-sm xl:text-sm max-w-md mt-4">{modalItem.description}</h1>

                <h1 className="self-end text-sm mt-4"> Posté par <span className="font-semibold">{modalItem.user_pseudo}</span></h1>

                <div className="flex w-full justify-evenly mt-7 mb-10">
                <button onClick={() => setOpenModal2(false)} name='bouton fermer' className="block px-4 hover:underline hover:underline-offset-8 text-red-450 font-semibold dark:hover:underline dark:hover:underline-offset-8 dark:hover:text-black transition duration-300 ease-in-out" type="submit">Fermer</button>
                <button onClick={handleDelete.bind(modalItem.id_post)} name='bouton supprimer' className="block px-4 font-semibold py-2 bg-red-650 hover:bg-white-0 hover:text-red-650 hover:border-red-650 border-2 border-red-650 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:border-black dark:text-black rounded-full transition duration-300 ease-in-out text-white-0" type="submit">Supprimer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    <ul className="h-full bg-white-0 xl:w-2/6 xl:dark:bg-gray-550">
    <div className="mt-5 pb-12">
    <div className="flex h-100px relative justify-center items-center w-full mb-5 pt-7">
    <h1 className="text-center text-2xl font-bold pt-7 dark:text-gray-50">Posts Signalés</h1>
    </div>

    {/* Map des posts signalés */}

    {items.map(item => (
        <motion.div className="w-92vw h-150px relative flex justify-between items-center bg-red-450 xl:w-full dark:bg-black rounded-lg text-white-0 mb-5 shadow-customm"
          whileHover={{ scale: 1.01 }}>
          <div className="h-full w-35% flex justify-center items-center relative">
            <img className="w-90% h-90%  object-cover rounded-lg" src={item.image} alt="post" />
          </div>
          <div className="w-65% justify-self-end flex relative justify-center items-center h-full"  onClick={handleModal.bind(item)}>
            <li key={item.id_post} className="mt-1 w-92vw">
              <div className="bg-white-0 text-black text-xl font-bold absolute right-3 top-3 w-max rounded-lg">
                <span className="px-2 upvote">{item.upvote}</span>
              </div>
              <h1 className="text-base font-semibold mx-2">{item.title}</h1>
              <div className="flex mt-2 text-sm">
                <img src={adresse} className="ml-2 mr-1 w-3.5" alt="logo adresse"></img> {item.address} <div className="absolute right-3 bottom-3">{item.postal}</div>
              </div>
            </li>
          </div>
        </motion.div>
      ))}
      </div>
      </ul>
      </div>
  )
}

export default BackOffice