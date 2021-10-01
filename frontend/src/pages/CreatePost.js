import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router";


export default function CreatePost() {
  let formData = new FormData();
  
  let history = useHistory();

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      formData.append("image", e.target.files[0]);
    }
  };
  const initialValues = {
    title: "",
    description: "",
    image: "",
  };
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
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
      .post("http://localhost:3001/posts", data, {
        //envoie du token d'acces par le header pour controler l'authentification
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        history.push("/");
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
            id="inputCreatePost"
            name="title"
            placeholder="Titre"
          />
          <label>Description : </label>
          <ErrorMessage name="description" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="description"
            placeholder="Ecrivez votre message ici"
          />
          <Field
            type="text"
            id="inputCreatePost"
            name="image"
            onChange={onFileChange}
          />
          <button type="submit">Envoyer</button>
        </Form>
      </Formik>
      <form
       method="POST"
       action="http://localhost:3001/upload"
       encType="multipart/form-data"
      >
        <input type="file" name="image" />
        <button>uploader</button>
      </form> 
    </div>
  );
}

{
   
}
