import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

import { Link } from "react-router-dom";

export default function Home() {
  const { authState } = useContext(AuthContext);

  return (
    <div className="w-100">
      <h2 className="text-center mt-5">
        Bonjour{" "}
        <Link
          to={`/profile/${authState.id}`}
          className="m-0"
          style={{ color: "rgb(159,232,85)" }}
        >
          {authState.username}
        </Link>{" "}
        !
      </h2>
      <p className="text-center">
        Bienvenue sur l'application de tchat de Groupomania !
      </p>
      <div className="d-flex justify-content-evenly mt-5 px-5">
        <div>
          <p>
            Vous voulez accéder aux articles avec images?{" "}
            <Link to="/postimage">Par ici !</Link>
          </p>
        </div>
        <div>
          <p>
            Pour les messages simples,{" "}
            <Link to="/posttext">c'est là !</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
