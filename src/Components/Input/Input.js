import React, { Component } from "react";
import "./Input.css";

class Input extends Component {
  state = {
    title: ""
  };

  addNewTask = () => {
    const { handlerFromParantAddNewTask } = this.props;
    const { title } = this.state;
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
      <section className="input">
          <input
              className="input__input"
              maxLength="40"
              onChange={this.handleInputChange}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.addNewTask();
                }
               }
              }
           />
           <button 
              className="input__button-add" 
              onClick={this.addNewTask}>
              ADD
          </button>
      </section>
    );
  }
}

export default Input;
