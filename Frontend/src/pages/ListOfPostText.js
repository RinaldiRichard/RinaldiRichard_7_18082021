import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {
  const [listOfPostsText, setListOfPostsText] = useState([]);

  const { authState } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/poststext", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          setListOfPostsText(response.data);
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
        <Link to="/createposttext">Poster un message</Link>
      </div>
      <div className="d-flex flex-column-reverse">
        {listOfPostsText.map((value, key) => {
          return (
            <div key={key} className="divPost">
              <div
                className="post"
                onClick={() => {
                  history.push(`/postText/${value.id}`);
                }}
              >
                <div className="title">{value.title}</div>
                <div className="body">{value.description}</div>
              </div>
              <div className="footer">
                <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
