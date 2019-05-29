import React, { Component } from "react";
import cardData from "../cards.json";
import "../App.css";

class Game extends Component {
  state = {
    cardData: [...cardData],
    currentScore: 0,
    highScore: 0
  };

  handleClick = cardId => {
    let isCorrect = false;

    const cardData = [...this.state.cardData];

    cardData.forEach(card => {
      if (card.id === cardId) {
        if (!card.clicked) {
          isCorrect = true;
          card.clicked = true;
        }
      }
    });

    isCorrect
      ? this.handleCorrectPick(cardData)
      : this.handleIncorrectPick(cardData);
  };

  handleCorrectPick = cardData => {
    const shuffle = cardData.sort(() => 0.5 - Math.random());

    const currentScore = this.state.currentScore + 1;

    var highScore = this.state.highScore;

    if (currentScore > highScore) {
      highScore = currentScore;
    }

    this.setState({
      cardData: shuffle,
      currentScore: currentScore,
      highScore: highScore
    });
  };

  handleIncorrectPick = cardData => {
    const shuffle = cardData.sort(() => 0.5 - Math.random());

    shuffle.forEach(card => (card.clicked = false));

    this.setState({
      cardData: shuffle,
      currentScore: 0
    });
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-dark">
          <span className="navbar-brand text-light">ClickyGame</span>
          <span className="text-light">
            Score: {this.state.currentScore}    Highscore:{" "}
            {this.state.highScore}
          </span>
        </nav>
        <div className="container">
          <div className="row">
            {this.state.cardData.map(card => {
              return (
              /* print cards*/
                <div className="col-4" key={card.id}>
                  <img
                    src={card.image}
                    alt={card.name}
                    className="img-fluid img-thumbnail"
                    onClick={() => this.handleClick(card.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Game;
