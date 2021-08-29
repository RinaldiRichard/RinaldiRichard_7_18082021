import Link from "next/dist/client/link";

export default function Container(props) {
  return (
    <>
          <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid justify-content-center">
        <Link href="/">
          <a className="navbar-brand mx-4">Accueil</a>
        </Link>
        <Link href="/utilisateurs">
          <a className="navbar-brand mx-4">Membres</a>
        </Link>
      </div>
    </nav>
      {props.children}
    </>
  );
}
