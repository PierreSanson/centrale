import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const FilmList = () => {
  const [search, setSearch] = useState("");
  const [films, setFilms] = useState([]);

  const fetchFilmList = async () => {
    const response = await fetch("https://mev5r38l16.execute-api.eu-west-1.amazonaws.com/dev/movies");
    const responseJson = await response.json();
    setFilms(responseJson);
    console.log(films)
  }

  useEffect(() => {
    fetchFilmList();
  }, []);

  return (
    <div className="FilmList content">
      <div className="FilmList-header">
        <div>
          Liste des films
        </div>
        <input
          className="search-bar"
          value={search}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />

        {films
          .filter((film) => film.uuid.indexOf(search) !== -1)
          .sort((a, b) => a.uuid - b.uuid)
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

export default FilmList;