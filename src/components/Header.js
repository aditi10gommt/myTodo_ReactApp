import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        TaskBoard
      </Link>
      <div className="right menu">
        <Link to="/CreateCard" className="item">
          Add Task
        </Link>
      </div>
    </div>
  );
};

export default Header;
