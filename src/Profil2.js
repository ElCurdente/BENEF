import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import lottie from 'lottie-web';
import Lottie from 'react-lottie';
import animationData2 from './images/animation/loading.json';
import animationData3 from './images/animation/loader_light.json';
import animationData4 from './images/animation/loader_dark.json';
import { motion } from 'framer-motion/dist/framer-motion';
import adresse from './images/icon/adress.svg';
import localisation from './images/icon/icon_localisation.svg';
import pleure from './images/illustrations/pleure.png';
import sablier from './images/icon/icon_sablier.svg';
import sablierB from './images/icon/icon_sablier_b.svg';
import { AES, enc } from 'crypto-js';

const Profil2 = () => {

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [modalItem, setModalItem] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [successPdp, setSuccessPdp] = useState(false);
    let decrypted;


    let id_user;



    useEffect(() => {
        decrypted = AES.decrypt(localStorage.getItem('id_user_post'), 'MYKEY4DEMO');
        id_user = decrypted.toString(enc.Utf8);
        fetch('https://benef-app.fr/api-post-user2.php', {
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
                    localStorage.removeItem('id_user_post');
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    function handleModal() {
        setOpenModal(true);
        setModalItem(this);
    }

    // const defaultOptions = {
    //     loop: false,
    //     autoplay: true,
    //     animationData: animationData,
    //     rendererSettings: {
    //         preserveAspectRatio: 'xMidYMid slice'
    //     }
    // };

    const container = useRef(null)

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('./like.json')
        })
    }, []);

    const [user, setUser] = useState({
        id: '',
        username: '',
        bio: '',
        image: undefined
    });

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
                setUser({
                    id: data.id_user,
                    username: data.username,
                    bio: data.bio,
                    image: data.image
                })
                // localStorage.removeItem('id_user_post');
            })
            .catch(err => {
                console.log("Error Reading data " + err);
            });
    }, [successPdp])


    // const [etat, setEtat] = useState({
    //     isStopped: true,
    //     isPaused: false,
    //     speed: 1,
    //     direction: 1,
    //     isLiked: false,
    // });

    // const clickHandler = () => {
    //     if (!etat.isStopped) {
    //         setEtat({
    //             ...etat,
    //             direction: etat.direction * -1
    //         });
    //     }
    //     setEtat({
    //         ...etat,
    //         isStopped: false,
    //         isLike: !etat.isLike
    //     });
    // }

    // const [values, setValues] = useState({
    //     id_user: id_user,
    //     image: undefined,
    //     username: '',
    //     bio: '',
    // });

    // const handleChange = e => {
    //     const { name, value } = e.target;
    //     setValues({
    //         ...values,
    //         [name]: value
    //     });
    // };


    // const handleSubmit = e => {
    //     e.preventDefault();
    //     console.log({ id_user: id_user }, values)
    //     fetch('https://benef-app.fr/api-modif-profil.php', {
    //         method: "POST",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(values)
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data)
    //             modifbio(false);
    //             window.location.reload();
    //         })
    //         .catch(err => {
    //             console.log("Error Reading data " + err);
    //         });

    //     modifbio(false);

    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     formData.append('id_user', id_user);
    //     formData.append("file", picture.pictureAsFile);
    //     formData.append('username', values.username);
    //     formData.append('bio', values.bio);

    //     for (var key of formData.entries()) {
    //         // console.log(key[0] + ", " + key[1]);
    //     }

    //     const data = await fetch("https://benef-app.fr/api-modif-profil.php", {
    //         method: "post",
    //         // headers: { "Content-Type": "multipart/form-data" },
    //         body: formData,
    //     });
    //     const uploadedImage = await data.json();
    //     if (uploadedImage) {
    //         console.log("Successfully uploaded image");
    //         modifbio(false);
    //         setSuccessPdp(true);
    //     } else {
    //         console.log("Error Found");
    //     }
    //     modifbio(false);
    // };

    // const [openModalSupp, setOpenModalSupp] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [suppr, setSuppr] = useState(false);


    // const handleDeletePost = () => {
    //     setOpenModalSupp(false);
    //     fetch('https://benef-app.fr/api-post-sup.php', {
    //         method: "POST",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ id_post: deleteId })
    //     })
    //         .then((data) => {
    //             setSuppr(true)
    //         })
    //         .catch(err => {
    //             console.log("Error Reading data " + err);
    //         });
    // }

    // function handlePostSupp() {
    //     setOpenModalSupp(true);
    //     setDeleteId(this);
    // }

    useEffect(() => {
        for (var i = 0; i < items.length; i++) {
            if (items[i].id_post === deleteId) {
                items.splice(i, 1);
                i--;
                setSuppr(false);
            }
        }
    }, [suppr])

    // const [image, setImage] = useState();
    // const [preview, setPreview] = useState();

    // useEffect(() => {
    //     if (image) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setPreview(reader.result);
    //         };
    //         reader.readAsDataURL(image);

    //     } else {
    //         setPreview(null);
    //     }
    // }, [image]);

    // const [picture, setPicture] = useState({});

    // const uploadPicture = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setImage(file);
    //     } else {
    //         setImage(null);
    //     }

    //     setPicture({
    //         /* contains the preview, if you want to show the picture to the user
    //              you can access it with this.state.currentPicture
    //          */
    //         picturePreview: URL.createObjectURL(e.target.files[0]),
    //         /* this contains the file we want to send */
    //         pictureAsFile: e.target.files[0],
    //     });
    // };

    // const handleConnexion = e => {
    //     e.preventDefault();
    //     modifbio(false);
    // };

    // const handleModify = e => {
    //     e.preventDefault();
    //     modifbio(true);
    // };

    // function handleDeconnexion() {
    //     sessionStorage.clear();
    //     window.location.reload();
    // }

    const modal = useRef(null);

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

    if (error) {
        return <div className="mb-5 mt-5 mx-3 flex flex-col items-center text-center">
            <img className="mt-5 mb-5 w-20" src={pleure} alt='emoji pleure' />
            <h1 className="text-lg xl:text-xl font-semibold max-w-md mt-2">
                Mince, il y a un petit problème<br></br>
                <div className="font-light xl:text-base flex flex-wrap justify-center mt-2"><span>Nous te conseillons de rafraîchir la page !</span></div>
            </h1>
        </div>;
    } else if (!isLoaded) {
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
            <div className="overflow-auto flex flex-col justify-start pt-16 items-center h-screen w-screen bg-white-0 dark:bg-gray-550 dark:text-white-0">

                <div id="containerModal" className={openModal ? "block" : "hidden"}>
                    <div id="modal" ref={modal} className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-end mt-5">

                        <div className="w-full xl:w-2/6 h-90% xl:h-90% mb-10 xl:mb-0 relative flex flex-col justify-start items-center rounded-t-3xl bg-white-0 overflow-auto dark:bg-gray-550 dark:text-white-0">
                            <div className="mb-5 mx-3 flex flex-col">
                                <div className="w-full h-250px pt-5 relative">
                                    <img className="object-cover rounded-t-lg h-full w-full" src={modalItem.image} alt="post" />
                                </div>
                                {/* <h1 className="text-lg xl:text-xl font-semibold mx-2 max-w-md">{modalItem.image}</h1> */}
                                <h1 className="text-lg xl:text-xl font-semibold max-w-md mt-2">{modalItem.title}</h1>
                                <h1 className="text-base xl:text-lg px-4 max-w-max py-1 text-red-450 dark:text-white-0 rounded-full border-2 border-red-450 dark:border-white-0 font-semibold mt-4">{modalItem.category}</h1>

                                <div className="flex w-92vw max-w-md mt-4">
                                    <motion.img animate={{ y: ["-10%", "-40%"] }} transition={{ yoyo: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="loca" src={localisation} className="opacity-100 h-20px dark:hidden" alt="icon localisation"></motion.img>
                                    <motion.img animate={{ y: ["-10%", "-40%"] }} transition={{ yoyo: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="loca" src={adresse} className="opacity-100 h-20px hidden dark:block" alt="icon localisation"></motion.img>
                                    <div className='ml-6'>{modalItem.address}{", "}{modalItem.postal}</div>
                                </div>

                                <div className="flex mt-2 w-92vw max-w-md">
                                    <motion.img animate={{ rotate: 180 }} transition={{ repeat: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="sablier" src={sablier} className="opacity-100 h-20px dark:hidden" alt="icon sablier"></motion.img>
                                    <motion.img animate={{ rotate: 180 }} transition={{ repeat: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="sablier" src={sablierB} className="opacity-100 h-20px hidden dark:block" alt="icon sablier"></motion.img>
                                    {modalItem.expiration !== '0000-00-00' ? <div className='ml-7'>{modalItem.expiration}</div> : <div className='ml-7'>À vie</div>}

                                </div>

                                <h1 className="text-sm xl:text-sm max-w-md mt-4">{modalItem.description}</h1>

                                {/* <h1 className="self-end text-sm mt-4"> Posté par <span className="font-semibold">{modalItem.user_pseudo}</span></h1> */}

                                <div className="flex w-full justify-evenly mt-5 mb-10">
                                    <button onClick={() => setOpenModal(false)} name='bouton fermer' className="block px-4 font-semibold py-2 bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:border-black dark:text-black rounded-full transition duration-300 ease-in-out text-white-0" type="submit">Fermer</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <div id="containerModal" className={openModalSupp ? "block" : "hidden"}>
                    <div id="modal" ref={modal} className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-center">

                        <div className="w-full xl:w-2/6 mb-10 xl:mb-0 relative flex flex-col justify-center items-center rounded-3xl bg-white-0 overflow-auto dark:bg-gray-550 dark:text-white-0 right-1">
                            <div className=" mt-7 mx-3 flex flex-col">
                                <h1 className="text-lg xl:text-xl text-red-650 font-semibold max-w-md mb-2 text-center">Supprimer ce post</h1>
                                <h1 className="text-lg xl:text-sm font-light max-w-md mt-2">Es-tu vraiment sûr de vouloir supprimer ce post ?</h1>
                                <div className="flex w-full justify-evenly mt-7 mb-8">
                                    <button onClick={() => setOpenModalSupp(false)} name='bouton annuler' className="block px-4 hover:underline hover:underline-offset-8 text-red-450 font-semibold dark:hover:underline dark:hover:underline-offset-8 dark:hover:text-black transition duration-300 ease-in-out" type="submit">Annuler</button>
                                    <button onClick={() => handleDeletePost()} name='bouton supprimer' className="block px-4 font-semibold py-2 bg-red-650 hover:bg-white-0 hover:text-red-650 hover:border-red-650 border-2 border-red-650 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:border-black dark:text-black rounded-full transition duration-300 ease-in-out text-white-0" type="submit">Supprimer</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div id="infos" className="relative xl:w-2/6 w-95vw px-4 xl:-px-0">
                    <div className="flex items-center">
                        <img src={user.image} className="w-100px h-100px bg-transparent dark:bg-gray-650 border-3 border-red-450 dark:border-black rounded-full object-cover" alt='profil' />
                        <h1 className="ml-3 text-xl font-semibold text-black dark:text-white-0">{user.username}</h1>
                    </div>
                    <p className="col-span-2 mt-4 text-black dark:text-white-0">{user.bio}</p>
                    {/* <div className="flex items-center justify-between col-span-2 h-16 pt-8">
                        <button onClick={handleModify} name='bouton modifie ton profil' className="flex items-center h-10 bg-red-450 py-2 px-4 rounded-3xl text-white-0 dark:text-black hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:bg-white-0 dark:border-white-0 transition duration-300 ease-in-out">Modifie ton profil</button>
                        {user.id == 38 &&
                            <Link to="/backoffice"><button name='bouton backOffice' className="flex items-center text-red-450 dark:text-white-0 hover:underline">Accéder aux signalements</button></Link>
                        }



                    </div> */}

                </div>

                <div id="bp_perso" className="w-95vw xl:w-2/6">
                    <div id="barre1" className="h-1px w-95vw xl:w-full mt-8 bg-gray-200"></div>
                    <h3 className="font-bold pt-4 pl-4 relative">Bons plans publiés</h3>
                    <div className='w-full h-full flex flex-col items-center mt-5 pb-14'>
                        {items.map(item => (
                            <motion.div key={item.id_post} className="w-92vw xl:w-full relative bg-red-450 dark:bg-black rounded-lg text-white-0 mb-4 xl:mb-5 shadow-customm"
                                whileHover={{ scale: 1.01 }}>
                                {/* <button name='bouton supprimer' className="bg-white-0 h-10 w-10 text-black absolute z-30 flex justify-center items-center top-3 right-2 rounded-full" onClick={handlePostSupp.bind(item.id_post)}>
                                    <img src={plusrouge} className="transform rotate-45 h-6 w-6 hover:animate-pulse" alt="icon sup"></img>
                                </button> */}
                                <div className="w-full h-250px relative" onClick={handleModal.bind(item)}>
                                    <img className="object-cover rounded-t-lg h-full w-full" src={item.image} alt="post" />
                                </div>
                                <div className="bg-white-0 text-black text-xl font-bold absolute right-3 bottom-24 w-max rounded-lg">
                                    <span className="px-2 upvote">{item.upvote}</span>
                                </div>
                                <div className="w-full min-h-max pb-4 md:cursor-pointer" onClick={handleModal.bind(item)} >
                                    <h1 className="text-lg font-semibold mx-2 max-w-md mt-2	">{item.title}</h1>
                                    <div className="flex mt-2 text-sm w-92vw max-w-md">
                                        <img src={adresse} className="ml-2 mr-1 w-3.5" alt='icon adresse'></img> {item.address} <div className="absolute right-3">{item.postal}</div>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profil2

