import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import Input from "./Components/Input/Input";
import List from "./Components/List/List";
import Selected from "./Components/Selected/Selected";
import Filters from "./Components/Filters/Filters";

class App extends Component {

  state = {
    listOfTasks: [],
    sortedListOfTasks: [],
    showSortedTasks:false
  };

  addNewTaskToList = (newTask) => {
    this.setState({
      listOfTasks: [...this.state.listOfTasks, newTask]
    });
  }

  changeListOfTasks = (newListOfTasks) => {
    this.setState({
      listOfTasks: newListOfTasks
    });
  }

  showNotSortedListOfTasks = () =>{
    this.setState({
      showSortedTasks:false
    })
  }

  addSortedListOfTasks = (sortedListOfTasks) => {
    this.setState({
      sortedListOfTasks: sortedListOfTasks
    });

    this.setState({
      showSortedTasks:true
    });
  }

  render() {
    let  listOfTasks;
    if (this.state.showSortedTasks) {
      listOfTasks = this.state.sortedListOfTasks;
    } else {
      listOfTasks = this.state.listOfTasks;
    }

    return (
      <div className="App">
        <div>
          <Header />
          <Input handlerFromParantAddNewTask={this.addNewTaskToList} />
          <Selected
            listOfTasks={this.state.listOfTasks}
            fromParentChangeListOfTasks={this.changeListOfTasks}
          />
          <div className="ListAndSortParent">
            <Filters
              listOfTasks={this.state.listOfTasks}
              fromParentAddSortedListOfTasks={this.addSortedListOfTasks}
              fromParentShowNotSortedListOfTasks={this.showNotSortedListOfTasks}
            />
            <List
              listOfTasks={listOfTasks}
              fromParentChangeListOfTasks={this.changeListOfTasks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

