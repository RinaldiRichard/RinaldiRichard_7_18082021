import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { AuthContext } from "../helpers/AuthContext";

export default function CreatePost() {
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { authState } = useContext(AuthContext);
  console.log(image.name);
  const fileOnChange = (e) => {
    setImage(e.target.files[0]);
  };

  let history = useHistory();

  const titleOnChange = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };

  const descriptionOnChange = (e) => {
    setDescription(e.target.value);
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    if (image.name === undefined) {
      alert(
        "Si vous ne voulez pas mettre d'image, une section pour les messages texte est prévue"
      );
      document.location.href = "http://localhost:3000/createposttext";
    } else {
      axios
        .post("http://localhost:3001/posts/", formData, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          console.log(res);
          history.push("/postimage");
        })
        .catch((err) => {
          console.log("efefefegf");
          console.error(err);
        });
    }
  };

  useEffect(() => {
    if (!authState.status) {
      history.push("/login");
    }
  }, []);
  return (
    <>
      <div className="createPostPage flex-row">
        <form className="formContainer" onSubmit={onSubmit}>
          <label htmlFor="title">Titre : </label>
          <input
            type="text"
            id="title"
            name="title"
            autoComplete="off"
            onChange={titleOnChange}
          />
          <br />
          <label htmlFor="description">Description : </label>
          <input
            onChange={descriptionOnChange}
            type="text"
            id="description"
            name="description"
            autoComplete="off"
          />
          <br />
          <input type="file" onChange={fileOnChange} name="image" />
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </>
  );
}
