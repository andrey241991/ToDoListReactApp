import React, { Component } from "react";
import "./Input.css";
import Validator from "..\\Utils\\Validator";

class Input extends Component {
  state = {
    title: "",
  };

  addNewTask = () => {
    const { title } = this.state;
    if(Validator.validate(title)){
      this.createNewTask();
      this.clearInput();
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
        isEdit: false
      };
      handlerFromParantAddNewTask(newTask);
  }

  clearInput = () => {
    this.state.title = "";
    document.getElementById('input__input-id').value = '';
  };

  handleInputChange = event => {
    this.setState({ title: event.target.value });
  };

  render() {
    return (
      <section className="input">
        <input
          id="input__input-id"
          className="input__input"
          maxLength="40"
          onChange={this.handleInputChange}
          onKeyPress={event => {
            if (event.key === "Enter") {
              this.addNewTask();
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
