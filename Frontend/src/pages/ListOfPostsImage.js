import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          setListOfPosts(response.data);
        });
    }
  }, []);

  return (
    <div className="w-100">
      <h2 className="text-center mt-5">
        <Link
          to={`/profile/${authState.id}`}
          className="m-0"
          style={{ color: "rgb(159,232,85)" }}
        >
          {authState.username}
        </Link>{" "}
      </h2>
      <p className="text-center">Voici ce que vous avez peut-être manqué !</p>
      <div
        className="d-block mx-auto mt-5 btn"
        style={{ maxWidth: "fit-content" }}
      >
        <Link to="/createpost">Poster un message</Link>
      </div>
      <div className="d-flex flex-column-reverse">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="divPost">
              <div
                className="post"
                onClick={() => {
                  history.push(`/post/${value.id}`);
                }}
              >
                <div className="title">{value.title}</div>
                <div className="attachment">
                  <img src={value.imageUrl} alt="Image uploadée par l'utilisateur" />
                </div>
                <div className="body">{value.description}</div>
              <div className="footer">{value.username}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
