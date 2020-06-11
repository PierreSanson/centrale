import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./SuggestionPage.css"

const SuggestionPage = (props) => {
  const user = props.user;
  console.log("usersuggestion")
  console.log(user);
  console.log(typeof user.suggestions.split(','));
  console.log(user.suggestions.split(','));

  return (
    <div className="content">
      <div className="filmlist-header">
        <div className="page-header">
          >Mes recommandations
        </div>
        <div className="page-body">
          <div className="films-container">
            <div className="title-suggestion">
              Les autres utilisateurs ont aussi aimé :
            </div>
            {user.suggestions.split(';')
              .slice(0, 10)
              .map((film) => (
                <Link
                  to={`/films/${film}`}
                  key={film.uuid}
                  className="filmlink"
                >
                  <div className="film-box">
                    {film}
                  </div>
                </Link>
              ))}
            <div className="title-suggestion">
              Meilleurs films de la catégorie {user.suggestions.split(';')[20]}:
            </div>
            {user.suggestions.split(';')
              .slice(10, 20)
              .map((film) => (
                <Link
                  to={`/films/${film}`}
                  key={film.uuid}
                  className="filmlink"
                >
                  <div className="film-box">
                    {film}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionPage;