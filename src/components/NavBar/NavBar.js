import React from "react";
import "./NavBar.css";

const NavBar = (props) => (
    <nav className="navbar fixed-top navbar-light bg-light">
        {props.websiteName}
        <span className="navbar-text">
      Your Score: <span>{props.currentCounter} </span>  High Score: <span>{props.highScore}</span>
    </span>
    </nav>
);

export default NavBar;
