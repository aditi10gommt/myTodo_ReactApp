import React from "react";
import CheckBox from "./CheckBox";
import EditCard from "./EditCard";
import "./CardDetail.css";

class CardDetail extends React.Component {
  render() {
    const tasks = [];
    const card = this.props.card;
    console.log(card);
    for (let index = 0; index < card.tasks.length; index++) {
      tasks.push(
        <li
          key={index}
          className={`${card.tasks[index].done ? "line-through" : ""}`}
        >
          <CheckBox
            taskNumber={index}
            cardId={card.id}
            changeStatus={this.props.changeStatus}
          />
          {card.tasks[index].name}
        </li>
      );
    }

    return (
      <div className="ui card">
        <div className="content">
          <span
            className="right floated star"
            onClick={(e) => {
              this.props.removeCard(card.id);
            }}
          >
            <i className="cross icon"></i>X
          </span>
          <div className="header">{card.title}</div>
          <div className="description">
            <ul>{tasks}</ul>
          </div>
        </div>
        <div className="extra content">
          <span className="left floated like">
            <i className="like icon"></i>
            Like
          </span>
          <span className="right floated star">
            <i className="icon">Edit</i>
          </span>
        </div>
      </div>
    );
  }
}

export default CardDetail;
