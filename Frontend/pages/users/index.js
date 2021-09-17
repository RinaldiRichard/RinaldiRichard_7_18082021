import Link from "next/dist/client/link";
import { v4 as uuidv4 } from "uuid";
import Container from "../../components/Container";


export default function index(props) {
  console.log(props.users);
  return (
    <>
      <Container />
      <div className="container px-4 py-5">
        <h1 className="text-center">Liste des utilisateurs</h1>
        <div className="row justify-content-center mt-5">
          {props.users.map((user) => (
            <div key={uuidv4()} className="col-12 col-lg-6 m-2">
              <div className="card">
                <div className="card-body d-flex justify-content-between">
                  <h5 className="card-title">
                    {user.prenom} {user.nom}
                  </h5>
                  <Link href={`/users/${user.id}`}>
                    <a className="ml-auto card-link">Contacter</a>
                  </Link>
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
  const data = await fetch("http://localhost:8080/api/users");
  const users = await data.json();
  return {
    props: {
      users,
    },
  };
}
