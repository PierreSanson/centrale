import React, { useState, useEffect } from "react";

const FilmDisplayer = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const triggerFetchAgain = () => setFetchAgain(!fetchAgain);

  const fetchExample = async () => {
    try {
      const response = await fetch("http://www.omdbapi.com/?apikey=b5582b71&t=harry+potter&y=2009");
      const responseJson = await response.json();
      setIsLoaded(true);
      setError(false);
      setItems([responseJson]);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  };

  useEffect(() => {
    setIsLoaded(false);
    fetchExample();
    // The useEffect hook will retrigger every time an element in the dependency array changes.
    // changes = strict egality, so beware when mutating objects
  }, [fetchAgain]);

  const displayFilm = () => {
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map((item) => (
            <ul>
            <li key={item.Title}>{'Titre : '+item.Title}</li>
            <img src = {item.Poster}></img>
            <li key={item.Year}>{'Année : '+item.Year}</li>
            <li key={item.Director}>{'Réalisateur : '+item.Director}</li>
            <li key={item.Actors}>{'Acteurs : '+item.Actors}</li>
            <li key={item.Plot}>{'Résumé : '+item.Plot}</li>
            <li key={item.Runtime}>{'Durée : '+item.Runtime}</li>
            <li key={item.Rated}>{"Limitation d'âge : "+item.Rated}</li>

            </ul>
          ))}
        </ul>
      );
    }
  };

  return (
    <div>
      <button onClick={triggerFetchAgain}>Fetch again</button>
      {displayFilm()}
    </div>
  );
};

export default FilmDisplayer;
