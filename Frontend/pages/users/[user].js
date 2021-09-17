import Container from '../../components/Container'


export default function user(props) {
  console.log(props);
  return (
    <>
    <Container/>
    <div className="container px-4 pt-3">
      <h1 className="text-center mb-4">Prenom : {props.user.prenom}</h1>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-6">
          <div className="card pt-2">
            <div className="card-body">
              <h4 className="card-title">Username : {props.user.username}</h4>
              <ul className="list-group">
                <li className="list-group-item">Email : {props.user.email}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export async function getStaticProps(context) {
  const id = context.params.user;
  const data = await fetch(`http://localhost:8080/api/users/${id}`);
  const user = await data.json();

  return {
    props: {
      user,
    },
  };
}

export async function getStaticPaths() {
  const data = await fetch("http://localhost:8080/api/users");
  const users = await data.json();
  const paths = users.map((item) => ({
    params: { user: item.id.toString() },
  }));
  return {
     paths,
    fallback: false,
  };
}
