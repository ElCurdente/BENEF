// import React from 'react':
import FormSignup from './FormSignup'
import FormSuccess from './FormSuccess'
import React, {useState } from "react";


const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
  
  
  function submitForm() {
      setIsSubmitted(true);
  }
  
    return (
        <div>
            {!isSubmitted ? <FormSignup submitForm={submitForm} /> : <FormSuccess/>}
        </div>
    )
}

export default Form
