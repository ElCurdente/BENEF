import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import Accueil from './Accueil';
import plus from './images/icon/icon_plus.svg';
import plusblanc from './images/icon/icon_plus_blanc.svg';
import illus_images from './images/icon/icon_images.svg';
import fleche from './images/icon/icon_fleche.svg';
import content from './images/illustrations/content.png';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom';
import validate from './validateInfo'
import {AES, enc} from 'crypto-js';


const Post = () => {
    const modal = useRef(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    let decrypted;
    if(localStorage.getItem('isConnected')){
      decrypted = AES.decrypt(localStorage.getItem('id_user'), 'MYKEY4DEMO');
    }else{
      decrypted = AES.decrypt(sessionStorage.getItem('id_user'), 'MYKEY4DEMO');
    }
    const id_user = decrypted.toString(enc.Utf8);

    const [values, setValues] = useState({
        image: undefined,
        title: '',
        desc: '',
        address: '',
        postal: '',
        expiration: '',
        category: '',
        place: '',
        certified: 'false',
        cgu: 'false',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        console.log(value);
    };

    const img_form = document.getElementById('image');
    let history = useHistory();


    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            console.log("ça marche pas")
        } else {
            setImage(null);
        }

        console.log(file)
    }

    const myForm = useRef(null);

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

    const [picture, setPicture] = useState({});

    const uploadPicture = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            console.log("ça marche pas")
        } else {
            setImage(null);
        }

        console.log(file)
        setPicture({
            /* contains the preview, if you want to show the picture to the user
                 you can access it with this.state.currentPicture
             */
            picturePreview: URL.createObjectURL(e.target.files[0]),
            /* this contains the file we want to send */
            pictureAsFile: e.target.files[0],
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", picture.pictureAsFile);
        formData.append('title', values.title);
        formData.append('desc', values.desc);
        formData.append('address', values.address);
        formData.append('postal', values.postal);
        formData.append('expiration', values.expiration);
        formData.append('category', values.category);
        formData.append('place', values.place);
        formData.append('certified', values.certified);
        formData.append('cgu',  values.cgu);
        formData.append('id_user', id_user);

        console.log(picture.pictureAsFile);

        for (var key of formData.entries()) {
            console.log(key[0] + ", " + key[1]);
        }
        console.log(formData)
        setOpenModal(true);
        const data = await fetch("https://benef-app.fr/api-post.php", {
            method: "post",
            // headers: { "Content-Type": "multipart/form-data" },
            body: formData,
        });
        const uploadedImage = await data.json();
        if (uploadedImage) {
            console.log("Successfully uploaded image");
            console.log(data);
        } else {
            console.log("Error Found");
        }

    };


    return (
        <div className="flex justify-center items-center h-screen mt-3 w-full bg-white-0 dark:bg-gray-550 ">
            <div id="containerModal" className={openModal ? "block" : "hidden"}>
                    <div id="modal" ref={modal} className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center z-40 items-center">

                        <div className="w-full xl:w-2/6 xl:mb-0 relative flex flex-col justify-start items-center rounded-3xl bg-white-0 overflow-auto dark:bg-gray-550 dark:text-white-0">
                            <div className="mt-7 mx-3 flex flex-col items-center text-center">
                                {/* <h1 className="text-lg xl:text-xl font-semibold mx-2 max-w-md">{modalItem.image}</h1> */}
                                <img className="mb-5 w-20" src={content} alt=''/> 
                                <h1 className="text-lg xl:text-xl font-semibold max-w-md mt-2">
                                    Ton bon plan a bien été publié !
                                </h1>
                                <h1 className="text-lg xl:text-sm font-light max-w-md mt-2">L'équipe BENEF te remercie de faire vivre l'application !</h1>
                                <div className="flex w-full justify-evenly mt-7 mb-8">
                                <Link to="/" onClick={() => {}}>
                                    <button onClick={() => setOpenModal(false)} className="block px-4 font-semibold py-2 bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:border-black dark:text-black rounded-full transition duration-300 ease-in-out text-white-0" type="submit">Fermer</button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="bg-red-450 xl:bg-white-0 dark:bg-black xl:w-2/6 h-90vh mt-5 overflow-y-auto rounded-lg xl:shadow-merwan w-95vw">
                <form className="post flex flex-col justify-center" onSubmit={(e) => handleSubmit(e)} id="post_form" ref={myForm}>
                    <div className="flex relative justify-center items-center">
                        {preview ? (

                            <img src={preview}
                                onClick={() => {
                                    setImage(null);
                                }}
                                className="w-100vw h-30vh bg-white-0 dark:bg-gray-650 xl:border-none cursor-pointer border-2 border-red-450 dark:border-black rounded-t-md object-contain " />
                        ) : (
                            <button onClick={(e) => {
                                e.preventDefault();
                                fileInputRef.current.click();

                            }} className="w-100vw h-30vh rounded-t-md border-2 border-red-450  xl:border-dashed cursor-pointer bg-white-0 text-red-450 dark:text-white-0 text-xl leading-loose dark:bg-gray-650 dark:border-black">
                                <img className="h-50px m-auto dark:hidden" src={illus_images} alt="" />
                                <img className="h-40px m-auto hidden dark:block" src={plusblanc} alt="" /> <span className='xl:hidden'>Ajouter une photo</span> <span className='hidden xl:block'>Séléctionner sur l'ordinateur</span>
                            </button>)}

                        <input id="image"
                            type="file"
                            accept="image/png, image/jpeg"
                            name="image"
                            maxLength="30"
                            ref={fileInputRef}
                            value={values.image}
                            onChange={uploadPicture}
                            className="hidden placeholder-white-150 text-white-150 border-b-2  bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent"


                        />
                    </div>

                    <div className="flex h-100px relative justify-center items-center w-4/5">
                        <div className="w-full h-80px flex justify-center items-center">
                            <select name="category" id="category" onChange={handleChange} className="block appearance-none bg-red-450 xl:bg-white-0 text-white-0 border-gray-400 hover:border-gray-500 px-4 py-2 pr-12 ml-12 shadow leading-tight focus:outline-none focus:shadow-outline xl:text-gray-650">
                                <option value="select">--Choisissez une catégorie--</option>
                                <option value="Restos" className="bg-white-0 text-red-450">Restos</option>
                                <option value="Expos" className="bg-white-0 text-red-450">Expos</option>
                                <option value="Bars" className="bg-white-0 text-red-450">Bars</option>
                                <option value="Soirées" className="bg-white-0 text-red-450">Soirées</option>
                                <option value="Étudiants" className="bg-white-0 text-red-450">Étudiants</option>
                                <option value="Autres" className="bg-white-0 text-red-450">Autres</option>
                            </select>
                        </div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-white h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>

                    <div className="flex  relative justify-center items-center">
                        <label htmlFor="title" className="">
                        </label>
                        <input id="title"
                            type="text"
                            name="title"
                            maxLength="60"
                            placeholder="Votre titre" className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent  xl:placeholder-gray-650 xl:text-black xl:border-red-450"
                            value={values.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex  relative justify-center items-center">
                        <label htmlFor="desc" className="w-full flex justify-center">
                            <textarea
                                id="desc"
                                type="text"
                                name="desc"
                                rows="40"
                                className=" resize-y placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-24 pt-5 text-left focus:outline-none  focus:placeholder-transparent  xl:text-black xl:placeholder-gray-650 xl:border-red-450"
                                placeholder="Description"
                                value={values.desc}
                                onChange={handleChange}
                            ></textarea>
                        </label>
                    </div>

                    <div className="flex  relative justify-center items-center">
                        <label htmlFor="address" className="">
                        </label>
                        <input id="address"
                            type="text"
                            name="address"

                            placeholder="Adresse" className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent  xl:placeholder-gray-650 xl:text-black xl:border-red-450"
                            value={values.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex  relative justify-center items-center">
                        <label htmlFor="postal" className="">
                        </label>
                        <input id="postal"
                            type="number"
                            name="postal"
                            maxLength="5"
                            placeholder="Code Postal" className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent  xl:placeholder-gray-650 xl:text-black xl:border-red-450"
                            value={values.postal}
                            onChange={handleChange}
                        />
                        {errors.postal && <p className="absolute -bottom-4 left-10 text-red-900 dark:text-red-650">{errors.postal}</p>}
                    </div>

                    <div className="flex  relative justify-center items-center">
                        <label htmlFor="postal" className="">
                        </label>
                        <input id="place"
                            type="text"
                            name="place"
                            placeholder="Lieu" className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent  xl:placeholder-gray-650 xl:text-black xl:border-red-450"
                            value={values.place}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex  relative justify-center items-center">
                        <label htmlFor="expiration" className="">
                        </label>
                        <input id="expiration"
                            type="date"
                            name="expiration"
                            maxLength="30"
                            placeholder="Date d'expiration" className="appearance-none placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent  xl:placeholder-gray-650 xl:text-black xl:border-red-450"
                            value={values.expiration}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex relative items-center mt-6 xl:justify-center">
                        <input id="certified"
                            type="checkbox"
                            name="certified"
                            maxLength="30"
                            className="form-checkbox rounded-sm bg-transparent border-white-0 border-2 text-transparent focus:ring-transparent checked:border-white-0 xl:border-red-450 xl:checked:border-red-450 xl:text-red-450"
                            value={values.certified}
                            onChange={handleChange}
                        />
                        <label htmlFor="certified" className="text-white-150 pl-2 xl:text-red-450">Je certifie que ce bon plan existe
                        </label>

                    </div>

                    <div className="flex relative items-center xl:justify-center">
                        <input id="cgu"
                            type="checkbox"
                            name="cgu"
                            maxLength="30"
                            className="form-checkbox rounded-sm bg-transparent border-white-0 border-2 text-transparent focus:ring-transparent xl:focus:ring-black checked:border-white-0 xl:border-red-450 xl:checked:border-red-450 xl:text-red-450"
                            value={values.cgu}
                            onChange={handleChange}
                        />
                        <label htmlFor="cgu" className="text-white-150 pl-2 xl:text-red-450">Je certifie avoir pris connaissance des CGU
                        </label>

                    </div>
                    <div className="flex justify-end xl:justify-center items-center py-5 mr-5">
                        <button className="block w-24 h-9 bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:border-black dark:text-black rounded-full transition duration-300 ease-in-out text-white-0" type="submit">Publier</button>
                    </div>

                </form>
            </div>


        </div>


        
        
        
    )

}

export default Post
