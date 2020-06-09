import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import FilmList from "./Pages/FilmList/FilmList";
import FilmPage from "./Pages/FilmPage/FilmPage";

const users = [
  {
    name: "Joséphine"
  },
  {
    name: "Pierre"
  },
  {
    name: "Victor"
  }
];


function App() {
  const [user, setUser] = useState("");

  const disconnect = () => {
    setUser("");
  };

  const updateUser = (e) => {
    setUser(e.target.value);
  };
  return (
    <Router>
      <div>
        <div>
          <Link to="/">Accueil</Link>
          <Link to="/films">Liste des films</Link>
          <select
            value={user}
            onChange={updateUser}>
            <option value="" disabled>--Choisir un utilisateur--</option>
            {users.map((item) => (
              <option
                key={item.name}
                value={item.name}>{item.name}</option>
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
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/films/:filmId" render={(props) => <FilmPage {...props} user={user} />} />
          <Route exact path="/films">
            <FilmList />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
