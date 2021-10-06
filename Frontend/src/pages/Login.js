import React, { useState, useContext } from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom'

// Permet de se passer l'info entre composant avec le context
import {AuthContext} from '../helpers/AuthContext'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const {setAuthState} = useContext(AuthContext)
  let history = useHistory()

  const login = () => {
    const data = { username: username, password: password, email: email };
    axios.post("http://localhost:3001/users/login", data).then((response) => {
      console.log(response.data);
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);

        // Passe le booléen a true pour l'affichage spec de la navbar
        setAuthState({ username: response.data.username, id:response.data.id, status:true})
        history.push('/')
      }
    });
  };

  return (
    <div className="d-flex flex-column m-5">
      <label htmlFor="username"> Username : </label>
      <input
        className="m-2"
        name="username"
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label htmlFor="email"> Email : </label>
      <input
        className="m-2"
        name="email"
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <label htmlFor="password">Password : </label>
      <input
        className="m-2"
        name="password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button className="m-5" onClick={login}>
        Connexion
      </button>
    </div>
  );
}

export default Login;
