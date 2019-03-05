import React, { Component } from "react";

class Selected extends Component {
  checkAllTasks = () => {
    for (let value of this.props.listOfTasks) {
      value.isSelected = true;
    }
    this.props.fromParentChangeListOfTasks(this.props.listOfTasks);
  };

  unCheckAllTasks = () => {
    for (let value of this.props.listOfTasks) {
      value.isSelected = false;
    }
    this.props.fromParentChangeListOfTasks(this.props.listOfTasks);
  };

  deleteSelected = () => {
    let newTasks = [];
    for (let value of this.props.listOfTasks) {
      if (!value.isSelected) {
        console.log("Delete selected add tonew Array = " + value.title);
        newTasks.push(value);
      }
    }
    this.props.fromParentChangeListOfTasks(newTasks);   
  };

  render() {
    return (
      <div className="Selected">
        <button onClick={this.checkAllTasks}>CHECK ALL</button>
        <button onClick={this.unCheckAllTasks}>UNCHECK ALL</button>
        <button onClick={this.deleteSelected}>DELETE SELECTED</button>
      </div>
    );
  }
}

export default Selected;
