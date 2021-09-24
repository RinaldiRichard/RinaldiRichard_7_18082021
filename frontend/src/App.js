import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Post from "./pages/Post";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./pages/Profile";
import Error404 from './pages/Error404'
import ChangePassword from "./pages/ChangePassword";
import Users from "./pages/Users";

function App() {
  // authState init a false pour afficher toute la navbar si pas connecté
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  //Si accessToken dans le storage, ca passe authState à true pour relog + ne pas afficher toute la navbar
  //Permet d'empecher un fake token grace au endpoint dans routes/users
  useEffect(() => {
    axios
      .get("http://localhost:3001/users/authvalidate", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            //Destructuring pour ne changer que l'info status
            ...authState,
            status: false,
          });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          console.log(response.data);
        }
      });
  }, []);

  const logout = () => {
    localStorage.clear();
    setAuthState({ username: "", id: 0, status: false });
    document.location.href = "/login";
  };
  
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            {/* Si le state change dans le composant de la page Login, il affectera l'info ici */}
            {!authState.status ? (
              <>
                <Link to="/login">Log-in</Link>
                <Link to="/signup">Sign-up</Link>
              </>
            ) : (
              <>
                <Link to="/">Accueil</Link>
                <Link to="/createpost">Ecrire un message</Link>
                
                <button onClick={logout}> Déconnexion </button>
              </>
            )}
            {authState.id === 1 &&(
              <Link to="/users">
              Liste des utilisateurs
              </Link>
            )}
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/users" exact component={Users} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/changepassword" exact component={ChangePassword} />
            <Route path="*" exact component={Error404} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
