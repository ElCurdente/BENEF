import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import profil from './images/profil-gaelle.png';
import adresse from './images/icon/adress.svg';
import filtre from './images/icon/icon_filtre.svg';
import FilterButton from './FilterButton'
import Upvote from './Upvote';
import upvoteBas from './images/icon/upvote.svg';
import upvoteHaut from './images/icon/upvote2.svg';
import recherche from './images/icon/icon_recherche.svg';
import Modal from './Modal'

const Filter = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  let filterByFilters;
  const [filters, setFilters] = useState({
    filtered: false,
    category: '',
    postal: '',
    filter_by: 'upvote',
  })

  const [openModal, setOpenModal] = useState(false);

  

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
  }, [])

  const handleSubmitFiltered = e => {
    e.preventDefault();
    setFilters(prevState => ({
      ...prevState,
      filtered: true
    }));
  }

  function compareUpvote(a, b) {
    if (parseInt(a.upvote) < parseInt(b.upvote)) {
      return 1;
    }
    if (parseInt(a.upvote) > parseInt(b.upvote)) {
      return -1;
    }
    return 0;
  }

  function compareDate(a, b) {
    if (parseInt(a.id_post) < parseInt(b.id_post)) {
      return 1;
    }
    if (parseInt(a.id_post) > parseInt(b.id_post)) {
      return -1;
    }
    return 0;
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    const regexp = new RegExp(input, 'i');
    const regexp_postal = new RegExp(filters.postal, 'i');
    const regexp_category = new RegExp(filters.category, 'i');

    const filterByName = items.filter(x => regexp.test(x.title));
    console.log(filters.postal);
    filterByFilters = items.filter(item => regexp_postal.test(item.postal));
    const filter100 = filterByFilters.filter(item => regexp_category.test(item.category))
    const filter1000 = filter100.filter(x => regexp.test(x.title));
    if (filters.filter_by === "upvote") {
      filterByFilters.sort(compareUpvote);
    } else if (filters.filter_by === "date") {
      filterByFilters.sort(compareDate);
    }
    console.log(filterByFilters);

    return (
      <div className="h-screen w-screen relative bg-white-150 flex justify-center overflow-auto items-center">
        <ul className="h-full">
          <div className="mt-14 pb-12">
            <form className="post flex flex-col justify-center" onSubmit={(e) => handleSubmitFiltered(e)} id="filter_form">
              <div className="flex h-100px relative justify-center items-center w-full">
                <h1 className="text-center text-2xl font-bold pt-7">Recherche</h1>
              </div>
              <div className="flex relative justify-center items-center w-full ">
                <div className="flex border-b-2 border-black required:w-65% h-8 mt-5 mb-20">
                  <input value={input} className=" required:w-65% px-6 bg-white-150 placeholder-black focus:outline-none" placeholder="Rechercher..." onChange={event => setInput(event.target.value)} />
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 20 20" className="w-5 h-5 mt-1 mr-3"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
              </div>

            </form>
            {(filters.filtered ?

              filter1000.map(item => (
                <div className="w-92vw h-150px relative flex justify-between items-center bg-red-450 dark:bg-black rounded-lg text-white-0 mb-5 shadow-customm">
                  <div className="h-full w-35% flex justify-center items-center relative">
                    <img className="w-90% h-90%  object-cover rounded-lg" src={profil} alt="" />
                  </div>
                  <div className="w-65% justify-self-end flex relative justify-center items-center h-full">
                    <li key={item.id_post} className="mt-1 w-92vw">
                      <div className="bg-white-0 text-black text-xl font-bold absolute right-3 top-3 w-max rounded-lg">
                        <span className="px-2 upvote">{item.upvote}</span>
                      </div>
                      <h1 className="text-lg font-semibold mx-2">{item.title}</h1>
                      <div className="flex mt-2 text-sm">
                        <img src={adresse} className="ml-2 mr-1 w-3.5"></img> {item.address} <div className="absolute right-3 bottom-3">{item.postal}</div>
                      </div>
                    </li>
                  </div>
                </div>
              ))
              :
              filterByName.map(item => (
                <div className="w-92vw h-150px relative flex justify-between items-center bg-red-450 dark:bg-black rounded-lg text-white-0 mb-5 shadow-customm">
                  <div className="h-full w-35% flex justify-center items-center relative">
                    <img className="w-90% h-90%  object-cover rounded-lg" src={profil} alt="" />
                  </div>
                  <div className="w-65% justify-self-end flex relative justify-center items-center h-full">
                    <li key={item.id_post} className="mt-1 w-92vw">
                      <div className="bg-white-0 text-black text-xl font-bold absolute right-3 top-3 w-max rounded-lg">
                        <span className="px-2 upvote">{item.upvote}</span>
                      </div>
                      <h1 className="text-lg font-semibold mx-2">{item.title}</h1>
                      <div className="flex mt-2 text-sm">
                        <img src={adresse} className="ml-2 mr-1 w-3.5"></img> {item.address} <div className="absolute right-3 bottom-3">{item.postal}</div>
                      </div>
                    </li>
                  </div>
                </div>
              ))
            )}

          </div>
        </ul>
        <button className="fixed bottom-24 right-5 flex justify-center items-center w-16 h-16 text-lg font-bold border-2 border-white-0 bg-orange-450 hover:bg-red-450 hover:text-white-0 hover:border-white-0 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-200 dark:bg-white-0 dark:text-black rounded-full transition duration-300 ease-in-out shadow-customm" onClick={() => {
          setOpenModal(true);
        }}><img src={filtre} className="h-6" /></button>
        {openModal && <Modal closeModal={setOpenModal}/>}
      </div >
    );

  }
};

export default Filter;
