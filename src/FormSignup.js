import React from 'react'
import useForm from './useForm'
import validate from './validateInfo'
import './Form.css';
import logo from './images/logo/logo_benef.png'

function Afficher() {
    var input = document.getElementById("mdp");
    if (input.type === "password") {
        input.type = "text";
    }
    else {
        input.type = "password";
    }
}

const FormSignup = ({ submitForm }) => {
    const { handleChange, values, handleSubmit, errors } = useForm(submitForm, validate);

    return (
        <div className="w-96">
            <div className="flex justify-center items-center">
                <img src={logo} alt="Logo" className="w-64" />
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="flex justify-center items-center">
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
                    {errors.username && <p>{errors.username}</p>}
                </div>

                <div className="flex justify-center items-center">
                    <label htmlFor="birth" className="form-label">
                    </label>
                    <input id="birth"
                        type="date"
                        name="birth"
                        placeholder="Date de naissance"
                        className=" bg-transparent border-b-2 w-4/5 my-2 h-12 text-left text-white-150  focus:outline-none pt-5 focus:placeholder-transparent"
                        s={values.birth}
                        onChange={handleChange} />
                    {errors.birth && <p>{errors.birth}</p>}
                </div>

                <div className="flex justify-center items-center">
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
                    {errors.postal && <p>{errors.postal}</p>}
                </div>

                <div className="flex justify-center items-center">
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
                    {errors.email && <p>{errors.email}</p>}
                </div>

                <div className="flex relative justify-center items-center">
                    <label htmlFor="mdp" className="form-label">
                    </label>

                    <input id="mdp"
                        type="password"
                        name="mdp"
                        maxLength="30"
                        placeholder="Mot de passe"
                        className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 text-left focus:outline-none pt-5 focus:placeholder-transparent"
                        value={values.mdp}
                        onChange={handleChange} />
                    {errors.mdp && <p>{errors.mdp}</p>}
                    <input
                        type="checkbox"
                        onClick="Afficher()"
                        className="absolute right-10" />
                </div>

                <div className="flex relative justify-center items-center">
                    <label htmlFor="mdpV" className="form-label">
                    </label>

                    <input id="mdpV"
                        type="password"
                        name="mdpV"
                        maxLength="30"
                        placeholder="Confirmation du mot de passe"
                        className="placeholder-white-150 text-white-150 border-b-2 bg-transparent w-4/5 my-2 h-12 text-left focus:outline-none pt-5 focus:placeholder-transparent"
                        value={values.mdpV}
                        onChange={handleChange} />
                    {errors.mdpV && <p>{errors.mdpV}</p>}
                    <input
                        type="checkbox"
                        onClick="Afficher()"
                        className="absolute right-10" />
                </div>
                <div className="flex justify-center items-center my-5">
                    <button className="block bg-red-650 hover:bg-white-150 hover:text-red-650 h-12 w-40 text-white-150 rounded-full transition duration-300 ease-in-out mt-5" type="submit">S'inscrire</button>
                </div>
                <div className="flex justify-center items-center">
                    <span className="text-white-150">Déjà inscrit ? <a href="https://giphy.com/gifs/afv-funny-fail-kid-xTiTncVep2khPGhK1i" target="_blank" className="hover:underline ">Connectez vous</a></span>
                </div>
            </form>
        </div>
    )

}

export default FormSignup
