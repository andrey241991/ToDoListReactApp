import React, { Component } from "react";
import './Filters.css';

class Filters extends Component {



    filterTasks = filterTasksBy =>{
    const{fromParentfilterTasks} = this.props;
    fromParentfilterTasks(filterTasksBy);
  }

  // showAll = () => {
  //   const{fromParentShowNotSortedListOfTasks} = this.props;
  //   fromParentShowNotSortedListOfTasks();
  // }

  // filterByCompletedAndActiveTasks = (isCompleted) => {
  //   const{fromParentAddSortedListOfTasks} = this.props;
  //   let newTasks = [];
  //   for (let value of this.props.listOfTasks) {
  //     if (value.isCompleted === isCompleted) {
  //       newTasks.push(value);
  //     }
  //   }
  //   fromParentAddSortedListOfTasks(newTasks);
  // }

  // filterByTitle = () => {  
  //   const{fromParentAddSortedListOfTasks, listOfTasks} = this.props;
  //   fromParentAddSortedListOfTasks(listOfTasks.sort((a, b) => a.title.localeCompare(b.title)));
  // }

  // filterByOrigin = () => {  
  //   const{fromParentAddSortedListOfTasks, listOfTasks} = this.props;
  //   fromParentAddSortedListOfTasks(listOfTasks.sort((a, b) =>a.data - b.data));
  // }

  render() {
    return (
    <aside className="filters">
        <div 
            className="filters__block block block--show-all" 
            onClick={()=> this.filterTasks({by:''})}
        >
            SHOW ALL
        </div>
        <div 
            className="filters__block block block--show-active" 
            onClick={()=> this.filterTasks({by:'activeTasks'})}
        >
            SHOW ACTIVE
        </div>
        <div 
           className="filters__block block block--show-completed" 
      //     onClick={()=>this.filterByCompletedTasks(true)}
             onClick={()=> this.filterTasks({by:'complitedTasks'})}
        >
            SHOW COMPLETED
        </div>
        <div 
            className="filters__block block block--sort-by-alphabet" 
           // onClick={this.filterByTitle}
           onClick={()=> this.filterTasks({by:'title'})}
        >
            SORT BY A-Z
        </div>
        <div 
            className="filters__block block block--sort-by-origin" 
           // onClick={this.filterByOrigin}
           onClick={()=> this.filterTasks({by:'origin'})}
        >
            SORT BY ORIGIN
        </div>
    </aside>
    );
  }
}

export default Filters;