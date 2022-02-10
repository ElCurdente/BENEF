import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

function Modal({ closeModal }) {
    const [filters, setFilters] = useState({
        filtered: false,
        category: '',
        postal: '',
        filter_by: 'upvote',
    })

    const handleReset = () => {
        setFilters({
            filtered: false,
            category: 'select',
            postal: '',
            filter_by: '',
        })
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    return (
        <div className="w-screen h-screen bg-black bg-opacity-30 fixed flex justify-center items-end">
            <div className="w-full h-75% mb-10 relative flex flex-col justify-around items-center rounded-t-3xl bg-white-0">
                <button className="absolute top-5 right-7 text-lg" onClick={() => closeModal(false)}>X</button>
                <div className="">
                    <h1 className="text-center text-2xl font-bold pt-7">Filtrer</h1>
                </div>
                <div className="">
                    <h2 className=" text-md pb-3 font-semibold ">Catégorie</h2>
                    <div className="flex  relative justify-center items-center mb-5">
                        <label htmlFor="cat" className="">{filters.category}</label>
                        <select name="category" id="category" onChange={handleChange} className="block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8  shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option value="select">--Please choose an option--</option>
                            <option value="all">Toutes catégories</option>
                            <option value="1">Catégorie 1</option>
                            <option value="2">Catégorie 2</option>
                            <option value="3">Catégorie 3</option>
                            <option value="4">Catégorie 4</option>
                            <option value="5">Catégorie 5</option>
                            <option value="6">Catégorie 6</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>

                    <h2 className=" text-md pb-3 font-semibold ">Localisation</h2>
                    <div className="flex  relative justify-center items-center">
                        <label htmlFor="postal" className="">
                        </label>
                        <select name="postal" id="postal" onChange={handleChange} className="block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option value="select">--Choisissez une région--</option>
                            <option value="all">Tous</option>
                            <option value="75">75</option>
                            <option value="78">78</option>
                            <option value="91">91</option>
                            <option value="92">92</option>
                            <option value="93">93</option>
                            <option value="94">94</option>
                            <option value="95">95</option>
                            <option value="77">77</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>

                    <h2 className=" text-md font-semibold ">Date d'expiration</h2>
                    <div className="flex  relative justify-center items-center">
                        <label htmlFor="expiration" className="text-black">
                        </label>
                        <input id="expiration"
                            type="date"
                            name="expiration"
                            maxLength="30"
                            placeholder="Date d'expiration" className="appearance-none placeholder-black text-black border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent"
                            value={filters.expiration}
                            onChange={handleChange}
                        />
                    </div>

                    <h2 className=" text-md font-semibold ">Trier par</h2>
                    <div className="flex">
                        <div className="flex relative items-center mt-6 ml-3">
                        <h4 className="text-black pl-2">{filters.filter_by}</h4>
                        <label htmlFor="certified" className="text-black pl-2">
                            <input id="filter_by_date"
                                type="radio"
                                name="filter_by"
                                maxLength="30"
                                className=""
                                value="date"
                                onChange={handleChange}
                            />
                            Upvotes
                        </label>
                    </div>
                    <div className="flex relative items-center mt-6 ml-3">
                        <label className="text-black pl-2">
                            <input id="filter_by_upvote"
                                type="radio"
                                name="filter_by"
                                maxLength="30"
                                className=""
                                value="upvote"
                                onChange={handleChange}
                            />
                            Récent
                        </label>
                    </div>
                    </div>
                    
                    {/* <div className="flex justify-end items-center py-5 mr-5">
                        <button className="block w-24 h-9 text-red-450 text-lg font-bold border-2 border-white-0 bg-white-0 hover:bg-red-450 hover:text-white-0 hover:border-white-0 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:text-black rounded-full transition duration-300 ease-in-out" type="submit">Appliquer</button>
                    </div>
                    <div className="flex justify-end items-center py-5 mr-5">
                        <button onClick={handleReset} className="block  h-9 text-red-450 text-lg font-bold border-2 border-white-0 bg-white-0 hover:bg-red-450 hover:text-white-0 hover:border-white-0 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:text-black rounded-full transition duration-300 ease-in-out">Réinitialiser</button>
                    </div> */}
                </div>
                <div className="flex w-full justify-evenly">
                    <button onClick={handleReset} className="block px-7 py-2 text-red-450 text-lg font-semibold bg-white-0 border-2 border-red-450 hover:bg-red-450 hover:text-white-0 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:text-black rounded-full transition duration-300 ease-in-out">Annuler</button>
                    <button className="block px-5 py-2 text-white-0 text-lg font-semibold bg-red-450 hover:bg-white-0 hover:text-red-450 hover:border-red-450 border-2 border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:text-black rounded-full transition duration-300 ease-in-out" type="submit">Appliquer</button>
                </div>
            </div>
        </div>
    )
}

export default Modal
