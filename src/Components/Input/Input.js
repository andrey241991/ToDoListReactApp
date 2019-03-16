import React, { Component } from "react";
import "./Input.css";
import Validator from "..\\Utils\\Validator";

class Input extends Component {
  state = {
    title: "",
  };

  addNewTask = e => {
    const { title } = this.state;
    if(Validator.validate(title)){
      this.createNewTask();
      if(e.key === "Enter"){     
        this.clearInput(e);
      }
    }else{
      alert('Input field can not be empty');
    }
  };

  createNewTask(){
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
  }

  clearInput = e => {
    e.currentTarget.value = "";
    this.state.title = "";
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
            if (event.key === "Enter") {
              this.addNewTask(event);
            }
          }}
        />
        <button className="input__button-add" onClick={this.addNewTask}>
          ADD
        </button>
      </section>
    );
  }
}

export default Input;
