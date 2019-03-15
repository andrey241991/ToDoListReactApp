import React, { Component } from "react";
import './Filters.css';

class Filters extends Component {

  showAll = () => {
    const{fromParentShowNotSortedListOfTasks} = this.props;
    fromParentShowNotSortedListOfTasks();
  }

  filterByCompletedAndActiveTasks = (isCompleted) => {
    const{fromParentAddSortedListOfTasks} = this.props;
    let newTasks = [];
    for (let value of this.props.listOfTasks) {
      if (value.isCompleted === isCompleted) {
        newTasks.push(value);
      }
    }
    fromParentAddSortedListOfTasks(newTasks);
  }

  filterByTitle = () => {  
    const{fromParentAddSortedListOfTasks, listOfTasks} = this.props;
    fromParentAddSortedListOfTasks(listOfTasks.sort((a, b) => a.title.localeCompare(b.title)));
  }

  filterByOrigin = () => {  
    const{fromParentAddSortedListOfTasks, listOfTasks} = this.props;
    fromParentAddSortedListOfTasks(listOfTasks.sort((a, b) =>a.data - b.data));
  }

  render() {
    return (
    <div className="filters">
        <div className = "filters_block"
         onClick={this.showAll}
         >
         SHOW ALL
         </div>
        <div className = "filters_block"
         onClick={()=>this.filterByCompletedAndActiveTasks(false)}
         >
         SHOW ACTIVE
         </div>
        <div className = "filters_block"
         onClick={()=>this.filterByCompletedAndActiveTasks(true)}
         >
         SHOW COMPLETED
         </div>
        <div className = "filters_block" 
        onClick={this.filterByTitle}
        >SORT BY A-Z
        </div>
        <div className = "filters_block" 
        onClick={this.filterByOrigin}
        >
        SORT BY ORIGIN
        </div>
  </div>
    );
  }
}

export default Filters;