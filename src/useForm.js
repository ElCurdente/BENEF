import { useState, useEffect } from 'react';
import {AES}from 'crypto-js';



const useForm = (callback, validate) => {
  
  //Valeurs du formulaire d'inscription à envoyer au serveur

  const [values, setValues] = useState({
    username:'',
    email:"",
    birth:"",
    postal:"",
    mdp:"",
    mdpV:"",
    showPassword: false,
    showPassword2: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorDoublon, setErrorDoublon] = useState(false);
  const [errorsConnexion, setErrorsConnexion] = useState({
    emptyUsername : false,
    emptyPassword : false,
    wrongEntries : false,
  });

  const [valuesConnexion, setValuesConnexion] = useState({
    username:'',
    mdp:"",
    showPassword: false,
  });

  const [stayConnected, setStayConnected] = useState(false);

  const handleStayConnected = () => {
    setStayConnected(!stayConnected);
  }
  
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleChangeCo = e => {
    const { name, value } = e.target;
    setValuesConnexion({
      ...valuesConnexion,
      [name]: value
    });
  };

  

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };


  const handleClickShowPassword2 = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
};

// Script pour vérifier la connexion

const handleSubmitConnexion = e => {
  e.preventDefault();
  setErrors(validate(values));
  setIsSubmitting(true);
fetch('https://benef-app.fr/api-connexion.php', {
method: "POST",
headers: {
  'Accept' : 'application/json',
  'Content-Type' : 'application/json'
},
body: JSON.stringify(valuesConnexion)
})
.then((response) => response.json())
.then((data) => {

  // Cryptage de l'id_user pour le stocker ensuite dans le storage, afin que l'utilisateur ne puisse pas le manipuler

  const envryptedString = AES.encrypt(data.id_user,'MYKEY4DEMO');

 // Stockage de l'id_user crypté dans le storage, dans le local ou le session selon s'il veut rester connecté ou non.

 if(stayConnected){
  localStorage.setItem('id_user', envryptedString.toString());
  localStorage.setItem("isConnected", true)
 }else{
  sessionStorage.setItem('id_user', envryptedString.toString());
  sessionStorage.setItem("isConnected", true)
 }
//   console.log("oui il est bien connecté là")
  window.location.reload();
//   console.log(stayConnected)
// }
})
.catch(err => {
console.log("Error Reading data " + err);
setErrorsConnexion({
  ...errorsConnexion,
    wrongEntries : true
});
});
};

  // Script d'inscription. Se lance seulement si toutes les conditions (disponibles dans validateInfo) ont été vérifiées et que l'utilisateur appuye sur le bouton submit

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback && callback();      
      fetch('https://benef-app.fr/api.php', {
        method: "POST",
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(values)
      
      })
      .then((response) => response.json())
      .then((result) => {
        if(result.doublon === true){
          console.log("Utilisateur doublon");
          setErrorDoublon(true)
        }else{
          fetch('https://benef-app.fr/api-connexion.php', {
            method: "POST",
            headers: {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(values)
            })
            .then((response) => response.json())
            .then((data) => {
              sessionStorage.setItem("isConnected", true);
              const envryptedString = AES.encrypt(data.id_user,'MYKEY4DEMO');
              sessionStorage.setItem('id_user', envryptedString.toString());
              window.location.reload();
          })
        } 
      }).catch(err => {
        console.log("Error Reading data " + err);
      });
      }
    },
    [errors]
  );

  return {handleChange,handleClickShowPassword,handleClickShowPassword2,handleMouseDownPassword, handleSubmit, handleSubmitConnexion, handleChangeCo, values, valuesConnexion, errors, errorsConnexion, errorDoublon, handleStayConnected, stayConnected};
};

export default useForm ;

