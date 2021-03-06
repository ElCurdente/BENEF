// import React from 'react':
import FormSignup from './FormSignup'
import React, {useState} from "react";
import Accueil from './Accueil'

const Form = () => {
    

    const [isSubmitted, setIsSubmitted] = useState(false);

  
  function submitForm() {
      setIsSubmitted(true);
  }
  
    return (
        <div>
            {/* Affichage conditionnel*/}
            {!sessionStorage.getItem("isConnected") ? <FormSignup submitForm={submitForm} /> : (<Accueil />)}            
    
        </div>
    )
}

export default Form
