import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Comment from '../components/Comment'

export default function Home(props) {
  return (
    <div className="container px-4 py-5">
      <h1 className="text-center">Bienvenue !</h1>
      <p className="text-center">Voici ce que vous avez peut-être manqué</p>
      <div className="text-center mt-4">
        {props.post.map((post) => (
          <div key={uuidv4()} className="col-12 mt-4 ms-auto me-auto w-90" style={{maxWidth: 550 }}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.slice(0, 50) + "..."}</p>
                <Link href={`/${post.id.toString()}`}>
                  <a className="card-link">Afficher</a>
                </Link>
                <Comment/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const post = await data.json();
  return {
    props: {
      post,
    },
  };
}
