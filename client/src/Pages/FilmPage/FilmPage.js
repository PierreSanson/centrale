import React, { useState, useEffect } from "react";
import "./FilmPage.css"

const FilmPage = (props) => {
  const filmId = props.match.params.filmId;

  const [AvgRating, setAvgRating] = useState("?");

  const fetchAvgRating = async () => {
    console.log("je fetch l'avg")
    console.log(filmId)
    const response = await fetch("https://nfy6mb7k13.execute-api.eu-west-1.amazonaws.com/dev/average", {
      method: "post",
      body: filmId
    });
    console.log("AVG")
    console.log(response)
    const responseJson = await response.json();
    setAvgRating(responseJson);
  }


  // Pour afficher les infos
  const title = filmId.slice(0, -7).replace(' ', '+');
  const year = filmId.slice(-5, -1);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState({});

  // Pour la notation
  const user = props.user;

  // Récupération des données
  const fetchExample = async () => {
    try {
      const response = await fetch("http://www.omdbapi.com/?apikey=b5582b71&t=" + title + "&y=" + year);
      const responseJson = await response.json();
      setIsLoaded(true);
      setError(false);
      setItem(responseJson);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  };

  useEffect(() => {
    setIsLoaded(false);
    fetchAvgRating();
    fetchExample();
  }, []);

  const displayFilm = () => {
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (item.Title !== undefined) {
      return (
        <>
          <div className="page-header">
            <div key={item.Title}>{item.Title}</div>
          </div>
          <div className="page-body">
            <div className="film-infos">
              <img className="poster" src={item.Poster}></img>
              <div className="film-text">
                <div className="film-line"><div className="film-info-category">Année :</div><div>{item.Year}</div></div>
                <div className="film-line"><div className="film-info-category">Genre :</div><div>{item.Genre}</div></div>
                <div className="film-line"><div className="film-info-category">Réalisateur :</div><div>{item.Director}</div></div>
                <div className="film-line"><div className="film-info-category">Acteurs :</div><div>{item.Actors}</div></div>
                <div className="film-line"><div className="film-info-category">Résumé :</div><div>{item.Plot}</div></div>
                <div className="film-line"><div className="film-info-category">Durée :</div><div>{item.Runtime}</div></div>
                <div className="film-line"><div className="film-info-category">Limitation d'âge :</div><div>{item.Rated}</div></div>
                <div className="film-line"><div className="film-info-category">Note moyenne :</div><div>{AvgRating}</div></div>
                {user
                  ? (
                    <><div className="rating-panel">
                      <div className="film-info-category">Ma note</div>
                      <select
                        className="rating-selector"
                        value={JSON.parse(user.user_ratings)[filmId] || "0"}
                        onChange={(e) => (props.updateNote(filmId, e.target.value))}
                      >
                        <option value="0">Non noté</option>
                        <option value="1.0">1</option>
                        <option value="1.5">1,5</option>
                        <option value="2.0">2</option>
                        <option value="2.5">2,5</option>
                        <option value="3.0">3</option>
                        <option value="3.5">3,5</option>
                        <option value="4.0">4</option>
                        <option value="4.5">4,5</option>
                        <option value="5.0">5</option>
                      </select>
                    </div>
                    </>)
                  : null
                }
              </div>
            </div>
          </div>

        </>
      );
    }
  }

  return (
    <div className="content">
      {displayFilm()}
    </div>);
};

export default FilmPage;
