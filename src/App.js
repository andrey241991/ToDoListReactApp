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

  //  this.setListOfTasksToShowOnOnePage();
  };

  changeListOfTasks = newListOfTasks => {
    this.setState({
      listOfTasks: newListOfTasks
    })
 //   this.setListOfTasksToShowOnOnePage();
  };

  setCurrentPage = currentPage => {
    this.setState({
      currentPage: currentPage
    });
 //   this.setListOfTasksToShowOnOnePage();
    console.log("setCurrentPage in parent =" + this.state.currentPage);
  };

  setListOfTasksToShowOnOnePage() {
    let firstTask = this.state.currentPage * 10;
    let lastTask = firstTask + 10;
    let newListOfTasks = [];
    for (let i = 0; i < this.state.listOfTasks.length; i++) {
      if (i >= firstTask && i <= lastTask) {
        newListOfTasks.push(this.state.listOfTasks[i]);
      }
    }
    // this.setState({
    //   listOfTasksToShowOnOnePage: newListOfTasks
    // });

    return newListOfTasks;
  }

  // showTasksOnOnePage() {
  //   if (this.state.listOfTasks.length > 10) {
  //     this.setState({
  //       showTasksOnOnePage: true
  //     });
  //   } else {
  //     this.setState({
  //       showTasksOnOnePage: false
  //     });
  //   }
  // }

  // showNotSortedListOfTasks = () => {
  //   this.setState({
  //     showSortedTasks: false
  //   });
  // };

  // addSortedListOfTasks = sortedListOfTasks => {
  //   this.setState({
  //     sortedListOfTasks: sortedListOfTasks
  //   });

  //   this.setState({
  //     showSortedTasks: true
  //   });
  // };



  render() {
    let listOfTasks;
    // if (this.state.showSortedTasks) {
    //   listOfTasks = this.state.sortedListOfTasks;
    // } else {
    //   listOfTasks = this.state.listOfTasks;
    // }

    // if (this.state.listOfTasks.length > 10) {
    //   listOfTasks = this.state.listOfTasksToShowOnOnePage;
    // }else{
    //   listOfTasks = this.state.listOfTasks;
    // }

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
              listOfTasks={this.setListOfTasksToShowOnOnePage()}
              fromParentChangeListOfTasks={this.changeListOfTasks}
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
