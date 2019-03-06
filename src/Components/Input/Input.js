import React, { Component } from "react";
import "./Input.css";

class Input extends Component {
  constructor() {
    super();

    this.state = {
      title: ""
    };

    this.addNewTask = this.addNewTask.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  addNewTask(event) {
    this.props.handlerFromParant(this.state.title, + new Date());
    console.log(+ new Date());
  }

  handleInputChange(event) {
    this.setState({ title: event.target.value });
  }

  render() {
    return (
      <div className="Input">
        <input className="Input-field" maxLength="40" onChange={this.handleInputChange} />
        <button className="Button-add" onClick={this.addNewTask}>
          ADD
        </button>
      </div>
    );
  }
}

export default Input;
