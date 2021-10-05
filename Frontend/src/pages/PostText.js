import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  let history = useHistory();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/postsText/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          //envoie du token d'acces par le header pour controler l'authentification
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert("Merci d'être logué pour poster un commentaire");
          history.push("/login");
        } else {
          const commentToAdd = {
            // Affichage du commentaire lors de l'envoie
            commentBody: newComment,
            // Affichage du username actuellement logué lors de l'envoie du commentaire
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
          document.location.href = `/postText/${id}`;
        }
      });
  };
  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setComments(
          comments.filter((value) => {
            return value.id !== id;
          })
        );
      });
  };

  const deletePost = () => {
    axios
      .delete(`http://localhost:3001/postsText/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        history.push("/");
      });
  };

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Entrer un nouveau titre");
      axios.put(
        "http://localhost:3001/postsText/title",
        {
          newTitle,
          id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      setPostObject({ ...postObject, title: newTitle });
    } else {
      let newText = prompt("Entrer un nouveau texte");
      axios.put(
        "http://localhost:3001/postsText/description",
        {
          newText,
          id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      setPostObject({ ...postObject, description: newText });
    }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div
            className="title p-1"
            onClick={() => {
              if (
                authState.username === postObject.username ||
                authState.id === 1
              ) {
                editPost("title");
              }
            }}
          >
            {postObject.title}
          </div>
          <div
            className="body p-2"
            onClick={() => {
              if (
                authState.username === postObject.username ||
                authState.id === 1
              ) {
                editPost("description");
              }
            }}
          >
            <div className="body">{postObject.description}</div>
          </div>
          <div className="footer d-flex justify-content-between p-1">
            {postObject.username}
            {(authState.username === postObject.username ||
              authState.id === 1) && (
              <button
                onClick={deletePost}
                style={{
                  width: "fit-content",
                  height: "fit-content",
                  borderRadius: "10px",
                }}
              >
                Supprimer
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Votre commentaire..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button className="btn p-0" onClick={addComment}>
            {" "}
            Ajouter un commentaire
          </button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <div style={{ textAlign: "right" }}>
                  <label>{comment.username}</label>
                  {/*Si username authentifié =  username du commentaire ou si admin*/}
                  {(authState.username === comment.username ||
                    authState.id === 1) && (
                    <button
                      style={{
                        width: "25px",
                        height: "fit-content",
                        marginLeft: "1em",
                      }}
                      //on passe l'id pour ce commentaire spécifiquement
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
