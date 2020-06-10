import React, { useState, useEffect } from "react";

const FilmPage = (props) => {
  const filmId = props.match.params.filmId;

  // Pour afficher les infos
  const title=filmId.slice(0,-7).replace(' ','+');
  const year=filmId.slice(-5, -1);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState({});
  const [fetchAgain, setFetchAgain] = useState(false);
  const triggerFetchAgain = () => setFetchAgain(!fetchAgain);

  // Pour la notation
  const user = props.user;
  const [note, setNote] = useState("")
  const updateNote = (e) => {
    setNote(e.target.value)
  }

  // Récupération des données
  const fetchExample = async () => {
    try {
     
      const response = await fetch("http://www.omdbapi.com/?apikey=b5582b71&t="+title+"&y="+year);
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

      const displayFilm = () => {
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else if (item.Title!=undefined) {
          return (
            <ul>
              {<ul>
                <li key={item.Title}>{'Titre : '+item.Title}</li>
                <li>{'Note moyenne : insérer note moyenne des utilisateurs ici'}</li>
                <img src = {item.Poster}></img>
                <li key={item.Year}>{'Année : '+item.Year}</li>
                <li key={item.Genre}>{'Genre : '+item.Genre}</li>
                <li key={item.Director}>{'Réalisateur : '+item.Director}</li>
                <li key={item.Actors}>{'Acteurs : '+item.Actors}</li>
                <li key={item.Plot}>{'Résumé : '+item.Plot}</li>
                <li key={item.Runtime}>{'Durée : '+item.Runtime}</li>
                <li key={item.Rated}>{"Limitation d'âge : "+item.Rated}</li>
                </ul>
              }
            </ul>
          );
        }
      }
      

  return (
    <div>
      <div>
      {displayFilm()}
      </div>
        
      {user
        ? (
          <select
            value={note}
            onChange={updateNote}
          >
            <option value={0}>Non noté</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>)
        : null
      }
    </div>);
};

export default FilmPage;
