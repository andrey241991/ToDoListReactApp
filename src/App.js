import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Input from "./Components/Input/Input";
import List from "./Components/List/List";
import Selected from "./Components/Selected/Selected";
import Filters from "./Components/Filters/Filters";
import Pagination from "./Components/Pagination/Pagination";

class App extends Component {
  state = {
    listOfTasks: [],
    sortedListOfTasks: [],
    showSortedTasks: false,
    currentPage: 0,
    listOfTasksToShowOnOnePage: [],
    showTasksOnOnePage: false
  };

  addNewTaskToList = newTask => {
    this.setState({
      listOfTasks: [...this.state.listOfTasks, newTask]
    });
  };

  changeListOfTasks = newListOfTasks => {
    this.setState({
      listOfTasks: newListOfTasks
    });
  };

  removeTask = itemForRemove => {
    let newTasks = [];
    for (let value of this.state.listOfTasks) {
      if (value.data !== itemForRemove.data) {
        newTasks.push(value);
      }
    }
    this.setState({
      listOfTasks: newTasks
    });

    if (newTasks == 10) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  };

  setCurrentPage = currentPage => {
    this.setState({
      currentPage: currentPage
    });
    this.setSorted(false);
    console.log("setCurrentPage in parent =" + this.state.currentPage);
  };

  setListOfTasksToShowOnOnePage() {
    let firstTask = this.state.currentPage * 10;
    let lastTask = firstTask + 10;
    let newListOfTasks = [];
    for (let i = 0; i < this.state.listOfTasks.length; i++) {
      if (i >= firstTask && i < lastTask) {
        newListOfTasks.push(this.state.listOfTasks[i]);
      }
    }
    return newListOfTasks;
  }

  setSorted = sorted => {
    this.setState({
      showSortedTasks: sorted
    });
  };

  addSortedListOfTasks = sortedListOfTasks => {
    this.setState({
      sortedListOfTasks: sortedListOfTasks
    });
    this.setSorted(true);
  };

  render() {
    console.log("render");
    let listOfTasks;
    if (this.state.showSortedTasks) {
      listOfTasks = this.state.sortedListOfTasks;
    } else {
      listOfTasks = this.setListOfTasksToShowOnOnePage();
    }

    return (
      <div className="app">
          <div>
              <Header />
              <Input 
              handlerFromParantAddNewTask={this.addNewTaskToList} 
              />
              <Selected
                listOfTasks={listOfTasks}
                fromParentChangeListOfTasks={this.changeListOfTasks}
              />
              <div 
                  className="app_container_list_sort"
                  >
                    <Filters
                      listOfTasks={this.setListOfTasksToShowOnOnePage()}
                      fromParentAddSortedListOfTasks={this.addSortedListOfTasks}
                      fromParentShowNotSortedListOfTasks={() => this.setSorted(false)}
                    />
                    <List
                      listOfTasks={listOfTasks}
                      fromParentChangeListOfTasks={this.removeTask}
                    />
              </div>
              <Pagination
                fromParentSetCurrentPage={this.setCurrentPage}
                listOfTasks={this.state.listOfTasks}
                currentPage={this.state.currentPage}
              />
          </div>
      </div>
    );
  }
}

export default App;
