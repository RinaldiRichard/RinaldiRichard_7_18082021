import Link from "next/dist/client/link";

export default function Container(props) {
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <>
          <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid justify-content-evenly">
        <Link href="/blog/">
          <a className="navbar-brand mx-4">Accueil</a>
        </Link>
        <Link href="/users/">
          <a className="navbar-brand mx-4">Membres</a>
        </Link>
        <Link href="/users/profil">
          <a className="navbar-brand mx-4">Profil</a>
        </Link>
        <Link href="/">
          <a onClick={handleLogout} className="navbar-brand mx-4">Déconnexion</a>
        </Link>
      </div>
    </nav>
      {props.children}
    </>
  );
}
