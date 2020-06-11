import React, { useState, useEffect } from "react";
import "./FilmSearch.css"
const FilmSearch = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState({});
  const [fetchAgain, setFetchAgain] = useState(false);
  const triggerFetchAgain = () => setFetchAgain(!fetchAgain);
  const [recherchetitre, setRecherchetitre] = useState("")
  const [rechercheannee, setRechercheannee] = useState("")


  const fetchExample = async () => {
    try {

      const response = await fetch("http://www.omdbapi.com/?apikey=b5582b71&t=" + recherchetitre + rechercheannee);
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
    fetchExample();
  }, [fetchAgain]);

    const sendDB = async (event) => {
    await fetch("https://mev5r38l16.execute-api.eu-west-1.amazonaws.com/dev/movies", {
      method: "post",
      body: JSON.stringify({ 'Name_Year': item.Title + ' (' + item.Year + ')', "genre": item.Genre }),
    });
  };

  const displayFilm = () => {
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (item.Title !== undefined) {
      return (
        <>
          <div className="page-body">
            <div className="page-header">
              <div key={item.Title}>{item.Title}</div>
            </div>
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
                <button onClick={sendDB}>Ajouter à la liste</button>
              </div>
            </div>
          </div>
        </>
      );
    }
    else {
      return (
        <div className="page-body">
          <div >Aucun résultat</div>
        </div>
      )
    }
  };

  const getValue = () => {
    setRecherchetitre(document.getElementById("name").value.replace(' ', '+'));
    setRechercheannee("&y=" + document.getElementById("year").value);
    triggerFetchAgain();
    fetchExample();
  };


  return (
    <div className="content">
      <div className="page-header">>Recherche de film</div>
      <div className="search-bar">
        <div className="search-title">Titre (requis) :</div>
        <input className="search-zone" type="text" id="name" name="name"></input>
        <div className="search-title">Année de sortie (optionnel) :</div>
        <input className="search-zone year" type="text" id="year" name="year"></input>
        <button onClick={getValue}>Rechercher un film</button>
      </div>
      {displayFilm()}
    </div>

  );

};


export default FilmSearch;

