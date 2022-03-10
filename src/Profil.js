import React from 'react';
import { Link } from 'react-router-dom'
import coeur from './images/icon/icon_coeur.svg';
import coeurplein from './images/icon/icon_coeur_rempli.svg';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import plus from './images/icon/icon_plus.svg';
import plusblanc from './images/icon/icon_plus_blanc.svg';
import ToggleLike from './toggle-like.js';
import lottie from 'lottie-web';
import Lottie from 'react-lottie';
import animationData from './images/animation/like.json';

const Profil = () => {

    const [state, setState] = useState(false);
    const [bio, modifbio] = useState(false);
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
        username:'', 
        bio:''
    });

    useEffect(() => {
        console.log({id_user : sessionStorage.getItem('id_user')})
        fetch('https://benef-app.fr/api-infos-utilisateur.php', {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_user : sessionStorage.getItem('id_user')})
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
        id_user: sessionStorage.getItem('id_user'),
        image: '',
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


    const handleSubmit = e => {
        e.preventDefault();
        console.log({id_user : sessionStorage.getItem('id_user')},values)
        fetch('https://benef-app.fr/api-modif-profil.php', {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              modifbio(false);
              window.location.reload();
            })
            .catch(err => {
              console.log("Error Reading data " + err);
            });
            
    };

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
            console.log("ça marche")
        }
    }, [image]);

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


    if (bio === false) {
        return (
            <div className="flex flex-col justify-start mt-20 items-center xl:mt-15 h-screen w-screen bg-white-0 xl:dark:bg-gray-550 dark:text-white-0">
                <div id="infos" className="relative grid grid-cols-2 grid-layout xl:w-2/6 w-95vw px-4 xl:-px-0">
                    <div className="flex items-center">
                        <img className="w-100px h-100px bg-transparent dark:bg-gray-650 border-3 border-red-450 dark:border-black rounded-full object-cover" />
                        <h1 className="ml-3 text-xl font-semibold">{user.username}</h1>
                    </div>
                    <p className="col-span-2 mt-2">{user.bio}</p>
                    <div className="flex items-center justify-between col-span-2 h-16 pt-4">
                        <button onClick={handleModify} className="flex items-center h-10 bg-red-450 py-2 px-4 rounded-3xl text-white-0 dark:text-black hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:bg-white-0 dark:border-white-0">Modifie ton profil</button>
                        <Link to="/favoris"><button className="flex items-center text-red-450 dark:text-white-0 hover:underline">Voir mes favoris <img className="pl-1 h-15px fill-current" src={coeur} alt="" /></button></Link>
                    </div>
                    {/* <div className="flex justify-end items-center py-5 mr-5">
                                <button onClick={handleDeconnexion} className="block px-5 py-2 text-white-0 text-lg font-semibold bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:text-black rounded-full transition duration-300 ease-in-out" type="submit">Déconnexion</button>
                            </div> */}
                </div>
                <div id="barre1" className="h-1px w-95vw xl:w-2/6 mt-4 bg-gray-200"></div>
                <div id="badges" className="w-95vw h-100px xl:w-2/6">
                    <h3 className="font-bold pt-4 pl-4">Badges</h3>
                </div>
                <div id="barre1" className="h-1px w-95vw mt-4 bg-gray-200 xl:w-2/6"></div>
                <div id="bp_perso" className="w-95vw xl:w-2/6">
                    <h3 className="font-bold pt-4 pl-4 ">Bons plans publiés</h3>
                    {/* <ToggleLike /> */}
                    {/* <button ref={container} onClick={clickHandler}></button> */}
                    <button 
                        onClick={() => {
                            setState(!state);
                        }}
                        >
                            {state ? state && <Lottie options={defaultOptions} height={18} width={18} /> : <img className='h-15px fill-current cursor-pointer' src={coeur}/>}
                    </button>
                    <div>
                        {/* {state && <Lottie options={defaultOptions} height={40} width={40} />} */}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex justify-center items-center box-border h-screen mt-4 w-full bg-white-0 dark:bg-gray-550">
                <div className="bg-white-0 dark:bg-black h-80vh overflow-y-auto rounded-lg shadow-xl w-95vw">
                    <form className="post flex flex-col justify-center" action="api-modif-profil.php" method="GET" onSubmit={handleSubmit}>
                        <div className="flex flex-col relative justify-center items-center">
                            {preview ? (

                                <img src={preview}
                                    onClick={() => {
                                        setImage(null);
                                    }}
                                    className="w-100px h-100px bg-transparent dark:bg-gray-650 cursor-pointer border-3 border-red-450 dark:border-black rounded-full object-cover " />
                            ) : (
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    fileInputRef.current.click();

                                }} className="w-100px h-100px rounded-full border-3 border-red-450 cursor-pointer bg-white-0 text-red-450 dark:text-white-0 text-xl leading-loose dark:bg-gray-650 dark:border-black">
                                    <img className="h-40px m-auto dark:hidden" src={plus} alt="" />
                                    <img className="h-40px m-auto hidden dark:block" src={plusblanc} alt="" />
                                </button>)}
                            <h3 className="font-semibold text-red-450 mt-2">Modifie ta photo de profil</h3>
                            <input id="image"
                                type="file"
                                accept="image/png, image/jpeg"
                                name="image"
                                maxLength="30"
                                ref={fileInputRef}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setImage(file);
                                        console.log("ça marche pas")
                                    } else {
                                        setImage(null);

                                    }
                                }}
                                className="hidden placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent"


                            />
                        </div>

                        <div className="flex flex-col relative justify-center items-center pt-5">
                            <label htmlFor="title" className="w-4/5 font-semibold"> Nom d'utilisateur
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

                        <div className="flex relative flex-col justify-center items-center pt-5">
                            <label htmlFor="desc" className="w-4/5 font-semibold"> Biographie
                            </label>
                            <input
                                id="bio"
                                type="textarea"
                                name="bio"
                                rows="40"
                                className=" resize-y pt-3 placeholder-gray-500 text-black dark:text-white-0 border-b-2 bg-transparent w-4/5 h-24 text-left focus:outline-none  focus:placeholder-transparent"
                                placeholder={sessionStorage.getItem("desc")}
                                value={values.bio}
                                onChange={handleChange}
                            ></input>
                            {/* <input id="desc"
                            type="text"
                            name="desc"
                            
                            placeholder="Description" className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent"
                            
                        />*/}
                        </div>

                        <div className="flex justify-center pt-5">
                            <div className="flex justify-end items-center py-5 mr-5">
                                <button onClick={handleConnexion} className="block px-7 py-2 text-red-450 text-lg font-semibold bg-white-0 border-2 border-red-450 hover:bg-red-450 hover:text-white-0 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:text-black rounded-full transition duration-300 ease-in-out">Annuler</button>
                            </div>
                            <div className="flex justify-end items-center py-5 mr-5">
                                <button className="block px-5 py-2 text-white-0 text-lg font-semibold bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:text-black rounded-full transition duration-300 ease-in-out" type="submit">Enregistrer</button>
                            </div>
                        </div>

                    </form>
                </div>


            </div>
        )
    }
}

export default Profil

