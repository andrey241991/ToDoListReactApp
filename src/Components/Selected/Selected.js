import React, { Component } from "react";
import "./Selected.css";

class Selected extends Component {
  
  setChecked = checked => {
    for (let value of this.props.listOfTasks) {
      value.isSelected = checked;
    }
    this.props.fromParentChangeListOfTasks(this.props.listOfTasks);
  };

  deleteSelected = () => {
    let newTasks = [];
    for (let value of this.props.listOfTasks) {
      if (!value.isSelected) {
        newTasks.push(value);
      }
    }
    this.props.fromParentChangeListOfTasks(newTasks);
  };

  render() {
    return (
      <div className="selected">
        <div className="buttons_block"> 
          <button
          className="buttons_block__btncheck"
          onClick={() => this.setChecked(true)}
          >
          CHECK ALL
          </button>
          <button 
          className="buttons_block__btnuncheck"
          onClick={() => this.setChecked(false)}
          >
          UNCHECK ALL
          </button>
          <button
          className="buttons_block__btndelete"
          onClick={this.deleteSelected}
          >
          DELETE SELECTED
          </button>
        </div>
      </div>
    );
  }
}

export default Selected;
