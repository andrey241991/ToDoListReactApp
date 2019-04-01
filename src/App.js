import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import Input from "./Components/Input/Input";
import List from "./Components/List/List";
import Selected from "./Components/Selected/Selected";
import Filters from "./Components/Filters/Filters";
import Pagination from "./Components/Pagination/Pagination";
import {SetChangedTasks} from "./Components/Utils/ChangeHelper";
import {GetSortedTasks} from "./Components/Utils/ChangeHelper";

class App extends Component {
  state = {
    generalListOfTasks:[],
    changedListOfTasks:[],
    currentPage: 0,
    selectedIds:[],
    filterTasksBy: {by:''}
  };

  addNewTask = newTaskTitle => {
    const {generalListOfTasks} = this.state;
    let newTask = {
      title: newTaskTitle,
      data: +new Date(),
      isCompleted: false,
    };
    generalListOfTasks.push(newTask);

    this.setChangedTasks(); 
  };

  removeTask = itemForRemove => {
    const {generalListOfTasks, currentPage } = this.state;
    let newListOfTasks = [];
    for (let value of generalListOfTasks) {
      if (value.data !== itemForRemove.data) {
        newListOfTasks.push(value);
      }
    }
    this.setState({
      generalListOfTasks: newListOfTasks
    }, ()=> this.setChangedTasks());

    //this.goToPreviousPage(newListOfTasks);

    // if (newListOfTasks.length <= 10) {
    //   this.setState({
    //     currentPage: currentPage - 1
    //   });
    // }
  };

  // goToPreviousPage = (newListOfTasks) =>{
  //   const {generalListOfTasks, currentPage } = this.state;
  //   console.log("goToPreviousPage call");
  //   let result = newListOfTasks.length - currentPage * 10;

  //   if (result <= 10) {
  //     this.setState({
  //       currentPage: currentPage - 1
  //     });
  //   }
  // }

  setCurrentPage = currentPage => {
    this.setState({
      currentPage: currentPage
    }, ()=> this.setChangedTasks());
  };

  clickOnSelectAll = () =>{
    const {changedListOfTasks} = this.state;
    let selectedIds = [];
    for (let value of changedListOfTasks) {
      selectedIds.push(value.data);
    }
    this.setState({
      selectedIds : selectedIds 
    }, ()=> this.setChangedTasks());
  
  }

  clickOnUnSelectAll = () =>{
    let selectedIds = [];
    this.setState({
      selectedIds : selectedIds 
    }, ()=> this.setChangedTasks());
  }

  clickOnDeleteSelected = () =>{
    const {selectedIds, generalListOfTasks, currentPage} = this.state;
   
    let newListOfTasks = [];
    for (let value of generalListOfTasks) {
      if(!selectedIds.includes(value.data)){
        newListOfTasks.push(value);
      }
    }

    this.setState({
      generalListOfTasks: newListOfTasks
    }, ()=> this.setChangedTasks());
    console.log(newListOfTasks);

    if (newListOfTasks.length <= 10) {
      this.setState({
        currentPage: currentPage - 1
      });
    }
  }
    

  filterTasks = filterTasksBy =>{
    this.setState({
      filterTasksBy : filterTasksBy
    }, ()=> this.setChangedTasks());
  }

  setChangedTasks = () =>{
    const {generalListOfTasks, currentPage, filterTasksBy} = this.state;
    let newChangedTasks = SetChangedTasks(generalListOfTasks, filterTasksBy, currentPage);

    this.setState({
      changedListOfTasks : newChangedTasks
    })
  }

  render() {
    const {generalListOfTasks, changedListOfTasks, selectedIds, filterTasksBy} = this.state;
    return (
      <div className="app">
        <Header className="header" />
        <div className="app_container">
            <div className="app_container_top">
                <Input
                  className="input"
                  fromParantAddNewTask={this.addNewTask}
                />
                <Selected
                  className="selected"
                  fromParentClickOnSelectAll={this.clickOnSelectAll}
                  fromParentClickOnUnSelectAll={this.clickOnUnSelectAll}
                  fromParentClickOnDeleteSelected={this.clickOnDeleteSelected}
                />
            </div>
            <div className="app_container_bottom">      
                <div className="app_container_bottom__container">
                    <Filters
                        className="filters"
                        fromParentfilterTasks={this.filterTasks}
                    />
                    <List
                        className="list"
                        changedListOfTasks={changedListOfTasks}   
                        selectedIds={selectedIds}
                        fromParentChangeListOfTasks={this.removeTask}
                    />
                </div>
                <Pagination
                    className="pagination"
                    generalListOfTasks={GetSortedTasks(generalListOfTasks, filterTasksBy)}
                    fromParentSetCurrentPage={this.setCurrentPage}
                /> 
            </div>
        </div>
      </div>
    );
  }
}

export default App;
