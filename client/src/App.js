import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import FilmList from "./Pages/FilmList/FilmList";
import FilmPage from "./Pages/FilmPage/FilmPage";
import FilmSearch from "./Pages/FilmSearch/FilmSearch";

const users = [
  {
    uuid: "Joséphine",
    user_ratings: { "Assassins (1995)": "4" }
  },
  {
    uuid: "Pierre",
    user_ratings: { "Assassins (1995)": "3" }
  },
  {
    uuid: "Victor",
    user_ratings: { "Assassins (1995)": "2" }
  }
];


function App() {
  const [user, setUser] = useState(null);

  const disconnect = () => {
    console.log("disconnect")
    setUser(null);
  };

  const updateUser = (e) => {
    console.log("updateuser")
    setUser(users.find((u) => u.uuid === e.target.value));
  };
  return (
    <Router>
      <div>
        <div>
          <Link to="/">Accueil</Link>
          <Link to="/films">Liste des films</Link>
          <Link to="/demo">Recherche films</Link>
          <select
            value={(user || { uuid: "" }).uuid}
            onChange={updateUser}>
            <option value="" disabled>--Choisir un utilisateur--</option>
            {users.map((item) => (
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
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/films/:filmId" render={(props) => <FilmPage {...props} user={user} />} />
          <Route exact path="/films" render={(props) => <FilmList {...props} />} />
          {/* <Route exact path="/films">
            <FilmList />
          </Route> */}
          <Route exact path="/demo">
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
