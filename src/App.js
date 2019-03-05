import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import Input from "./Components/Input/Input";
import List from "./Components/List/List";
import Selected from "./Components/Selected/Selected";

class App extends Component {
  constructor() {
    super();

    this.state = {
      listOfTasks: []
    };

    this.handleData = this.handleData.bind(this);
    this.changeListOfTasks = this.changeListOfTasks.bind(this);
  }

  handleData(title, data) {
    let newTask = {
      title,
      data,
      isActive: true,
      isCompleted: false,
      isSelected: false,
      isEdit: false
    };

    this.setState({
      listOfTasks: [...this.state.listOfTasks, newTask]
    });

    console.log("newTask = " + newTask.title + newTask.date + newTask.isActive);
    console.log("list with tasks = " + this.state.listOfTasks.length);
  }

  changeListOfTasks(newListOfTasks) {
    this.setState({
      listOfTasks: newListOfTasks
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <Header />
          <Input handlerFromParant={this.handleData} />
          <Selected
            listOfTasks={this.state.listOfTasks}
            fromParentChangeListOfTasks={this.changeListOfTasks}
          />
          <List listOfTasks={this.state.listOfTasks} 
          fromParentChangeListOfTasks={this.changeListOfTasks}
          />
        </div>
      </div>
    );
  }
}

export default App;
