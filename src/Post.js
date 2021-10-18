import React from 'react'
import { useState, useEffect } from 'react';


const Post = () => {
    const [values, setValues] = useState({
        image:'',
        title:'',
        desc:'',
        adress:'',
        postal:'',
        expiration:'',
        certified:'false',
        cgu:'false',
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
      };

    return (
        <div>
             <form className="post" onSubmit={handleSubmit}>

             <div className="flex  relative justify-center items-center">
                        <label htmlFor="image" className="">
                        </label>
                        <input id="image"
                            type="file"
                            accept="image/png, image/jpeg"
                            name="image"
                            maxLength="30"
                            placeholder="Votre titre" className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent"
                            value={values.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex  relative justify-center items-center">
                        <label htmlFor="title" className="">
                        </label>
                        <input id="title"
                            type="text"
                            name="title"
                            maxLength="30"
                            placeholder="Votre titre" className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent"
                            value={values.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex  relative justify-center items-center">
                        <label htmlFor="desc" className="">
                        </label>
                        <input id="desc"
                            type="text"
                            name="desc"
                            maxLength="30"
                            placeholder="Description" className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent"
                            value={values.desc}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex  relative justify-center items-center">
                        <label htmlFor="adress" className="">
                        </label>
                        <input id="adress"
                            type="text"
                            name="adress"
                            maxLength="30"
                            placeholder="Addresse" className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent"
                            value={values.adress}
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
                            placeholder="Code Postal" className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent"
                            value={values.postal}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex  relative justify-center items-center">
                        <label htmlFor="expiration" className="">
                        </label>
                        <input id="expiration"
                            type="date"
                            name="expiration"
                            maxLength="30"
                            placeholder="Date d'expiration" className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent"
                            value={values.expiration}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex  relative justify-center items-center">Je certifie que ce bon plan existe 
                        <label htmlFor="certified" className="">
                        </label>
                        <input id="certified"
                            type="checkbox"
                            name="certified"
                            maxLength="30"
                            value={values.certified}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex  relative justify-center items-center">Je certifie avoir pris connaissance des CGU
                        <label htmlFor="cgu" className="">
                        </label>
                        <input id="cgu"
                            type="checkbox"
                            name="cgu"
                            maxLength="30"
                            value={values.cgu}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-center items-center my-5">
                        <button className="block text-white-150 bg-red-650 hover:bg-white-150 hover:text-red-650 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 h-12 w-40 dark:bg-gray-550 rounded-full transition duration-300 ease-in-out mt-5" type="submit">Publier</button>
                    </div>

                </form>
        </div>
    )
}

export default Post
