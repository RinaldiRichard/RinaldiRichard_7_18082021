import React, { useEffect, useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router";

export default function CreatePost() {
  const [image, setImage] = useState([]);
  const [urlImage, setUrlImage]= useState("")

  //console.log(image);
  const fileOnChange = (e) => {
    setImage(e.target.files[0]);
  };

  let history = useHistory();

  const initialValues = {
    title: "",
    description: "",
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
    const formData = new FormData();
    formData.append("image", image);

    axios
      .post("http://localhost:3001/posts", data, {
        //envoie du token d'acces par le header pour controler l'authentification
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        history.push("/");
      });

    axios.post("http://localhost:3001/images", formData, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    .then((response)=> {
      console.log(response.data);
      console.log(response.config.url +"/"+response.data);
      // setUrlImage(response.config)
      // console.log(urlImage);
    })
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
          <button type="submit">Envoyer</button>
        </Form>
      </Formik>
      <form>
        <input type="file" onChange={fileOnChange} />
      </form>
    </div>
  );
}

{
  /* <form
       method="POST"
       action="http://localhost:3001/upload"
       encType="multipart/form-data"
      >
        <input type="file" name="image" />
        <button>uploader</button>
      </form>  */
}
