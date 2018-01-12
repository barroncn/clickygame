import React from "react";
import "./NavBar.css";


const NavBar = (props) => (
    <nav className="navbar fixed-top navbar-light bg-light" id="webName">
        {props.websiteName}
        <span class="justify-content-center" id="messageToUser">{props.message}</span>
        <span className="navbar-text" id="scores">
      Your Score: <span>{props.currentCounter} </span>  High Score: <span>{props.highScore}</span>
    </span>
    </nav>
);

export default NavBar;
