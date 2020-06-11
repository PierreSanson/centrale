import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


const SuggestionPage = (props) => {
  const [films, setFilms] = useState([]);
  const user = props.user;

  const fetchSuggestions = async () => {
    const response = await fetch("", {
      method: "post",
      body: JSON.stringify(user.uuid)
    });
    const responseJson = await response.json();
    setFilms(responseJson);
  }

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="FilmList">
      <div className="FilmList-header">
        <div>
          Vos recommendations
        </div>

        {films
          .map((film) => (
            <Link
              to={`/films/${film.uuid}`}
              key={film.uuid}
              className="FilmList-filmlink"
            >
              {film.uuid}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SuggestionPage;