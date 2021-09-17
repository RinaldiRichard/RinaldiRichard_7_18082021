import { useState } from "react";
import axios from "axios";
import Link from "next/dist/client/link";

export default function Signup() {
  const url = "http://localhost:8080/api/users/signup";
  const [data, setData] = useState({
    nom: "",
    prenom: "",
    username: "",
    email: "",
    password: "",
  });
  function submit(e) {
    e.preventDefault();
    axios
      .post(url, {
        nom: data.nom,
        prenom: data.prenom,
        username: data.username,
        email: data.email,
        password: data.password,
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

  return (
    <div className="text-center d-flex flex-column">
       <img src="/icon-left-font.png" className="w-25 align-self-center" />
      <form
        className="text-center d-flex flex-column"
        onSubmit={(e) => {
          submit(e);
        }}
      >
        <label htmlFor="Nom">
          <input
            className="mb-2"
            onChange={(e) => {
              handle(e);
            }}
            name="Nom"
            value={data.nom}
            type="text"
            placeholder="nom"
            id="nom"
          />
        </label>
        <label htmlFor="Prenom">
          <input
            className="mt-3 mb-2"
            onChange={(e) => {
              handle(e);
            }}
            name="Prenom"
            value={data.prenom}
            type="text"
            placeholder="prenom"
            id="prenom"
          />
        </label>
        <label htmlFor="Username">
          <input
            className="mt-3 mb-2"
            onChange={(e) => {
              handle(e);
            }}
            value={data.username}
            type="text"
            name="Username"
            placeholder="username"
            id="username"
          />
        </label>
        <label htmlFor="Email">
          <input
            className="mt-3 mb-2"
            onChange={(e) => {
              handle(e);
            }}
            name="Email"
            value={data.email}
            type="text"
            placeholder="email"
            id="email"
          />
        </label>
        <label htmlFor="Password">
          <input
            className="mt-3 mb-2"
            onChange={(e) => {
              handle(e);
            }}
            name="Password"
            value={data.password}
            type="text"
            placeholder="password"
            id="password"
          />
        </label>
        <button className="mt-3 mb-2 w-10 align-self-center">Inscription</button>
      <Link href="/">
        <a className="mt-3 ">Déjà enregistré? Cliquez ici</a>
      </Link>
      </form>
    </div>
  );
}

// import Link from "next/link";

// export default function Login() {
//   return (
//     <>
//       <div className="text-center d-flex flex-column">
//         <div className="d-flex flex-column align-self-center">
//           <div>{/* image logo pour login a mettre ici */}</div>
//           <div className="mt-5">
//             <div className="form-group justify-content-around row">
//               <label htmlFor="username" className="col-sm-6 col-form-label">
//                 Username
//               </label>
//               <div className="col-sm-6">
//                 <input type="text" className="form-control m-2" id="username" />
//               </div>
//             </div>
//             <div className="form-group justify-content-around row">
//               <label htmlFor="password" className="col-sm-6 col-form-label">
//                 Password
//               </label>
//               <div className="col-sm-6">
//                 <input type="text" className="form-control m-2" id="pasword" />
//               </div>
//             </div>
//           </div>
//           <Link href="/">
//             <a className="mt-3">Pas encore enregistré? Suivez ce lien</a>
//           </Link>
//         </div>
//         <div className="footer">
//           <div>
//             <Link href="/blog">
//               <button className="btn mt-3" type="button">
//                 Login
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
