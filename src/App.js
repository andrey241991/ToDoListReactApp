import React, { Component } from "react";
import logo from "./logo.svg";
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
    showTasksOnOnePage: false,
    selectedIds:[]
  };

  addNewTaskToList = newTask => {
    const { listOfTasks } = this.state;
    this.setState({
      listOfTasks: [...listOfTasks, newTask]
    });
  };

  setSelected = selectedIds => {  
    this.setState({
      selectedIds : selectedIds 
    });
  };

  removeTask = itemForRemove => {
    const { listOfTasks, currentPage } = this.state;
    let newTasks = [];
    for (let value of listOfTasks) {
      if (value.data !== itemForRemove.data) {
        newTasks.push(value);
      }
    }
    this.setState({
      listOfTasks: newTasks
    });

    if (newTasks == 10) {
      this.setState({
        currentPage: currentPage - 1
      });
    }
  };

  setCurrentPage = currentPage => {
    this.setState({
      currentPage: currentPage
    });
    this.setSorted(false);
  };

  setListOfTasksToShowOnOnePage() {
    const { listOfTasks, currentPage } = this.state;
    let firstTask = currentPage * 10;
    let lastTask = firstTask + 10;
    let newListOfTasks = [];
    for (let i = 0; i < listOfTasks.length; i++) {
      if (i >= firstTask && i < lastTask) {
        newListOfTasks.push(listOfTasks[i]);
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

  deleteSelected = tasksToDelete =>{
    const {listOfTasks, listOfTasksToShowOnOnePage, currentPage} = this.state;
    let newListOfTasks = [];

    for(let i = 0; i<listOfTasks.length; i++){
        let currentTask = listOfTasks[i];
        if (!tasksToDelete.find(el => el.data === currentTask.data)) {
          newListOfTasks.push(currentTask);
        }
      }
   
      this.setState({
          listOfTasks: newListOfTasks
        });
  }
   

  render() {
    const { currentPage, showSortedTasks, sortedListOfTasks, selectedIds} = this.state;
    let listOfTasks;
    if (showSortedTasks) {
      listOfTasks = sortedListOfTasks;
    } else {
      listOfTasks = this.setListOfTasksToShowOnOnePage();
    }

    return (
      <div className="app">
        <Header className="header" />
        <div className="app_container">
            <div className="app_container_top">
                <Input
                  className="input"
                  handlerFromParantAddNewTask={this.addNewTaskToList}
                />
                <Selected
                  className="selected"
                  listOfTasks={listOfTasks}
                  fromParentSetSelected={this.setSelected}
                  fromParentDeleteTasks={this.deleteSelected}
                />
            </div>
            <div className="app_container_bottom">      
                <div className="app_container_bottom__container">
                    <Filters
                        className="filters"
                        listOfTasks={this.setListOfTasksToShowOnOnePage()}
                        fromParentAddSortedListOfTasks={this.addSortedListOfTasks}
                        fromParentShowNotSortedListOfTasks={() => this.setSorted(false)}
                    />
                    <List
                        className="list"
                        listOfTasks={listOfTasks}
                        selectedIds={selectedIds}
                        fromParentChangeListOfTasks={this.removeTask}
                    />
                </div>
                <Pagination
                    className="pagination"
                    fromParentSetCurrentPage={this.setCurrentPage}
                    listOfTasks={this.state.listOfTasks}
                    currentPage={currentPage}
                />
            </div>
        </div>
      </div>
    );
  }
}

export default App;
