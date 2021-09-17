import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Comment from "../../components/Comment";
import Container from "../../components/Container";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Index(props) {
  console.log(props);
  const [user, setUser] = useState();
  

  const url = "http://localhost:8080/api/messages";
  const [data, setData] = useState({
    body: "",
  });
  function submit(e) {
    axios
      .post(url, {
        username: user,
        body: data.body,
      })
      .then((res) => {
        console.log(res.data);
      });
      
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
    
  }, []);
  
  return (
    <>
      <Container />
      <div className="container px-4 py-5">
        <h1 className="text-center">Bienvenue !</h1>
        <form
          className="text-center d-flex flex-column mt-5"
          onSubmit={(e) => {
            submit(e);
          }}
        >
          <label htmlFor="Body">
            <input
              style={{ width: "50%" }}
              className="mt-3 mb-2"
              onChange={(e) => {
                handle(e);
              }}
              name="Body"
              value={data.body}
              type="text"
              placeholder="Saisissez votre message"
              id="body"
            />
          </label>
          <label htmlFor="Image">
            <input type="file" />
          </label>
          <button className="mt-3 mb-2 w-10 align-self-center">Envoyer</button>
        </form>
        <p className="text-center">Voici ce que vous avez peut-être manqué</p>
        <div className="text-center mt-4 d-flex flex-column-reverse">
          {props.articles.map((article) => (
            <div
              key={uuidv4()}
              className="col-12 mt-4 ms-auto me-auto w-90"
              style={{ maxWidth: 550 }}
            >
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">
                    {article.body.slice(0, 20) + "..."}
                  </p>
                  <Link href={`/blog/${article.id.toString()}`}>
                    <a className="card-link">Afficher</a>
                  </Link>
                  <Comment />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const data = await fetch("http://localhost:8080/api/messages");
  const articles = await data.json();

  return {
    props: {
      articles,
    },
  };
}
