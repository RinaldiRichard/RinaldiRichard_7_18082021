import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [largeur, setLargeur] = useState(window.innerWidth);

  const logout = () => {
    localStorage.clear();
    document.location.href = "/login";
  };
  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setLargeur(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);
  const goPostImage = () => {
    document.location.href = "/postimage";
  };
  const goHome = () => {
    document.location.href = "/";
  };
  const goPostText = () => {
    document.location.href = "/posttext";
  };
  const goUserList = () => {
    document.location.href = "/users";
  };
  return (
    <div className="navBar">
      <nav>
        {(toggleMenu || largeur > 750) && (
          <ul className="listeNav">
            <Link className="item" to="/" onClick={goHome}>
              Accueil
            </Link>
            <Link className="item" to="/postimage" onClick={goPostImage}>
              Messages multimédia
            </Link>
            <Link className="item" to="/posttext" onClick={goPostText}>
              Messages texte
            </Link>
            <Link className="item" to="/users" onClick={goUserList}>
              Liste des utilisateurs
            </Link>
            <button
              style={{ height: "fit-content" }}
              className="m-2"
              onClick={logout}
            >
              {" "}
              Déconnexion{" "}
            </button>
          </ul>
        )}
        <div className="btnNav">
          <button style={{ color: "rgb(255,255,255" }} onClick={toggleNav}>
            Menu
          </button>
        </div>
      </nav>
    </div>
  );
}
