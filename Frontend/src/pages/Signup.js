import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useHistory} from "react-router-dom"

function Signup() {
  let history = useHistory();
  const initialValues = {
    username: "",
    email:"",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .max(15)
      .required("Votre pseudo ou username est obligatoire"), //3 caractères min et 15 max
    password: Yup.string().min(4).max(20).required("Mot de passe requis"),
    email: Yup.string().email().required("Adresse mail obligatoire"),
  });

  const onSubmit = (data) => {
    
    axios.post("http://localhost:3001/users", data).then(() => {
      console.log("Utilisateur enregistré");
      alert("Merci pour votre enregistrement !")
      history.push('/login')
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username : </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="username"
          />
          <label>Email : </label>
          <ErrorMessage name="email" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="email"
            placeholder="email"
            
          />
          <label>Password : </label>
          <ErrorMessage name="password" component="span" />
          <Field
          type="password"
            autoComplete="off"
            id="inputCreatePost"
            name="password"
            placeholder="Password"
          />
          <button type="submit">S'enregistrer</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Signup;
