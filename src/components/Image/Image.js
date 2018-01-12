import React from "react";
import "./Image.css";

const Image = (props) => (
    <img src={props.url} alt={props.name} data-click={props.clickedYet} className="images rounded" onClick={() => props.clicked(props.id)}></img>
);

export default Image;