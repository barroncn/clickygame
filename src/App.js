import React, { Component } from 'react';
import cards from "./cards.json";
import Image from "./components/Image";
import NavBar from "./components/NavBar";
import Jumbotron from "./components/Jumbotron";
import Footer from "./components/Footer";
import './App.css';

class App extends Component {
  state = {
    cards
  };

  clicked = () => {
    if (this.state.isClicked === "false") {
      //alert(`${this.state.name} has not been picked`);
      this.setState({ isClicked: true });
    }
    else {
      //alert(`${this.state.name} has already been picked`);
      cards.forEach(card => this.setState({ isClicked: false }));
    }
  }

  shuffle = () => {
    this.clicked();
    this.state.cards.sort(function(a, b) { return 0.5 - Math.random() });

    this.setState({ cards });
  }

  render() {
    return ([
      <NavBar
        websiteName= "Clicky Game"
        currentCounter= "5"
        highScore="6"
        />,
      <Jumbotron
        headerContent="Welcome to Clicky Game!"
        headerDescription="Click an images to get points, but don't click the same image twice!"
      />,
      <div className="ImagesDiv">
      {this.state.cards.map( image => (
      <Image
          name= {image.name}
          url= {image.url}
          key= {image.id}
          clicked= {this.clicked}
          shuffle= {this.shuffle}
          clickedYet={image.isClicked}
          />
        ))}
      </div>,
      <Footer/>
    ]);
  }
}

export default App;
