import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import FilmList from "./Pages/FilmList/FilmList";
import FilmPage from "./Pages/FilmPage/FilmPage";
import FilmSearch from "./Pages/FilmSearch/FilmSearch";
import SuggestionPage from "./Pages/SuggestionPage/SuggestionPage";
import "./App.css"

function App() {
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState([]);

  const fetchUsersList = async () => {
    const response = await fetch("https://k90b21t2k0.execute-api.eu-west-1.amazonaws.com/dev/users");
    const responseJson = await response.json();
    console.log("fetchUsersList");
    console.log(responseJson);
    setUsersList(responseJson);
    if (user) {
      setUser(responseJson.find((u) => u.uuid === user.uuid));
    }
  }

  useEffect(() => {
    fetchUsersList();
  }, []);

  const disconnect = () => {
    setUser(null);
  };

  const updateUser = (uuid) => {
    console.log("update User");
    console.log(usersList.find((u) => u.uuid === uuid));
    setUser(usersList.find((u) => u.uuid === uuid));
  };

  const updateNote = async (movieID, rating) => {
    await fetch("https://k90b21t2k0.execute-api.eu-west-1.amazonaws.com/dev/users", {
      method: "put",
      body: JSON.stringify({
        userID: user.uuid,
        movieID,
        rating
      })
    });
    fetchUsersList();
  }

  return (
    <Router>
      <div>
        <div className="header">
          <marquee className="header-title" scrollamount="10" behavior="alternate">
            Le gros site
          </marquee>
          <div className="links-container">
            <Link className="page-link" to="/">Accueil</Link>
            <Link className="page-link" to="/films">Liste des films</Link>
            <Link className="page-link" to="/searchandadd">Recherche films</Link>
            {user ? <Link className="page-link" to="/recommendations">Mes recommendations</Link> : null}
            <div>
              <select
                value={(user || { uuid: "" }).uuid}
                onChange={(e) => updateUser(e.target.value)}>
                <option value="" disabled>--Choisir un utilisateur--</option>
                {usersList.map((item) => (
                  <option
                    key={item.uuid}
                    value={item.uuid}>{item.uuid}</option>
                ))}
              </select>
              {user
                ? (<button
                  className="button-disconnect"
                  type="button"
                  onClick={disconnect} >
                  Se déconnecter
                </button>)
                : null
              }
            </div>
          </div>
        </div>

        <Switch>
          <Route exact path="/films/:filmId" render={(props) => <FilmPage {...props} user={user} updateNote={updateNote} />} />
          <Route exact path="/films" render={(props) => <FilmList {...props} />} />
          <Route exact path="/recommendations" render={(props) => <SuggestionPage {...props} user={user} />} />
          <Route exact path="/searchandadd">
            <FilmSearch />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
