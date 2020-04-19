import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CreateCard from "./CreateCard";
import ViewCards from "./ViewCards";
import Header from "./Header";

class App extends React.Component {
  state = { allCards: [] };

  onCardSubmit = (card) => {
    const presentCards = this.state.allCards;
    presentCards.push(card);
    this.setState({ allCards: presentCards });
  };
  assignId() {
    const totalCards = this.state.allCards;
    if (this.state.allCards.length) {
      const id = totalCards[totalCards.length - 1].id + 1;
      return id;
    }
    return 0;
  }

  changeStatus = (taskNumber, cardId) => {
    const card = this.state.allCards[cardId];
    let status = card.tasks[taskNumber].done;
    const taskName = card.tasks[taskNumber].name;
    status = !status;
    const updatedTask = {
      name: taskName,
      done: status,
    };
    const updatedCard = {
      id: card.id,
      title: card.title,
      tasks: card.tasks,
    };
    updatedCard.tasks[taskNumber] = updatedTask;
    const updatedAllCards = this.state.allCards;

    updatedAllCards.forEach((card, index) => {
      if (card.id === cardId) {
        updatedAllCards[index] = updatedCard;
      }
    });
    this.setState({ allCards: updatedAllCards });
  };

  removeCard = (cardId) => {
    let cards = this.state.allCards.filter(function (e) {
      return e.id !== cardId;
    });
    this.setState({ allCards: cards });
  };
  render() {
    let i = 0;
    return (
      <div className="ui container">
        <BrowserRouter>
          <div>
            <Header />
            <Route
              path="/CreateCard"
              render={() => (
                <CreateCard
                  onCardSubmit={this.onCardSubmit}
                  currCardId={this.assignId()}
                />
              )}
            />
            <br></br>
            <hr></hr>

            <Route
              path="/"
              exact
              render={() => (
                <ViewCards
                  cards={this.state.allCards}
                  key={i++}
                  changeStatus={this.changeStatus}
                  removeCard={this.removeCard}
                />
              )}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
