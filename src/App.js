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

  //The shuffle function resorts the images on the screen
  shuffle = () => {
    //randomly sorts the cards
    this.state.cards.sort(function(a, b) { return 0.5 - Math.random() });
    //Displays the newly sorted cards
    this.setState({ cards });
  }

  //When the user clicks on a card, the clicked function is called and passed the clicked card's unique id
  clicked = (id) => {
    //Filter the full array of cards to find the card with an id matching the argument id
    //clickedCard will be a "sub-array" containing only the card the user clicked on
    const clickedCard = this.state.cards.filter(card => card.id === id);

    //If isClicked is true on the chosen card (the user has already clicked it in the current game)...the game needs to be restarted
    if (clickedCard[0].isClicked) {
      //Change each card's isClicked key to the value false
      this.state.cards.forEach(card => card.isClicked = false);
      //Set the states: all cards in the DOM reflect the isClicked=false change, user counter reset to 0 and displayed, and "oops" message is displayed
      this.setState({
        cards,
        userCounter: 0,
        message: "Oops, guessed it twice! Start again..."
      });
    }

    //the user clicks correct (unclicked) card...the guess needs to be reflected in the state
    else {
      //Change the isClicked value of the clicked card to true
      clickedCard[0].isClicked = true;
      //Set the states: DOM is updated with card's isClicked=true change, user counter incremented and displayed, and "nice guess" message is displayed
      this.setState({
        cards,
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
          currentCounter= {this.state.userCounter} //Keeps track of user's correct guesses in the navbar
          highScore={this.state.highScore} //Keeps track of the current session high score in the navbar
          message={this.state.message} //Displays the correct message in the navbar
      />,
      <Jumbotron
          headerContent="Welcome to Clicky Game!"
          headerDescription="Click an image to get points, but don't click the same one twice!"
      />,
      <div className="ImagesDiv">
          {this.state.cards.map( image => ( //Makes an image for each card in our "database" (cards.json file)
              <Image
                  name= {image.name}
                  url= {image.url}
                  key= {image.id}
                  id={image.id}
                  clicked= {this.clicked} //Assigns each image with the clicked function from above
              />
            ))}
      </div>,
      <Footer/>
    ]);
  }
}

export default App;
