import React from "react";
import logo from "./logo.svg";
import "./HomePage.css"

const HomePage = () => {

  return (
    <div className="HomePage">
      <div className="HomePage-header">
        <div className="content">
          Le gros site
        </div>
      </div>
      <div>
        <img src={logo} className="HomePage-logo" alt="logo" />
      </div>
    </div>
  );
};



export default HomePage;
