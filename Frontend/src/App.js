import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import CreatePostText from "./pages/CreatePostText";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Post from "./pages/Post";
import PostText from "./pages/PostText";
import ListOfPostText from "./pages/ListOfPostText";
import ListOfPostImage from "./pages/ListOfPostsImage";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";
import ChangePassword from "./pages/ChangePassword";
import Users from "./pages/UsersListAdmin";
import Navbar from "./Components/Navbar";

function App() {
  // authState status init a false pour afficher toute la navbar si pas logué
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  //Si accessToken dans le storage, ca passe authState à true pour relog + ne pas afficher toute la navbar
  useEffect(() => {
    axios
      //Permet d'empecher un fake token grace au endpoint dans routes/users
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


  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            {/* Si le state change dans le composant de la page Login, il affectera l'info ici */}
            {!authState.status ? (
              <>
                <Link to="/login">Connexion</Link>
                <Link to="/signup">S'enregistrer</Link>
              </>
            ) : (
              <>
              <Navbar/>
              </>
            )}
            
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/postimage" exact component={ListOfPostImage} />
            <Route path="/createposttext" exact component={CreatePostText} />
            <Route path="/posttext" exact component={ListOfPostText} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/posttext/:id" exact component={PostText} />
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
