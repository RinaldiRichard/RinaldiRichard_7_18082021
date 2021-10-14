import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h1 className="m-5">Page Not Found ... :'(</h1>
      <h3 className="m-5">
        Retourner à l'<Link to="/">Accueil</Link>
      </h3>
    </div>
  );
}

export default PageNotFound;
