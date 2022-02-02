import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import profil from './images/profil-gaelle.png';
import adresse from './images/icon/adress.svg';
import Upvote from './Upvote';
import upvoteBas from './images/icon/upvote.svg';
import upvoteHaut from './images/icon/upvote2.svg';

const Filter = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [input, setInput] = useState("");
  
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
  
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement...</div>;
    } else {
        const regexp = new RegExp(input, 'i');
        const filterByName = items.filter(x => regexp.test(x.title));
      return (
        <div className="h-screen w-screen bg-white-150 flex justify-center overflow-auto items-center">
          <button></button>
          <ul className="h-full">
            <div className="mt-20 pb-12">
            <input value={input} onChange={event => setInput(event.target.value)}/>
              {filterByName.map(item => (
                <div className="w-92vw h-300px relative bg-red-450 dark:bg-black rounded-lg text-white-0 mb-2">
                  <div className="w-full h-75% relative">
                    <img className="object-cover rounded-t-lg h-full w-full" src={profil} alt="" />
                    <div className="absolute bottom-5 -left-1.5">
                    </div>
                  </div>
                  <div className="w-full h-25%">
                    <li key={item.id_post}  className="mt-1 w-92vw">
                                        <div>
                              <div className="bg-white-0 text-black text-xl font-bold flex w-max py-1 rounded-lg">
                                <span className="px-2 upvote">{item.upvote}</span>
                              </div>
                            </div>
                      <h1 className="text-lg font-semibold mx-2">{item.title}</h1>
                      <div className="flex mt-2 text-sm w-92vw">
                        <img src={adresse} className="ml-2 mr-1 w-3.5"></img> {item.address} <div className="absolute right-3">{item.postal}</div>
                      </div>
                    </li>
                  </div>
                </div>
              ))}
            </div>
          </ul>
        </div >
      );
    }};

export default Filter;

// export class Filter extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           input:"",
//           items: []
//         }
//         this.handleChange = this.handleChange.bind(this);
//     };

//     handleChange (event) {
//         this.setState({
//           input: event.target.value
//         })
//       }
 
//     componentDidMount() {
//         fetch("https://benef-app.fr/api-post-render.php")
//         .then(res => res.json())
//         .then(
//           (result) => {
//             this.setState({items: result})
//             console.log(this.state.items)
//           },
//         )
//     }
        
//     render(){
//         const regexp = new RegExp(this.state.input, 'i');
//         // const filterByName = this.state.items.filter(x => regexp.test(x.title));
//         // const renderByName = this.state.items.map(items => <li key={items.id_post}>{items.title}</li>);
//         return (
//         <div className="flex justify-center items-center color-white w-screen h-screen">
//             <input value={this.state.input} onChange={this.handleChange}/>
//             <h4 className="color-white">Résultat recherche :</h4>
//             {/* <ul>
//                 {renderByName}
//             </ul> */}
//         </div>
//         );
//     }
        
// }

// export default {Filter}
