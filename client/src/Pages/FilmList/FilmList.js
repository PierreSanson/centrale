import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./FilmList.css"

const FilmList = () => {
  const [search, setSearch] = useState("");
  const [films, setFilms] = useState([]);

  const fetchFilmList = async () => {
    const response = await fetch("https://mev5r38l16.execute-api.eu-west-1.amazonaws.com/dev/movies");
    const responseJson = await response.json();
    setFilms(responseJson);
    console.log("lesfilms")
    console.log(films)
  }

  useEffect(() => {
    fetchFilmList();
  }, []);

  return (
    <div className="content">
      <div className="filmlist-header">
        <div className="page-header">
          >Liste des films
        </div>
        <div className="search-bar">
          <div className="search-title">
            Recherche:
          </div>
          <input
            className="search-zone"
            value={search}
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="page-body">
          <div className="films-container">
            {films
              .filter((film) => film.uuid.indexOf(search) !== -1)
              .sort((a, b) => a.uuid - b.uuid)
              .map((film) => (
                <Link
                  to={`/films/${film.uuid}`}
                  key={film.uuid}
                  className="filmlink"
                >
                  <div className="film-box">
                    {film.uuid}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmList;