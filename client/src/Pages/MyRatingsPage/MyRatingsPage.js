import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./MyRatingsPage.css"

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
          >Mes notes
        </div>
        <div className="page-body">
          <div className="films-container">
            <div className="title-suggestion">
            Les films que j'ai notés :
            </div>
            {user.rated_movies.split(';')
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