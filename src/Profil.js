import React from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import plus from './images/icon/icon_plus.svg';
import plusblanc from './images/icon/icon_plus_blanc.svg';
import plusrouge from './images/icon/icon_plus_rouge.svg';
import lottie from 'lottie-web';
import Lottie from 'react-lottie';
import animationData from './images/animation/like.json';
import animationData2 from './images/animation/loading.json';
import { motion } from 'framer-motion/dist/framer-motion';
import adresse from './images/icon/adress.svg';
import localisation from './images/icon/icon_localisation.svg';
import sablier from './images/icon/icon_sablier.svg';
import { AES, enc } from 'crypto-js';

const Profil = () => {

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [modalItem, setModalItem] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [bio, modifbio] = useState(false);
    const [successPdp, setSuccessPdp] = useState(false);
    let decrypted;
    if(localStorage.getItem('isConnected')){
      decrypted = AES.decrypt(localStorage.getItem('id_user'), 'MYKEY4DEMO');
    }else{
      decrypted = AES.decrypt(sessionStorage.getItem('id_user'), 'MYKEY4DEMO');
    }
        const id_user = decrypted.toString(enc.Utf8);


    useEffect(() => {
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

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

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
            })
            .catch(err => {
                console.log("Error Reading data " + err);
            });
    }, [successPdp])

    const [etat, setEtat] = useState({
        isStopped: true,
        isPaused: false,
        speed: 1,
        direction: 1,
        isLiked: false,
    });

    const clickHandler = () => {
        if (!etat.isStopped) {
            setEtat({
                ...etat,
                direction: etat.direction * -1
            });
        }
        setEtat({
            ...etat,
            isStopped: false,
            isLike: !etat.isLike
        });
    }

    const [values, setValues] = useState({
        id_user: id_user,
        image: undefined,
        username: '',
        bio: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };


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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('id_user', id_user);
        formData.append("file", picture.pictureAsFile);
        formData.append('username', values.username);
        formData.append('bio', values.bio);

        for (var key of formData.entries()) {
            // console.log(key[0] + ", " + key[1]);
        }

        const data = await fetch("https://benef-app.fr/api-modif-profil.php", {
            method: "post",
            // headers: { "Content-Type": "multipart/form-data" },
            body: formData,
        });
        const uploadedImage = await data.json();
        if (uploadedImage) {
            console.log("Successfully uploaded image");
            modifbio(false);
            setSuccessPdp(true);
        } else {
            console.log("Error Found");
        }
        modifbio(false);
    };

    const [openModalSupp, setOpenModalSupp] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [suppr, setSuppr] = useState(false);


    const handleDeletePost = () => {
        setOpenModalSupp(false);
        fetch('https://benef-app.fr/api-post-sup.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_post: deleteId })
        })
            .then((data) => {
                setSuppr(true)
            })
            .catch(err => {
                console.log("Error Reading data " + err);
            });
    }

    function handlePostSupp() {
        setOpenModalSupp(true);
        setDeleteId(this);
    }

    useEffect(() => {
        for (var i = 0; i < items.length; i++) {
            if (items[i].id_post === deleteId) {
                items.splice(i, 1);
                i--;
                setSuppr(false);
            }
        }
    }, [suppr])

    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const fileInputRef = useRef();

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);

        } else {
            setPreview(null);
        }
    }, [image]);

    const [picture, setPicture] = useState({});

    const uploadPicture = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        } else {
            setImage(null);
        }

        setPicture({
            /* contains the preview, if you want to show the picture to the user
                 you can access it with this.state.currentPicture
             */
            picturePreview: URL.createObjectURL(e.target.files[0]),
            /* this contains the file we want to send */
            pictureAsFile: e.target.files[0],
        });
    };

    const handleConnexion = e => {
        e.preventDefault();
        modifbio(false);
    };

    const handleModify = e => {
        e.preventDefault();
        modifbio(true);
    };

    function handleDeconnexion() {
        sessionStorage.clear();
        window.location.reload();
    }

    const modal = useRef(null);

    function handleModal() {
        setOpenModal(true);
        setModalItem(this);
    }

    const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: animationData2,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    if (error) {
        return <div>Erreur : {error.message}</div>;
      } else if (!isLoaded) {
        return <div className='h-screen w-screen flex justify-center items-center bg-red-450 xl:bg-white-0'>
        <div className='pt-36 flex justify-center items-center h-400px w-400px rounded-full bg-red-450'>
          <Lottie options={defaultOptions2}
            height={500}
            width={500} className=""/>
        </div>  
      </div>;
      } else if (bio === false) {
        return (
            <div className="overflow-auto flex flex-col justify-start pt-7 items-center h-screen w-screen bg-white-0 xl:dark:bg-gray-550 dark:text-white-0">

                <div id="containerModal" className={openModal ? "block" : "hidden"}>
                    <div id="modal" ref={modal} className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-end mt-5">

                        <div className="w-full xl:w-2/6 h-90% xl:h-90% mb-10 xl:mb-0 relative flex flex-col justify-start items-center rounded-t-3xl bg-white-0 overflow-auto dark:bg-gray-550 dark:text-white-0">
                            <div className="mb-5 mx-3 flex mt-5 flex-col">
                                <div className="w-full h-250px relative">
                                    <img className="object-cover rounded-t-lg h-full w-full" src={modalItem.image} alt="image post" />
                                </div>
                                {/* <h1 className="text-lg xl:text-xl font-semibold mx-2 max-w-md">{modalItem.image}</h1> */}
                                <h1 className="text-lg xl:text-xl font-semibold max-w-md mt-2">{modalItem.title}</h1>
                                <h1 className="text-base xl:text-lg px-4 max-w-max py-1 text-red-450 dark:text-white-0 rounded-full border-2 border-red-450 dark:border-white-0 font-semibold mt-4">{modalItem.category}</h1>

                                <div className="flex w-92vw max-w-md mt-4">
                                    <motion.img animate={{ y: ["-10%", "-40%"] }} transition={{ yoyo: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="loca" src={localisation} className="opacity-100 h-20px" alt="icon localisation"></motion.img><div className='ml-6'>{modalItem.address}{", "}{modalItem.postal}</div>
                                </div>

                                <div className="flex mt-2 w-92vw max-w-md">
                                    <motion.img animate={{ rotate: 180 }} transition={{ repeat: Infinity, duration: 0.4, ease: "easeOut", repeatDelay: 1 }} id="sablier" src={sablier} className="opacity-100 h-20px " alt="icon sablier"></motion.img>
                                    {modalItem.expiration != '0000-00-00' ? <div className='ml-7'>{modalItem.expiration}</div> : <div className='ml-7'>À vie</div>}

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


                <div id="containerModal" className={openModalSupp ? "block" : "hidden"}>
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
                </div>

                <div id="infos" className="relative xl:w-2/6 w-95vw px-4 xl:-px-0 relative top-10">
                    <div className="flex items-center">
                        <img src={user.image} className="w-100px h-100px bg-transparent dark:bg-gray-650 border-3 border-red-450 dark:border-black rounded-full object-cover" alt='image de profil'/>
                        <h1 className="ml-3 text-xl font-semibold">{user.username}</h1>
                    </div>
                    <p className="col-span-2 mt-4">{user.bio}</p>
                    <div className="flex items-center justify-between col-span-2 h-16 pt-8">
                        <button name='bouton modifie ton profil' onClick={handleModify} className="flex items-center h-10 bg-red-450 py-2 px-4 rounded-3xl text-white-0 dark:text-black hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:bg-white-0 dark:border-white-0 transition duration-300 ease-in-out">Modifie ton profil</button>
                        {user.id == 38 &&
                            <Link to="/backoffice"><button name='bouton backoffice' className="flex items-center text-red-450 dark:text-white-0 hover:underline">Accéder aux signalements</button></Link>
                        }



                    </div>

                </div>
                <div id="barre1" className="h-1px w-95vw xl:w-2/6 mt-7 bg-gray-200"></div>
                <div id="badges" className="w-95vw h-100px xl:w-2/6">
                    <h3 className="font-bold pt-4 pl-4 relative top-10">Badges</h3>
                </div>
                <div id="barre1" className="h-1px w-95vw mt-10 bg-gray-200 xl:w-2/6"></div>
                <div id="bp_perso" className="w-95vw xl:w-2/6">
                    <h3 className="font-bold pt-4 pl-4 relative top-10">Bons plans publiés</h3>
                    <div className='w-full h-full flex flex-col items-center mt-5 relative top-10'>
                        {items.map(item => (
                            <motion.div className="w-92vw xl:w-full relative bg-red-450 dark:bg-black rounded-lg text-white-0 mb-4 xl:mb-5 shadow-customm"
                                whileHover={{ scale: 1.01 }}>
                                <button name='bouton supprimer' className="bg-white-0 h-10 w-10 text-black absolute z-30 flex justify-center items-center top-3 right-2 rounded-full" onClick={handlePostSupp.bind(item.id_post)}>
                                    <img src={plusrouge} className="transform rotate-45 h-6 w-6 hover:animate-pulse" alt='icon sup'></img>
                                </button>
                                <div className="w-full h-250px relative" onClick={handleModal.bind(item)}>
                                    <img className="object-cover rounded-t-lg h-full w-full" src={item.image} alt="image post" />
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
    } else {
        return (
            <div className="flex justify-center items-center box-border h-screen mt-4 w-full bg-white-0 dark:bg-gray-550">
                <div className="bg-white-0 dark:bg-black h-80vh overflow-y-auto rounded-lg shadow-xl w-95vw">
                    <form className="post flex flex-col justify-center" action="api-modif-profil.php" method="POST" onSubmit={(e) => handleSubmit(e)}>
                        <div className="flex flex-col relative justify-center items-center">
                            {preview ? (

                                <img src={preview}
                                    onClick={() => {
                                        setImage(null);
                                    }}
                                    className="w-100px h-100px bg-transparent dark:bg-gray-650 cursor-pointer border-3 border-red-450 dark:border-black rounded-full object-cover " alt='image previsualisation'/>
                            ) : (
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    fileInputRef.current.click();

                                }} name='bouton modifier la photo de profil' className="w-100px h-100px rounded-full border-3 border-red-450 cursor-pointer bg-white-0 text-red-450 dark:text-white-0 text-xl leading-loose dark:bg-gray-650 dark:border-black">
                                    <img className="h-40px m-auto dark:hidden" src={plus} alt="icon plus" />
                                    <img className="h-40px m-auto hidden dark:block" src={plusblanc} alt="icon plus" />
                                </button>)}
                            <h3 className="font-semibold text-red-450 mt-2">Modifie ta photo de profil</h3>
                            <input id="image"
                                type="file"
                                accept="image/png, image/jpeg"
                                name="image"
                                maxLength="30"
                                ref={fileInputRef}
                                value={values.image}
                                onChange={uploadPicture}
                                className="hidden placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent"


                            />
                        </div>

                        <div className="flex flex-col relative justify-center items-center pt-5">
                            <label htmlFor="title" className="w-4/5 font-semibold">Nom d'utilisateur
                            </label>
                            <input id="username"
                                type="text"
                                name="username"
                                maxLength="30"
                                placeholder={user.username} className="placeholder-gray-500 text-black dark:text-white-0 border-b-2 bg-transparent w-4/5 h-12  text-left focus:outline-none  focus:placeholder-transparent"
                                value={values.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex relative flex-col justify-center items-center pt-7">
                            <label htmlFor="desc" className="w-4/5 font-semibold">Biographie
                            </label>
                            <input
                                id="bio"
                                type="textarea"
                                name="bio"
                                rows="40"
                                className="resize-y relative bottom-6 placeholder-gray-500 text-black dark:text-white-0 border-b-2 bg-transparent w-4/5 h-24 text-left focus:outline-none  focus:placeholder-transparent"
                                placeholder={user.bio}
                                value={values.bio}
                                onChange={handleChange}
                            ></input>
                        </div>

                        <div className="flex justify-center pt-5">
                            <div className="flex justify-end items-center py-5 mr-20">
                                <button onClick={handleConnexion} name='bouton annuler' className="text-lg block px-4 hover:underline hover:underline-offset-8 text-red-450 font-semibold dark:hover:underline dark:hover:underline-offset-8 dark:hover:text-black transition duration-300 ease-in-out">Annuler</button>
                            </div>
                            <div className="flex justify-end items-center py-5">
                                <button name='bouton enregistrer' className="block px-5 py-2 text-white-0 text-lg font-semibold bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:text-black rounded-full transition duration-300 ease-in-out" type="submit">Enregistrer</button>
                            </div>
                        </div>

                    </form>
                </div>


            </div>
        )
    }
}

export default Profil

