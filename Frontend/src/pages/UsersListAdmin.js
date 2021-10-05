import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setListOfUsers(response.data);
      });
  }, []);
  console.log(listOfUsers);
  return (
    <>
      <div className="vw-100">
        {listOfUsers.map((value, key) => {
          return (
            <div
              key={key}
              className="m-4 d-flex align-items-center justify-content-center"
            >
              <h5 className="m-0">
                {value.username}, id : {value.id}
              </h5>
              <div className="mx-3 align-items-center justify-content-center">
                <Link to={`/profile/${value.id}`}>Profil</Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Users;
