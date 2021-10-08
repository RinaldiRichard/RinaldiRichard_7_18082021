import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  let history = useHistory();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/basicinfo/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        setEmail(response.data.email);
      });
    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
  const deleteAccount = () => {
    if (window.confirm("Etes-vous sûr de vouloir supprimer votre compte?")) {
      axios
        .delete(`http://localhost:3001/users/${id}`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then(() => {
          alert("Le compte a été supprimé");
          if (authState.id !== 1) {
            document.location.href = "/signup";
            localStorage.clear();
          } else {
            history.push("/");
          }
        });
    } else {
      alert("Merci de rester parmis nous !");
    }
  };
  console.log(email);
  return (
    <div className="profilPageContainer">
      <div className="basicInfo">
        <h3 className="m-auto mt-4 text-center">Username : {username} </h3>
        <h4 className="mt-3 ">Adresse mail : {email} </h4>
        <div>
          {authState.username === username && (
            <div className="d-flex flex-column align-items-center">
              <button
                className="m-3"
                onClick={() => {
                  history.push("/changepassword");
                }}
              >
                Changer de mot de passe
              </button>
            </div>
          )}
          {(authState.username === username || authState.id === 1) && (
            <div className="d-flex flex-column align-items-center m-">
              <button className="m-3" onClick={deleteAccount}>
                Supprimer le compte
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="divPost">
              <div
                className="post"
                onClick={() => {
                  history.push(`/post/${value.id}`);
                }}
              >
                <div className="title" style={{backgroundColor:"#464646"}}>{value.title}</div>
                <div className="attachment">
                  <img src={value.imageUrl} alt="" />
                </div>
                <div className="body px-2">{value.description}</div>
                <div className="footer" style={{backgroundColor:"#464646"}}>{value.username}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
