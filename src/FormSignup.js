import React from 'react'
import useForm from './useForm'
import validate from './validateInfo'
import './Form.css';
import logo from './images/logo/logo_benef.png'

const FormSignup = ({submitForm}) => {
const {handleChange, values, handleSubmit, errors} = useForm(submitForm, validate);

    return (
        <div className="w-96">
            <div className="flex justify-center items-center">
                <img src={logo} alt="Logo" className="w-64"/>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="flex justify-center items-center">
                    <label htmlFor="username" className="">  
                    </label>

                    <input id="username" 
                    type="text" 
                    name="username" 
                    placeholder="Nom d'utilisateur" className="placeholder-red-550 bg-white-150 rounded-full w-4/5 my-2 h-12 text-center"
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
                    className=" bg-white-150 rounded-full w-4/5 my-2 h-12 text-center"
                    s={values.birth}
                    onChange={handleChange}/>
                    {errors.birth && <p>{errors.birth}</p>}
                </div>

                <div className="flex justify-center items-center">
                    <label htmlFor="postal" className="form-label">  
                    </label>

                    <input id="postal" 
                    type="number" 
                    name="postal" 
                    placeholder="Code postal" 
                    className="placeholder-red-550 bg-white-150 rounded-full w-4/5 my-2 h-12 text-center"
                    value={values.postal}
                    onChange={handleChange}/>
                    {errors.postal && <p>{errors.postal}</p>}
                </div>
                
                <div className="flex justify-center items-center">
                    <label htmlFor="email" className="form-label">  
                    </label>

                    <input id="email" 
                    type="email" 
                    name="email" 
                    placeholder="Adresse Email" 
                    className="placeholder-red-550 bg-white-150 rounded-full w-4/5 my-2 h-12 text-center"
                    value={values.email}
                    onChange={handleChange}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                
                <div className="flex justify-center items-center">
                    <label htmlFor="mdp" className="form-label"> 
                    </label>
 
                    <input id="mdp" 
                    type="password" 
                    name="mdp" 
                    placeholder="Mot de passe" 
                    className="placeholder-red-550 bg-white-150 rounded-full w-4/5 my-2 h-12 text-center"
                    value={values.mdp}
                    onChange={handleChange}/>
                    {errors.mdp && <p>{errors.mdp}</p>}
                </div>
                
                <div className="flex justify-center items-center">
                    <label htmlFor="mdpV" className="form-label"> 
                    </label>
 
                    <input id="mdpV" 
                    type="password" 
                    name="mdpV" 
                    placeholder="Confirmation du mot de passe" 
                    className="placeholder-red-550 bg-white-150 rounded-full w-4/5 my-2 h-12 text-center"
                    value={values.mdpV}
                    onChange={handleChange}/>
                    {errors.mdpV && <p>{errors.mdpV}</p>}
                </div>
                <div className="flex justify-center items-center my-5">
                    <button className="block bg-red-650 hover:bg-red-700 h-12 w-40 text-white-150 rounded-full" type="submit">S'inscrire</button> 
                </div>
                <div className="flex justify-center items-center">
                    <span className="text-white-150">Déjà inscrit ? <a href="#" className="hover:underline">Connectez vous</a></span>
                </div>
            </form>
        </div>
    )
}

export default FormSignup
