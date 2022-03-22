import React from 'react'
import useForm from './useForm'
import validate from './validateInfo'
import './Form.css';
import './index.css';
import logo from './images/logo/logo_benef.svg';
import logodark from './images/logo/logo_benef_dark.svg'
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useState } from 'react';

const FormSignup = ({ submitForm }) => {

    /* on récupères les fonctions et states de useForm */

    const { handleChange, handleClickShowPassword, handleClickShowPassword2, handleMouseDownPassword, values, handleSubmit, errors, handleSubmitConnexion, handleChangeCo, valuesConnexion, handleStayConnected, stayConnected, errorsConnexion, errorDoublon } = useForm(submitForm, validate);
    const [openModal, setOpenModal] = useState(false);
    const [hasAccount, setHasAccount] = useState(false);

    const handleConnexion = e => {
        e.preventDefault();
        setHasAccount(true);
    };

    const handleConnexion2 = e => {
        e.preventDefault();
        setHasAccount(false);
    };

    /* Permet d'afficher les cgu */

    function handleCGU() {
        console.log('cgu');
        setOpenModal(true);
    }

    if (hasAccount === true) { /* Si l'utilisateur déclare qu'il possède déjà un compte, le formulaire suivant s'affiche. Sinon c'est le formulaire d'inscription qui s'affichera */
        return (
            <div className="flex justify-center items-center bg-red-450 box-border h-screen w-full dark:bg-black">
                <div className="w-96">
                    <div className="flex justify-center items-center mb-5">
                        <img src={logo} alt="Logo" className="w-64 dark:hidden" />
                        <img src={logodark} alt="Logo" className="w-64 hidden dark:block" />
                    </div>

                    <div className="bg-white-0 p-7 rounded-xl">
                        <form className="form" onSubmit={handleSubmitConnexion}>
                            <div className="flex relative justify-center items-center">
                                <label htmlFor="username" className="">
                                </label>
                                <input id="username"
                                    type="text"
                                    name="username"
                                    maxLength="30"
                                    placeholder="Nom d'utilisateur" className="placeholder-gray-650 text-gray-550 border-b-2 border-red-450 bg-transparent w-4/5 my-2 mt-5 h-12 pt-5 text-left focus:outline-none focus:placeholder-transparent"
                                    value={valuesConnexion.username}
                                    onChange={handleChangeCo}
                                />
                        
                            </div>
                            <div className="flex relative justify-center items-center">
                                <label htmlFor="mdp" className="form-label">
                                </label>
                                <input id="mdp"
                                    type={values.showPassword ? "text" : "password"}
                                    name="mdp"
                                    maxLength="30"
                                    minLength="8"
                                    placeholder="Mot de passe"
                                    className="placeholder-gray-650 text-gray-550 border-b-2 bg-transparent border-red-450 w-4/5 my-2 mt-5 h-12 text-left focus:outline-none pt-5 focus:placeholder-transparent"
                                    value={valuesConnexion.mdp}
                                    onChange={handleChangeCo} />
                                {
                                    <InputAdornment position="end" className="absolute right-10 bottom-7" color="primary">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            name='bouton voir mot de passe'
                                        >
                                            {values.showPassword ? <Visibility style={{ color: "black" }} /> : <VisibilityOff style={{ color: "black" }} />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            {errorsConnexion.wrongEntries && <p className="absolute -bottom-10 left-8 text-red-650 dark:text-red-650">Mauvais nom d'utilisateur ou mot de passe</p>}
                            </div>
                            <div className="flex justify-center relative items-center mt-10">
                            <input id="stayConnected"
                                type="checkbox"
                                name="stayConnected"
                                maxLength="30"
                                className="form-checkbox rounded-sm border-red-450 border-2 focus:ring-transparent checked:border-red-450 checked:bg-red-450 text-red-450 cursor-pointer"
                                value={stayConnected}
                                onChange={handleStayConnected}
                            />
                            <label htmlFor="cgu" className="text-red-450 pl-2 cursor-pointer">Rester connecté
                            </label>
                        </div>
                            <div className="flex justify-center items-center my-5 mt-5">
                                <button name='bouton se connecter' className="block h-10 w-36 text-white-0 font-semibold bg-red-450 text-lg border-2 border-transparent hover:bg-white-0 hover:text-red-450 hover:border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-450 active:text-white-0 dark:bg-white-0 dark:text-black rounded-full transition duration-300 ease-in-out" type="submit">Se connecter</button>
                            </div>
                            <div className="flex justify-center items-center">
                                <h3 onClick={handleConnexion2} className="text-red-450 cursor-pointer hover:underline">Pas de compte ? Crée en un !</h3>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            
            <div className="flex justify-center items-center bg-red-450 box-border h-screen w-full dark:bg-black">
                {openModal &&
                <div id="modal" className="flex w-screen h-screen bg-black bg-opacity-30 fixed bottom-0 left-0 justify-center overflow-auto z-40 items-center">
                    <div className="w-95vw xl:w-2/6 max-h-max mb-10 xl:mb-0 relative flex flex-col justify-center items-center rounded-3xl bg-white-0  dark:bg-gray-550 dark:text-white-0">
                    <div className="mt-7 flex flex-col mx-7">
                        <h1 className="text-center text-2xl font-bold pt-7">Conditions générales <br></br> & CGU </h1>
                        <h2 className="text-xl pt-10 font-semibold ">Présentation de BENEF</h2>
                        <li className='mt-2 list-none'>

                            <ul className="pb-2">

                                <p className="opacity-95 font-normal">BENEF est une web-application unique en son genre. BENEF va vous permettre de consulter les bons plans publiés par les autres utilisateurs et de partager les vôtres avec la communauté de benefeurs. BENEF est ouvert à tous.
                                    Nous souhaitons inciter les gens à sortir, le prix des sorties étant souvent un frein, surtout pour les jeunes et les étudiants. Nous souhaitons aussi développer un esprit collectif parmi les benefeurs,
                                    c’est pourquoi ce sont les utilisateurs qui partagent les bons plans qui leur tiennent à cœur.</p>
                            </ul>
                        </li>


                        <h2 className="mt-2 text-xl pt-7 font-semibold">Utilisation de Benef</h2>
                        <li className=' mt-2 list-none'>
                            <ul>
                                <p class="opacity-95 font-normal">
                                    BENEF est disponible pour les internautes adultes et les internautes mineurs sous le consentement et la responsabilité de leurs parents,
                                    certains contenus étant réservés aux personnes adultes (alcool dans les bars,...).</p>
                            </ul>
                        </li>


                        <h2 className="mt-2 text-xl pt-7 font-semibold">Autorisations et restrictions Générales</h2>
                        <li className=' mt-2 list-none'>
                            <ul className="w-full flex justify-between items-center opacity-95 font-light">
                                <p class="opacity-95 font-normal">Vous pouvez accéder au service et l’utiliser tel qu’il vous est proposé sous condition de respecter les règles. Les restrictions suivantes s’appliquent à votre utilisation du service.
                                    Vous n’êtes pas autorisés à :<br></br>
                                    • vendre, concéder sous licence, altérer, modifier ou utiliser de toute autre façon tout ou partie du Service ou du Contenu sauf si le service vous y a explicitement autorisé, par écrit<br></br>
                                    • utiliser le Service pour vendre de la publicité<br></br>
                                    • mentir sur la nature, le prix, les dates du bon plan publié sur la plateforme <br></br>
                                    • usurper l’identité d’autrui <br></br>
                                    • accéder au Service par le biais de procédés automatisés <br></br>
                                    • abuser des options de signalements <br></br>
                                    • recueillir ou utiliser toute information permettant d’identifier une personne<br></br>
                                    • diffuser du contenu obscène, vulgaire, offensant <br></br><br></br>
                                    Les conditions générales d’utilisation rappellent aux internautes que les éléments du site tels que le texte et les images
                                    sont protégés par le droit d’auteur et que leur utilisation sans autorisation préalable expresse est interdite.</p>
                            </ul>
                        </li>


                        <h2 className="mt-2 text-2xl  text-center pt-10 font-semibold ">Conditions générales</h2>
                        <li className='mt-2 list-none'>
                            <ul className="w-full flex justify-between items-center opacity-95 font-normal">
                                Les présentes conditions générales régissent votre utilisation de BENEF.<br></br>
                                Le service peut inclure des liens vers des sites web tiers qui n’appartiennent pas à BENEF. Nous déclinons toute responsabilité quant à l’utilisation de ces sites.
                            </ul>
                        </li>

                        <h2 className="mt-2 text-xl pt-7 font-semibold ">Le règlement général sur la protection des données</h2>
                        <li className='mt-2 list-none'>
                            <ul className="w-full flex justify-between items-center opacity-95 font-normal pb-2"><p>
                                Les informations recueillies sur le formulaire d’inscription sont enregistrées dans notre base de données informatisée par nos développeurs. Ces informations permettent de créer votre compte et profil BENEF.<br></br>
                                Les données collectées seront communiquées aux seuls destinataires suivants: <strong>Célian Chevereau, Antoine Droyer, Gaspard Freyssinet, Merwan Jaudally et Jules Mesnil</strong>.<br></br>
                                Les données sont conservées jusqu’à la suppression souhaitée par l’utilisateur ou par les administrateurs.<br></br>
                                Vous pouvez accéder aux données vous concernant, les rectifier, demander leur effacement ou exercer votre droit à la limitation du traitement de vos données. Vous pouvez retirer à tout moment votre consentement au traitement de vos données. Vous pouvez également vous opposer au traitement de vos données. Vous pouvez également exercer votre droit à la portabilité de vos données. Consultez le site du CNIL pour plus d’informations sur vos droits.<br></br>
                                Pour la moindre question sur le traitement de vos données dans BENEF, vous pouvez contacter <strong>admin@benef-app.fr</strong> .<br></br>
                                Si après nous avoir contacté, vous estimez que vos droits “Informatique et Libertés” ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL.<br></br>
                            </p>
                            </ul>
                        </li>
                        <h2 className="mt-2 text-2xl  text-center pt-10 font-semibold ">Conditions générales d'utilisation</h2>

                        <li className='mt-2 list-none'>
                            <ul className="w-full flex justify-between items-center opacity-95 font-normal pb-2"><p>
                                Les présentes conditions générales d’utilisation régissent votre utilisation de BENEF.<br></br>
                            </p>
                            </ul>
                        </li>
                        <h2 className="mt-2 text-xl pt-7 font-semibold ">Compte</h2>
                        <li className='mt-2 list-none'>
                            <ul className="w-full flex justify-between items-center opacity-95 font-normal pb-2"><p>
                                Il faut forcément être connecté pour accéder au Service et Contenu. La création d’un compte comporte plusieurs exigences: un nom d’utilisateur, une date de naissance, un code postal, une adresse mail ainsi qu’un mot de passe. Une fois connecté, il est possible à l'utilisateur de rajouter une photo de profil et une biographie à son profil. Il est interdit d’avoir un nom d’utilisateur, une photo de profil ou une biographie obscène, vulgaire, offensante ou haineux. <br></br><br></br>
                                Il n’est pas possible de trouver un utilisateur par la fonction recherche.<br></br><br></br>

                                Il est possible d’accéder au compte d’un utilisateur en cliquant sur sa photo de profil ou sur son nom d’utilisateur depuis un bon plan posté.<br></br><br></br>
                                Sur le compte d’un autre utilisateur sera visible uniquement son nom d’utilisateur, sa photo de profil, sa biographie et les bons plans qu’il a déjà postés. L’adresse mail, la date de naissance et le code postal ne sont visibles que par les administrateurs de BENEF.<br></br><br></br>

                                Les administrateurs se gardent le droit de supprimer de façon unilatérale et sans justification le compte de toute personne ne respectant pas les règles.<br></br>

                            </p>
                            </ul>
                        </li>

                        <h2 className="mt-2 text-xl pt-7 font-semibold ">Bons plans</h2>
                        <li className='mt-2 list-none'>
                            <ul className="w-full flex justify-between items-center opacity-95 font-normal"><p>
                                Dans BENEF, un bon plan est une sortie ou une activité dont le prix a subi une réduction, est gratuit ou est bas (ou plus bas que la moyenne).<br></br><br></br>

                                Est un bon plan: une exposition, une galerie d’art, un restaurant, un fast-food, un food-truck, un bar, une boîte de nuit, une soirée, une soirée étudiante, un festival, un workshop…<br></br><br></br>

                                N’est pas un bon plan: tout produit physique achetable, par exemple des vêtements, des courses, du matériel informatique, électronique…<br></br><br></br>
                                /!\ À noter que cela n’inclut pas la nourriture des restaurants.<br></br><br></br>
                                Les utilisateurs s’engagent à partager des lieux et activités répertoriés et légaux.<br></br><br></br>

                                BENEF se dégage de toute responsabilité si l’activité ou la sortie ne respecte pas les règles citées précédemment.<br></br><br></br>

                                Vous engagez aussi votre responsabilité pour les droits d’auteur des images que vous utilisez pour présenter le bon plan publié. BENEF se dégage aussi de toute responsabilité sur ce point<br></br><br></br>
                            </p>
                            </ul>
                        </li>

                        <h2 className="mt-2 text-xl pt-7 font-semibold ">Signalement</h2>
                        <li className='mt-2 list-none'>
                            <ul className="w-full flex justify-between items-center opacity-95 font-normal pb-40"><p>
                                Le signalement permet aux utilisateurs de signaler aux administrateurs du site qu’un Contenu ou un utilisateur ne respectent pas les Conditions Générales d’Utilisation de BENEF.<br></br><br></br>

                                Les administrateurs se gardent le droit de supprimer de façon unilatérale et sans justification le bon plan de toute personne ne respectant pas les règles.<br></br><br></br>

                                Si un utilisateur abuse des fonctions de signalement (spam, signalement de contenus respectant les CGU…) les administratifs de BENEF se gardent le droit de suspendre de manière indéterminée le compte de l’utilisateur.
                                <br></br>



                            </p>
                            </ul>
                        </li>
                            <div className="flex w-full justify-evenly mt-7 mb-8">

                                <button onClick={() => setOpenModal(false)} className="block px-4 hover:underline hover:underline-offset-8 text-red-450 font-semibold dark:hover:underline dark:hover:underline-offset-8 dark:hover:text-black transition duration-300 ease-in-out" type="submit">Fermer</button>
                            </div>
                        </div>
                    </div>


                </div>
            }
            <div className="w-96">
                <div className="flex justify-center items-center mb-5">
                    <img src={logo} alt="Logo" className="w-64 dark:hidden" />
                    <img src={logodark} alt="Logo" className="w-64 hidden dark:block" />
                </div>
                <div className="bg-white-0 p-7 rounded-xl">

            {/* Formulaire typique en React*/}

                    <form className="form" action="api.php" method="GET" onSubmit={handleSubmit}>
                        <div className="flex relative justify-center items-center">
                            <label htmlFor="username" className="">
                            </label>
                            <input id="username"
                                type="text"
                                name="username"
                                maxLength="30"
                                placeholder="Nom d'utilisateur" className="placeholder-gray-650 text-gray-550 border-b-2 border-red-450 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent"
                                value={values.username}
                                onChange={handleChange}
                            />
                            {errors.username && <p className="absolute -bottom-4 left-10 text-red-650 dark:text-red-650">{errors.username}</p>}
                        </div>
                        <div className="flex relative justify-center items-center">
                            <label htmlFor="birth" className="form-label">
                            </label>
                            <input id="birth"
                                type="date"
                                name="birth"
                                placeholder="Date de naissance"
                                className="bg-transparent border-b-2 border-red-450 w-4/5 my-2 h-12 text-left text-gray-450 focus:outline-none pt-5 focus:placeholder-gray-450"
                                s={values.birth}
                                onChange={handleChange} />
                            {errors.birth && <p className="absolute -bottom-4 left-10 text-red-650 dark:text-red-650">{errors.birth}</p>}
                        </div>
                        <div className="flex relative justify-center items-center">
                            <label htmlFor="postal" className="form-label">
                            </label>
                            <input id="postal"
                                type="number"
                                name="postal"
                                maxLength="5"
                                placeholder="Code postal"
                                className="placeholder-gray-650 text-gray-550 border-b-2  border-red-450 bg-transparent w-4/5 my-2 h-12 text-left focus:outline-none pt-5 focus:placeholder-transparent"
                                value={values.postal}
                                onChange={handleChange} />
                            {errors.postal && <p className="absolute -bottom-4 left-10 text-red-650 dark:text-red-650">{errors.postal}</p>}
                        </div>
                        <div className="flex relative justify-center items-center">
                            <label htmlFor="email" className="form-label">
                            </label>
                            <input id="email"
                                type="email"
                                name="email"
                                maxLength="35"
                                placeholder="Email"
                                className="placeholder-gray-650 text-gray-550 border-b-2  border-red-450 bg-transparent w-4/5 my-2 h-12 text-left focus:outline-none pt-5 focus:placeholder-transparent"
                                value={values.email}
                                onChange={handleChange} />
                            {errors.email && <p className="absolute -bottom-4 left-10 text-red-650 dark:text-red-650">{errors.email}</p>}
                        </div>
                        <div className="flex relative justify-center items-center">
                            <label htmlFor="mdp" className="form-label">
                            </label>
                            <input id="mdp"
                                type={values.showPassword ? "text" : "password"}
                                name="mdp"
                                maxLength="30"
                                minLength="8"
                                placeholder="Mot de passe"
                                className="placeholder-gray-650 text-gray-550 border-b-2  border-red-450 bg-transparent w-4/5 my-2 h-12 text-left focus:outline-none pt-5 focus:placeholder-transparent"
                                value={values.mdp}
                                onChange={handleChange} />
                            {errors.mdp && <p className="absolute -bottom-4 left-10 text-red-650 dark:text-red-650">{errors.mdp}</p>}
                            {
                                <InputAdornment position="end" className="absolute right-7" color="primary">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        name='bouton voir mot de passe'
                                    >
                                        {values.showPassword ? <Visibility style={{ color: "black" }} /> : <VisibilityOff style={{ color: "black" }} />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        </div>
                        <div className="flex relative justify-center items-center">
                            <label htmlFor="mdpV" className="form-label">
                            </label>
                            <input id="mdpV"
                                type={values.showPassword2 ? "text" : "password"}
                                name="mdpV"
                                maxLength="30"
                                minLength="8"
                                placeholder="Confirmation du mot de passe"
                                className="placeholder-gray-650 text-gray-550 border-b-2  border-red-450 bg-transparent w-4/5 my-2 h-12 text-left focus:outline-none pt-5 focus:placeholder-transparent"
                                value={values.mdpV}
                                onChange={handleChange} />
                            {errors.mdpV && <p className="absolute -bottom-4 left-10 text-red-650 dark:text-red-650">{errors.mdpV}</p>}
                            {
                                <InputAdornment position="end" className="absolute right-7">
                                    <IconButton
                                        onClick={handleClickShowPassword2}
                                        onMouseDown={handleMouseDownPassword}
                                        name='bouton voir mot de passe'
                                    >
                                        {values.showPassword2 ? <Visibility style={{ color: "black" }} /> : <VisibilityOff style={{ color: "black" }} />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        </div>
                        <div className="flex justify-center relative items-center mt-8">
                        <input id="cgu"
                            type="checkbox"
                            name="cgu"
                            maxLength="30"
                            className="form-checkbox rounded-sm border-red-450 border-2 focus:ring-transparent checked:border-red-450 checked:bg-red-450 text-red-450 cursor-pointer"
                            value={values.cgu}
                            onChange={handleChange}
                            required
                            />
                        <label htmlFor="cgu" className="text-red-450 pl-2 cursor-pointer">Je certifie avoir pris connaissance des <span onClick={handleCGU} className="hover:underline">CGU</span>
                        </label>
                        </div>

                        <div className="flex justify-center items-center my-5">
                            <button name="bouton s'inscrire" className="block h-10 w-36 text-white-0 font-semibold bg-red-450 text-lg border-2 border-transparent hover:bg-white-0 hover:text-red-450 hover:border-red-450 dark:hover:bg-white-150 dark:hover:text-gray-550 active:bg-red-450 active:text-white-0 dark:bg-white-0 dark:text-black rounded-full transition duration-300 ease-in-out" type="submit">S'inscrire</button>
                        </div>
                        {errorDoublon &&  <div className="flex justify-center items-center my-5"><p className="text-red-650 dark:text-red-650">Ce nom d'utilisateur est déjà pris.</p></div>}
                        <div className="flex justify-center items-center">
                            <h3 onClick={handleConnexion} className="text-red-450 hover:underline cursor-pointer">Déjà un compte ? Connecte-toi</h3>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        )
    }
}

export default FormSignup
