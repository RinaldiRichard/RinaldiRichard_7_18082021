import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  let history = useHistory();

  const changepassword = () => {
    axios
      .put(
        "http://localhost:3001/users/changepassword",
        { oldPassword: oldPassword, newPassword: newPassword },
        {
          //envoie du token d'acces par le header pour controler l'authentification
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert("AAAAAAAh!"); // A changer....
        } else {
          alert("mot de passe modifié !");
          history.push("/");
        }
      });
  };
  return (
    <div className="d-flex flex-column m-3 align-items-center">
      Changer de mot de passe :
      <input
        className="m-3"
        type="text"
        placeholder="Ancien mot de passe"
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      />
      <input
        className="m-3"
        type="text"
        placeholder="Nouveau mot de passe"
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <button onClick={changepassword} className="m-3">
        Sauvegarder
      </button>
    </div>
  );
}

export default ChangePassword;
