import React, { useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router";
import { AuthContext } from "../helpers/AuthContext";

export default function CreatePost() {

  const { authState } = useContext(AuthContext);
  let history = useHistory();

  const initialValues = {
    title: "",
    description: "",
  };
  useEffect(() => {
    if (!localStorage.getItem("accessToken") || (!authState.status) ){
      history.push("/login");
    }
  }, []);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Un titre est requis"),
    description: Yup.string().required(
      "merci de ne pas envoyer de message vide !"
    ),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/poststext", data, {
        //envoie du token d'acces par le header pour controler l'authentification
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        history.goBack();
      });
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Titre : </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputTextTitle"
            name="title"
            placeholder="Titre"
          />
          <label>Description : </label>
          <ErrorMessage name="description" component="span" />
          <Field
            autoComplete="off"
            id="inputTextDescription"
            name="description"
            placeholder="Ecrivez votre message ici"
          />
          <button type="submit">Envoyer</button>
        </Form>
      </Formik>

    </div>
  );
}
