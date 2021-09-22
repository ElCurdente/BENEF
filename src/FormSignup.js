import React from 'react'
import useForm from './useForm'
import validate from './validateInfo'
import './Form.css';

const FormSignup = ({submitForm}) => {
const {handleChange, values, handleSubmit, errors} = useForm(submitForm, validate);

    return (
        <div className="form-content-right">

            <form className="form" onSubmit={handleSubmit}>
                <div className="form-inputs">
                    <label htmlFor="username" className="form-label">  
                    </label>

                    <input id="username" 
                    type="text" 
                    name="username" 
                    placeholder="Nom d'utilisateur" className="form-input"
                    value={values.username}
                    onChange={handleChange}
                    />
                    {errors.username && <p>{errors.username}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="birth" className="form-label"> 
                    </label> 
                    <input id="birth" 
                    type="date" 
                    name="birth" 
                    placeholder="Date de naissance" 
                    className="form-input"
                    s={values.birth}
                    onChange={handleChange}/>
                    {errors.birth && <p>{errors.birth}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="postal" className="form-label">  
                    </label>

                    <input id="postal" 
                    type="number" 
                    name="postal" 
                    placeholder="Code postal" 
                    className="form-input"
                    value={values.postal}
                    onChange={handleChange}/>
                    {errors.postal && <p>{errors.postal}</p>}
                </div>
                
                <div className="form-inputs">
                    <label htmlFor="email" className="form-label">  
                    </label>

                    <input id="email" 
                    type="email" 
                    name="email" 
                    placeholder="Adresse Email" 
                    className="form-input"
                    value={values.email}
                    onChange={handleChange}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                
                <div className="form-inputs">
                    <label htmlFor="mdp" className="form-label"> 
                    </label>
 
                    <input id="mdp" 
                    type="password" 
                    name="mdp" 
                    placeholder="Mot de passe" 
                    className="form-input"
                    value={values.mdp}
                    onChange={handleChange}/>
                    {errors.mdp && <p>{errors.mdp}</p>}
                </div>
                
                <div className="form-inputs">
                    <label htmlFor="mdpV" className="form-label"> 
                    </label>
 
                    <input id="mdpV" 
                    type="password" 
                    name="mdpV" 
                    placeholder="Confirmation du mot de passe" 
                    className="form-input"
                    value={values.mdpV}
                    onChange={handleChange}/>
                    {errors.mdpV && <p>{errors.mdpV}</p>}
                </div>
                <button className="form-input-btn" type="submit">S'inscrire</button>
                <span className="form-input-login">Déjà inscrit ? <a href="#">Connectez vous</a></span>
            </form>
        </div>
    )
}

export default FormSignup
