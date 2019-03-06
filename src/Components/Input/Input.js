import React, { Component } from "react";
import "./Input.css";

class Input extends Component {
  state = {
    title: ""
  };

  addNewTask = () => {
    let newTask = {
      title: this.state.title,
      data: +new Date(),
      isActive: true,
      isCompleted: false,
      isSelected: false,
      isEdit: false
    };
    this.props.handlerFromParant(newTask);
  };

  handleInputChange = event => {
    this.setState({ title: event.target.value });
  };

  render() {
    return (
      <div className="Input">
        <input
          className="Input-field"
          maxLength="40"
          onChange={this.handleInputChange}
        />
        <button className="Button-add" onClick={this.addNewTask}>
          ADD
        </button>
      </div>
    );
  }
}

export default Input;
