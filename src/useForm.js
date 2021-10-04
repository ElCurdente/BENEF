import { useState, useEffect } from 'react';


const useForm = (callback, validate) => {
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


  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
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

  

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback && callback();
      }
    },
    [errors]
  );

  return { handleChange,handleClickShowPassword,handleClickShowPassword2,handleMouseDownPassword, handleSubmit, values, errors };
};

export default useForm;

