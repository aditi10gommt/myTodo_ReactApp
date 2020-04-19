import React from "react";
import "./CardDetail.css";

class CheckBox extends React.Component {
  onClickHandler(taskNumber, cardId) {
    console.log("entered");
    this.props.changeStatus(taskNumber, cardId);
  }

  render() {
    return (
      <div>
        <input
          type="checkbox"
          className="ui checkbox"
          onClick={() => {
            this.onClickHandler(this.props.taskNumber, this.props.cardId);
          }}
        />
      </div>
    );
  }
}

export default CheckBox;
