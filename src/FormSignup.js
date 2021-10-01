import React from 'react'
import useForm from './useForm'
import validate from './validateInfo'
import './Form.css';
import logo from './images/logo/logo_benef.png'
import logo_dark from './images/logo/logo_benef_dark.png'
import logo_dark_svg from './images/logo/logo_benef_dark.svg'
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { pink } from '@material-ui/core/colors';


const FormSignup = ({ submitForm }) => {
    const { handleChange, handleClickShowPassword, handleClickShowPassword2, handleMouseDownPassword, values, handleSubmit, errors } = useForm(submitForm, validate);



    return (
        <div className="w-96">
            <div className="flex justify-center items-center">
                <img id="logo_inscription" src={logo} alt="Logo" className="w-64 dark:hidden" />
                <img id="logo_inscription" src={logo_dark} alt="Logo" className="w-64 hidden dark:block" />
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="flex  relative justify-center items-center">
                    <label htmlFor="username" className="">
                    </label>

                    <input id="username"
                        type="text"
                        name="username"
                        maxLength="30"
                        placeholder="Nom d'utilisateur" className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 pt-5 text-left focus:outline-none  focus:placeholder-transparent"
                        value={values.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="absolute -bottom-4 left-10 text-red-900">{errors.username}</p>}
                </div>

                <div className="flex relative justify-center items-center">
                    <label htmlFor="birth" className="form-label">
                    </label>
                    <input id="birth"
                        type="date"
                        name="birth"
                        placeholder="Date de naissance"
                        className=" bg-transparent border-b-2 w-4/5 my-2 h-12 text-left text-white-150  focus:outline-none pt-5 focus:placeholder-transparent"
                        s={values.birth}
                        onChange={handleChange} />
                    {errors.birth && <p className="absolute -bottom-4 left-10 text-red-900">{errors.birth}</p>}
                </div>

                <div className="flex relative justify-center items-center">
                    <label htmlFor="postal" className="form-label">
                    </label>

                    <input id="postal"
                        type="number"
                        name="postal"
                        maxLength="5"
                        placeholder="Code postal"
                        className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 text-left focus:outline-none pt-5 focus:placeholder-transparent"
                        value={values.postal}
                        onChange={handleChange} />
                    {errors.postal && <p className="absolute -bottom-4 left-10 text-red-900">{errors.postal}</p>}
                </div>

                <div className="flex relative justify-center items-center">
                    <label htmlFor="email" className="form-label">
                    </label>

                    <input id="email"
                        type="email"
                        name="email"
                        maxLength="35"
                        placeholder="Adresse Email"
                        className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 text-left focus:outline-none pt-5 focus:placeholder-transparent"
                        value={values.email}
                        onChange={handleChange} />
                    {errors.email && <p className="absolute -bottom-4 left-10 text-red-900">{errors.email}</p>}
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
                        className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 text-left focus:outline-none pt-5 focus:placeholder-transparent"
                        value={values.mdp}
                        onChange={handleChange} />
                    {errors.mdp && <p className="absolute -bottom-4 left-10 text-red-900">{errors.mdp}</p>}
                    {
                        <InputAdornment position="end" className="absolute right-10" color="primary">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <Visibility style={{ color: "white" }} /> : <VisibilityOff style={{ color: "white" }} />}
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
                        className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 text-left focus:outline-none pt-5 focus:placeholder-transparent"
                        value={values.mdpV}
                        onChange={handleChange} />
                    {errors.mdpV && <p className="absolute -bottom-4 left-10 text-red-900">{errors.mdpV}</p>}
                    {
                        <InputAdornment position="end" className="absolute right-10">
                            <IconButton
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword2 ? <Visibility style={{ color: "white" }} /> : <VisibilityOff style={{ color: "white" }} />}
                            </IconButton>
                        </InputAdornment>
                    }
                </div>
                <div className="flex justify-center items-center my-5">
                    <button className="block text-white-150 bg-red-650 dark:bg-gray-550 hover:bg-white-150 hover:text-red-650 dark:hover:bg-gray-450 dark:hover:text-white-150 active:bg-red-200 h-12 w-40  rounded-full transition duration-300 ease-in-out mt-5" type="submit">S'inscrire</button>
                </div>
                <div className="flex justify-center items-center">
                    <span className="text-white-150">Déjà inscrit ? <a href="https://giphy.com/gifs/afv-funny-fail-kid-xTiTncVep2khPGhK1i" target="_blank" className="hover:underline transition duration-300 ease-in-out">Connectez vous</a></span>
                </div>
            </form>
        </div>
    )

}

// var Logo = document.getElementById("logo_inscription");
// if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//     document.getElementById("logo_inscription").setAttribute('src', '{logo_dark}');
//     console.log("yo les copains");
// } else {
//     document.getElementById("logo_inscription").setAttribute('src', '{logo}');
//     console.log("yesss");
// }

export default FormSignup
