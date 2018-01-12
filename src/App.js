import React, { Component } from 'react';
import cards from "./cards.json";
import Image from "./components/Image";
import NavBar from "./components/NavBar";
import Jumbotron from "./components/Jumbotron";
import Footer from "./components/Footer";
import Modal from ".//components/Modal";
import './App.css';

class App extends Component {
  state = {
    cards,
    userCounter: 0,
    highScore: 0,
    message: "Click a picture to start!"
  };

  clicked = (id) => {


    //our array of cards
    const images = this.state.cards;

    //the card we clicked on (this will be an array with one card/image in it)
    const clickedCard = images.filter(image => image.id === id);
    console.log(clickedCard);
    //if the user has already clicked on the card...
    if (clickedCard[0].isClicked) {
      // this.state.userCounter = 0;
      this.setState({ userCounter: 0 });
      images.forEach(image => image.isClicked = false)
      this.setState({ cards: images })
      this.shuffle();
      this.setState({ message: "Oops, guessed it twice! Start again..." });
    }

    //the user clicked a new card...
    else {
      this.setState({ message: "Nice Guess! Keep it Up!" })

      //increment the user's click counter (not updated on screen yet)
      this.setState({ userCounter: this.state.userCounter + 1 });

      clickedCard[0].isClicked = true;
      this.setState({ cards: images });

      if (this.state.userCounter >= this.state.highScore) {
        this.setState({ highScore: this.state.highScore + 1 });
        this.shuffle();
      }
      else {
        this.shuffle();
      }
    }
  }

  shuffle = () => {
    this.state.cards.sort(function(a, b) { return 0.5 - Math.random() });

    this.setState({ cards });
  }

  render() {
    return ([
      <NavBar
        websiteName= "Clicky Game"
        currentCounter= {this.state.userCounter}
        highScore={this.state.highScore}
        message={this.state.message}
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
          id={image.id}
          clicked= {this.clicked}
          shuffle= {this.shuffle}
          shake={this.shake}
          />
        ))}
      </div>,
      <Footer/>
    ]);
  }
}

export default App;
