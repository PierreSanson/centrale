import React, { useState, useEffect } from "react";

const films2 = [
  {
    id: "StarWars (1977)",
  },
  {
    id: "Avengers (2019)",
  },
  {
    id: "Gérard Bouchard (2012)",
  }
];

const FilmList = () => {
  const [search, setSearch] = useState("");
  const [films, setFilms] = useState([]);

  useEffect(async () => {
<<<<<<< HEAD
    const response = await fetch("https://6w1xm2b238.execute-api.eu-west-1.amazonaws.com/dev/movies");
=======
    const response = await fetch("https://32inokvd3h.execute-api.eu-west-1.amazonaws.com/dev/movies");
>>>>>>> 57814244f4e3687d8a1248c0adbf24dacc44a28b
    const responseJson = await response.json();
    console.log(responseJson)
    setFilms(responseJson)
  }, []);
  console.log(films)

  return (
    <div className="FilmList">
      <div className="FilmList-header">
        <div>
          Liste des films
        </div>
        <input
          className="search-bar"
          value={search}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        ></input>

        {films
          .filter((film) => film.uuid.indexOf(search) !== -1)
          .sort((a, b) => a.uuid - b.uuid)
          .map((film) => (
            <a
              key={film.uuid}
              className="FilmList-filmlink"
              href={`http://localhost:3000/films/${film.uuid}`}
            >
              <ul>
              <li>{film.uuid}</li>
              </ul>
            </a>
          ))}
      </div>
    </div>
  );
};

export default FilmList;