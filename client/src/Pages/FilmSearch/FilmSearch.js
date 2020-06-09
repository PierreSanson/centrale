import React, { useState, useEffect } from "react";

const PageFilm = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState({});
  const [fetchAgain, setFetchAgain] = useState(false);
  const triggerFetchAgain = () => setFetchAgain(!fetchAgain);
  const [recherchetitre,setRecherchetitre]=useState("harry+potter")
  const [rechercheannee,setRechercheannee]=useState("")


  const fetchExample = async () => {
    try {
     
      const response = await fetch("http://www.omdbapi.com/?apikey=b5582b71&t="+recherchetitre+rechercheannee);
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
    // The useEffect hook will retrigger every time an element in the dependency array changes.
    // changes = strict egality, so beware when mutating objects
  }, [fetchAgain]);
  
  const sendDB = async(event) => {
    await fetch("https://mmwouk3l22.execute-api.eu-west-1.amazonaws.com/dev/items",{
      method: "post",
      body: JSON.stringify({'Name_Year':item.Title+' ('+item.Year+')',"genre":item.Genre}),
    });
    event.preventDefault();
  };



  const displayFilm = () => {
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (

        <ul>
          {<ul>
            <li key={item.Title}>{'Titre : '+item.Title}</li>
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
            <button onClick={sendDB}>Ajouter à la liste</button>
        </ul>
      );
    }
  };

  const getValue = () => {
    setRecherchetitre(document.getElementById("name").value.replace(' ','+'));
    setRechercheannee("&y="+document.getElementById("year").value);
    triggerFetchAgain();
    fetchExample();
  };

  return (
    <div>
      <label>Title (required) : </label>
      <input type="text" id="name" name="name"></input>
      <label>    Year (optional) : </label>
      <input type="text" id="year" name="year"></input>
      <button onClick={getValue}>Search a movie</button>
      {displayFilm()}
    </div>

  );

};
  

export default PageFilm;

