import React, { Component } from "react";
import "./Selected.css";

class Selected extends Component {
  
  setChecked = checked => {
    const {fromParentChangeListOfTasks, listOfTasks} = this.props;
    for (let value of listOfTasks) {
      value.isSelected = checked;
    }
    fromParentChangeListOfTasks(this.props.listOfTasks);
  };

  deleteSelected = () => {
    const {fromParentChangeListOfTasks, listOfTasks} = this.props;
    let newTasks = [];
    for (let value of listOfTasks) {
      if (!value.isSelected) {
        newTasks.push(value);
      }
    }
    fromParentChangeListOfTasks(newTasks);
  };

  render() {
    return (
      <section className="selected">
        <div className="selected_block"> 
          <button
              className="selected_block__btn-check selected_block__button"
              onClick={() => this.setChecked(true)}
          >
              CHECK ALL
          </button>
          <button 
              className="selected_block__btn-uncheck selected_block__button"
              onClick={() => this.setChecked(false)}
          >
              UNCHECK ALL
          </button>
          <button
              className="selected_block__btn-delete selected_block__button"
              onClick={this.deleteSelected}
          >
              DELETE SELECTED
          </button>
        </div>
      </section>
    );
  }
}

export default Selected;
