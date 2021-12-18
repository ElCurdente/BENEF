import React from 'react';

const Parametre = () => {
    
return (
    
    
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-white">
                <div id="infos" className="relative grid grid-cols-2 grid-layout w-95vw px-4">
                    
                
                        <h1 className="ml-50 text-2xl font-bold">Paramètres</h1>
                       
                    
                    <p className="col-span-2 mt-2 text-xl pt-10 font-semibold ">Compte</p>

                    <li className='col-span-2 mt-2 list-none'>
                        <ul>Informations du compte</ul>
                        <ul>Changer son mot de passe</ul>
                        <ul>Bons plans enregistrés</ul>
                    </li>
                       
                    
                    <p className="col-span-2 mt-2 text-xl pt-10 font-semibold ">Confidentialité</p>

                    <li className='col-span-2 mt-2 list-none'>
                        <ul>Utilisateurs bloqués</ul> 
                    </li>


                    <p className="col-span-2 mt-2 text-xl pt-10 font-semibold">Affichage</p>

                    <li className='col-span-2 mt-2 list-none'>
                        <ul>Utilisateurs bloqués<input type="checkbox" class="form-checkbox w-10 h-5 text-green-600 ml-20 rounded-full" unchecked></input></ul> 
                        
                      
               
                </li>


                <p className="col-span-2 mt-2 text-xl pt-10 font-semibold ">Notifications</p>

                <li className='col-span-1 mt-2 list-none'>
                        <ul>Messages privés
                        <input type="checkbox" class="form-checkbox w-10 h-5 text-green-600 ml-20 rounded-full" unchecked></input>
                        </ul> 
                        <ul>UpVotes sur un post publié
                        <input type="checkbox" class="form-checkbox w-10 h-5 text-green-600 ml-20 rounded-full" unchecked></input>
                        </ul> 
                        <ul>Autres
                            <input type="checkbox" class="form-checkbox w-10 h-5 text-green-600 ml-20 rounded-full" unchecked></input>
  
                        </ul> 
    

</li>




                </div>
               </div>
    )
}



export default Parametre

