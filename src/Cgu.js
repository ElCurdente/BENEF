import React from 'react';
import { Link } from 'react-router-dom';


const Cgu = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen dark:bg-gray-550 bg-gray-100 xl:bg-gray-150 dark:text-white-0">
            <div id="infos" className="overflow-y-auto w-95vw h-full mt-20 dark:bg-gray-550 xl:bg-gray-50 xl:w-1/3 xl:p-5">


                <h1 className="text-center text-2xl font-bold pt-7">Conditions générales d'utilisation</h1>

                <h2 className=" text-xl pt-10 font-semibold ">Présentation de BENEF</h2>
                <li className='mt-2 list-none'>

                    <ul className="pb-2">
                        
                            <p class="opacity-95 font-light">BENEF est une web-application unique en son genre. BENEF va vous permettre de consulter les bons plans publiés par les autres utilisateurs et de partager les vôtres avec la communauté de benefeurs. BENEF est ouvert à tous.
                            Nous souhaitons inciter les gens à sortir, le prix des sorties étant souvent un frein, surtout pour les jeunes et les étudiants. Nous souhaitons aussi développer un esprit collectif parmi les benefeurs,
                            c’est pourquoi ce sont les utilisateurs qui partagent les bons plans qui leur tiennent à cœur.</p>
                    </ul>
                </li>


                <h2 className="mt-2 text-xl pt-7 font-semibold">Utilisation de Benef</h2>
                <li className=' mt-2 list-none'>
                    <ul> 
                        <p class="opacity-95 font-light">
                        BENEF est disponible pour les internautes adultes et les internautes mineurs sous le consentement et la responsabilité de leurs parents,
                        certains contenus étant réservés aux personnes adultes (alcool dans les bars,...).</p>
                    </ul>
                </li>


                <h2 className="mt-2 text-xl pt-7 font-semibold">Autorisations et restrictions Générales</h2>
                <li className=' mt-2 list-none'>
                    <ul className="w-full flex justify-between items-center opacity-95 font-light">
                        <p class="opacity-95 font-light">Vous pouvez accéder au service et l’utiliser tel qu’il vous est proposé sous condition de respecter les règles. Les restrictions suivantes s’appliquent à votre utilisation du service.
Vous n’êtes pas autorisés à :<br></br>
• vendre, concéder sous licence, altérer, modifier ou utiliser de toute autre façon tout ou partie du Service ou du Contenu sauf si le service vous y a explicitement autorisé, par écrit<br></br>
• utiliser le Service pour vendre de la publicité<br></br>
• mentir sur la nature, le prix, les dates du bon plan publié sur la plateforme <br></br>
• usurper l’identité d’autrui <br></br>
• accéder au Service par le biais de procédés automatisés <br></br>
• abuser des options de signalements <br></br>
• recueillir ou utiliser toute information permettant d’identifier une personne <br></br>
• diffuser du contenu obscène, vulgaire, offensant </p>

                       
                    </ul>
                </li>


                <h2 className="mt-2 text-xl pt-7 font-semibold ">Notifications</h2>
                <li className='mt-2 list-none'>
                    <ul className="w-full flex justify-between items-center opacity-95 font-light pb-2">Messages privés
                      
                    </ul>
                    <ul className="w-full flex justify-between items-center opacity-95 font-light pb-2">"UpVotes" sur un post publié
                        {/* <input type="checkbox" id="toggle_btn_3" class="hidden w-10 h-5 text-green-600 mr-2 rounded-full" checked={checked3}
                            onChange={() => setChecked3(!checked3)} ></input>
                        <label for="toggle_btn_3">
                            <div className="container-toggle-dot flex w-9 h-5 items-center bg-gray-300 rounded-full p-1 mr-2 transform transition duration-300">
                                <div id="toggle_dot_3" className="toggle-dot-3 w-4 h-4 bg-white-0 rounded-full shadow-md transform transition duration-300"></div>
                            </div>
                        </label> */}
                        
                    </ul>
                    <ul className="w-full flex justify-between items-center opacity-95 font-light xl:hover:text-red-500">Autres
                    </ul>

                </li>
                <h2 className="mt-2 p-0 text-base pt-10 font-semibold cursor-pointer ">Aide</h2>
                <h2 className="mt-2 text-base font-semibold cursor-pointer ">Déconnexion</h2>
                <h2 className="mt-2 text-base font-semibold text-red-500 cursor-pointer">Supprimer le compte</h2>

            </div>
        </div>
    )

}


export default Cgu
