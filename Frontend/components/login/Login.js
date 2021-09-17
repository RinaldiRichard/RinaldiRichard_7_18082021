import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/dist/client/link";


export default function App  ()  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  // login the user
  const handleSubmit = async e => {
    e.preventDefault();
    const user = { username, password };
    // send the username and password to the server
    const response = await axios.post(
      "http://localhost:8080/api/users/login",
      user
    );
    // set the state of the user
    setUser(response.data);
    // store the user in LS
    localStorage.setItem("user", JSON.stringify(response.data.username));
    console.log(response.data.token);
  };

  // if a user in LS 
  if (user) {
     setTimeout(() => {
        document.location.href="/blog"
    }, 2000);
    return (
      <div className="text-center mt-5 min-vw-100 min-vh-100 d-flex justify-content-center align-items-center pb-5">
        <h2>Connexion en cours..</h2>
      </div>
    );
   
  }

  // if no user in LS, go to /login
  return (
    <div className="text-center d-flex flex-column">
      <img src="/icon-left-font.png" className="w-25 align-self-center" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
        className="m-3"
          type="text"
          value={username}
          placeholder="enter a username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <div>
          <label htmlFor="password">password : </label>
          <input
          className="m-3"
            type="password"
            value={password}
            placeholder="enter a password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" className="mt-4 mb-3">Connexion</button>
        <div>

      <Link href="/signup">
        <a>Pas encore membre? Cliquez ici</a>
      </Link>
        </div>
      </form>
    </div>
  );
};