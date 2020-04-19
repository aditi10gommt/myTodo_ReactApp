import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CreateCard from "./CreateCard";
import ViewCards from "./ViewCards";
import Header from "./Header";

const pushCardInLocalStorage = function (key, newCard) {
  const presentCards = JSON.parse(localStorage.getItem(key)) || [];
  presentCards.push(newCard);
  setDataToLocalStorage(key, presentCards);
  return;
};
function setDataToLocalStorage(key, allCards) {
  localStorage.setItem(key, JSON.stringify(allCards));
}
function getDatafromLocalStorage(key) {
  const presentCards = JSON.parse(localStorage.getItem(key)) || [];
  return presentCards;
}

class App extends React.Component {
  state = { allCards: getDatafromLocalStorage("todoList") || [] };

  hydrateStateWithLocalStorage = function () {
    const localStorageData = getDatafromLocalStorage("todoList");
    this.setState({ allCards: localStorageData });
  };

  onCardSubmit = (card) => {
    const presentCards = this.state.allCards;
    presentCards.push(card);
    this.setState({ allCards: presentCards });
    pushCardInLocalStorage("todoList", card);
    this.hydrateStateWithLocalStorage();
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
    let card;
    for (let i = 0; i < this.state.allCards.length; i++) {
      const currCard = this.state.allCards[i];
      if (currCard.id === cardId) {
        card = this.state.allCards[i];
        break;
      }
    }
    let status = card.tasks[taskNumber].done;
    const taskName = card.tasks[taskNumber].name;
    status = !status;
    const updatedTask = {
      name: taskName,
      done: status,
    };
    const updatedCard = {
      id: cardId,
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
    setDataToLocalStorage("todoList", updatedAllCards);
    this.hydrateStateWithLocalStorage();
  };

  removeCard = (cardId) => {
    let cards = this.state.allCards.filter(function (e) {
      return e.id !== cardId;
    });
    this.setState({ allCards: cards });
    setDataToLocalStorage("todoList", cards);
    this.hydrateStateWithLocalStorage();
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
