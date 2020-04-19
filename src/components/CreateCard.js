import React from "react";

class CreateCard extends React.Component {
  state = {
    card: {
      id: this.props.currCardId,
      title: "",
      tasks: [],
    },
    newItem: "",
  };
  tasks = [];

  getTitle(title, currCardId) {
    const newCard = {
      id: this.state.card.id,
      title: title,
      tasks: this.state.card.tasks,
    };
    this.setState({ card: newCard });
  }

  getTask() {
    const newTask = {
      name: this.state.newItem,
      done: false,
    };
    const presentTasks = this.state.card.tasks;
    presentTasks.push(newTask);
    const newCard = {
      id: this.state.card.id,
      title: this.state.card.title,
      tasks: presentTasks,
    };
    this.setState({ card: newCard });

    this.setState({ newItem: "" });
  }

  cardComplete() {
    this.props.onCardSubmit(this.state.card);
    this.setState({
      card: {
        id: this.props.currCardId,
        title: "",
        tasks: [],
      },
    });
  }
  render() {
    return (
      <div className="ui container">
        <h2>Add Todos Here!</h2>
        <form className="ui form">
          <div className="five wide field">
            <label>Card Title</label>
            <input
              type="text"
              onChange={(e) =>
                this.getTitle(e.target.value, this.props.currCardId)
              }
            />
          </div>
          <div className="five wide field">
            <label>Task</label>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ newItem: e.target.value });
              }}
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              this.tasks.push(
                <li key={this.tasks.length}>{this.state.newItem}</li>
              );
              this.getTask();
            }}
          >
            Add task
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              this.cardComplete();
            }}
          >
            Submit
          </button>
        </form>
        <div className="description">
          <ul>{this.tasks}</ul>
        </div>
      </div>
    );
  }
}

export default CreateCard;
