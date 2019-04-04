import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import Input from "./Components/Input/Input";
import List from "./Components/List/List";
import Selected from "./Components/Selected/Selected";
import Filters from "./Components/Filters/Filters";
import Pagination from "./Components/Pagination/Pagination";
import Search from "./Components/Search/Search";
import TasksCountSelector from "./Components/TasksCountSelector/TasksCountSelector";
import {SetChangedTasks} from "./Components/Utils/ChangeHelper";
import {GetSortedTasks} from "./Components/Utils/ChangeHelper";
import defaultItems from "./Components/DefaultItems/DefaultItems.js";


class App extends Component {

  constructor(props) {
    super(props);
    this.stopLoadingAfterDelay();
    this.state = {
      generalListOfTasks:defaultItems,
      changedListOfTasks:[],
      currentPage: 1,
      selectedIds:[],
      filterTasksBy: {by:''},
      isLoading:true,
      searchedText:'',
      tasksCount:10
    };
  }

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
  };

  setCurrentPage = currentPage => {
    this.setState({
      currentPage: currentPage
    }, ()=> this.setChangedTasks());
  };

  selectTasksCount = (tasksCount) =>{
    this.setState({
      tasksCount: tasksCount
    }, ()=> this.setChangedTasks());
  }

  selectAction = (selectedAction) =>{
      switch(selectedAction){
          case "100":
          {this.clickOnSelectAll()}
          break;
          case "200":
           this.clickOnUnSelectAll();
          break;
          case "300":
           this.clickOnDeleteSelected();
          break;
      }
  }
 

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
    const {generalListOfTasks, currentPage, filterTasksBy, searchedText, tasksCount} = this.state;

    let newChangedTasks = SetChangedTasks(generalListOfTasks, filterTasksBy, currentPage, searchedText, tasksCount);
    console.log(newChangedTasks);
    this.setState({
      changedListOfTasks : newChangedTasks
    })
  }

  searchByTitle = searchedText =>{
    console.log({searchedText});
    this.setState({
      searchedText : searchedText
    }, ()=> this.setChangedTasks());
  }
  
  stopLoadingAfterDelay = () =>{
    let LoadingPromise = new Promise((resolve, reject) =>{
       setTimeout(resolve, 200);
      })
    
    const finishLoading = () =>{
      this.setChangedTasks();
        this.setState({
          isLoading:false
        })
    }
   
    function showError(e){
        console.log( 'error', e)
    }
    
    LoadingPromise.then(finishLoading)
                  .catch(showError);
  }


  render() {
    const {generalListOfTasks, changedListOfTasks, selectedIds, filterTasksBy, isLoading, currentPage, tasksCount, 
      searchedText } = this.state;

    let tasksLengthForPagination = GetSortedTasks(generalListOfTasks, filterTasksBy, searchedText);

    if(isLoading){
      return (
        <div className="app">
          <h2 className="mySpinner">  
            <span>Loading...</span>
          </h2>
        </div>
      );
    }else{
      return (
        <div className="app">
          <Header className="header" />
          <div className="app_container">
              <div className="app_container_top">
                  <Search
                     className='search'
                     fromParantSearchByTitle={this.searchByTitle}    
                  />
                  <Input
                    className="input"
                    fromParantAddNewTask={this.addNewTask}
                  />
                   <div className="inner_container">
                   <Selected
                    className=".inner_container__selected"
                    fromParentSelect={this.selectAction}
                  />
                  <TasksCountSelector
                    className="inner_container__tasks-counter-selector"
                    fromParentselectTasksCount={this.selectTasksCount}
                  />
                  </div>
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
                      generalListOfTasks={tasksLengthForPagination}
                      currentPage = {currentPage}
                      tasksCount = {tasksCount}
                      fromParentSetCurrentPage={this.setCurrentPage}
                  /> 
              </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
