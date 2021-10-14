import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  let history = useHistory();
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
    history.push("/postimage");
    setToggleMenu(!toggleMenu);
  };
  const goHome = () => {
    history.push("/");
    setToggleMenu(!toggleMenu);
  };
  const goPostText = () => {
    history.push("/posttext");
    setToggleMenu(!toggleMenu);
  };
  const goUserList = () => {
    history.push("/users");
    setToggleMenu(!toggleMenu);
  };
  return (
    <div className="navBar">
      <nav>
        {(toggleMenu || largeur > 750) && (
          <ul className="listeNav">
            <li className="item">
              <Link to="/" onClick={goHome}>
                Accueil
              </Link>
            </li>
            <li className="item">
              <Link to="/postimage" onClick={goPostImage}>
                Messages multimédia
              </Link>
            </li>
            <li className="item">
              <Link to="/posttext" onClick={goPostText}>
                Messages texte
              </Link>
            </li>
            <li className="item">
              <Link to="/users" onClick={goUserList}>
                Liste des utilisateurs
              </Link>
            </li>
            <button
              style={{ height: "fit-content" }}
              className="m-2"
              onClick={logout}
            >
              Déconnexion
            </button>
          </ul>
        )}
        <div className="btnNav">
          <button style={{ color: "rgb(0,0,0" }} onClick={toggleNav}>
            Menu
          </button>
        </div>
      </nav>
    </div>
  );
}
