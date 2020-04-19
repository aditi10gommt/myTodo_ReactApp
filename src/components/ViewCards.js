import React from "react";

import CardDetail from "./CardDetail";

class ViewCards extends React.Component {
  render() {
    const cards = this.props.cards.map((card, index) => {
      return (
        <div key={index}>
          <CardDetail
            key={index}
            card={card}
            changeStatus={this.props.changeStatus}
            removeCard={this.props.removeCard}
          />
        </div>
      );
    });

    return (
      <>
        <div>{cards}</div>
        <br></br>
      </>
    );
  }
}

export default ViewCards;
