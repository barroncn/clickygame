import React, { Component } from 'react';
import cards from "./cards.json";
import Image from "./components/Image";
import NavBar from "./components/NavBar";
import Jumbotron from "./components/Jumbotron";
import Footer from "./components/Footer";
import './App.css';

class App extends Component {
  state = {
    cards,
    userCounter: 0,
    highScore: 0,
    message: "Click a picture to start!"
  };

  //The shuffle function that is called below...
  shuffle = () => {
    //randomly sorts the cards
    this.state.cards.sort(function(a, b) { return 0.5 - Math.random() });
    //Displays the newly sorted cards
    this.setState({ cards });
  }

  clicked = (id) => {
    //our array of cards
    const images = this.state.cards;

    //the card we clicked on (this will be an array with one card/image in it)
    const clickedCard = images.filter(image => image.id === id);

    //if the user has already clicked on the card...
    if (clickedCard[0].isClicked) {
      //Change each image's isClicked key to the value false
      images.forEach(image => image.isClicked = false);
      //Set the states: all cards are set to unclicked in DOM, user counter equal to 0 is displayed, and oops message is displayed
      this.setState({
        cards: images,
        userCounter: 0,
        message: "Oops, guessed it twice! Start again..."
      });
    }

    //the user clicked a new card...
    else {
      //Change the isClicked value of the clicked card to true
      clickedCard[0].isClicked = true;
      //Set the states: cards clicked values updated in DOM, user counter incremented and displayed, and nice guess message is displayed
      this.setState({
        cards: images,
        userCounter: this.state.userCounter + 1,
        message: "Nice Guess! Keep it Up!"
      });

      //If the user has the highest score...
      if (this.state.userCounter >= this.state.highScore) {
        //Increment the high score value and display it
        this.setState({ highScore: this.state.highScore + 1 });
        //Shuffle the cards
        this.shuffle();
      }
      //If the user does not have the highest score...
      else {
        //Shuffle the cards
        this.shuffle();
      }
    }
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
          // shake={this.shake}
          />
        ))}
      </div>,
      <Footer/>
    ]);
  }
}

export default App;
