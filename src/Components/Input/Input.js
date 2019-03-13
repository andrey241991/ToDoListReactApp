import React, { Component } from "react";
import "./Input.css";

class Input extends Component {
  state = {
    title: ""
  };

  addNewTask = () => {
    const {handlerFromParantAddNewTask} = this.props;
    const {title} = this.state;
    let newTask = {
      title: title,
      data: +new Date(),
      isActive: true,
      isCompleted: false,
      isSelected: false,
      isEdit: false
    };
    handlerFromParantAddNewTask(newTask);
  };

  handleInputChange = event => {
    this.setState({ title: event.target.value });
  };

  render() {
    return (
      <div className="input">
        <input
          className="input__input"
          maxLength="40"
          onChange={this.handleInputChange}
        />
        <button className="input__btnadd" 
        onClick={this.addNewTask}
        >
          ADD
        </button>
      </div>
    );
  }
}

export default Input;
