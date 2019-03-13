import React, { Component } from "react";
import './Filters.css';

class Filters extends Component {

  showAll = () => {
    this.props.fromParentShowNotSortedListOfTasks();
  }

  filterByCompletedAndActiveTasks = (isCompleted) => {
    let newTasks = [];
    for (let value of this.props.listOfTasks) {
      if (value.isCompleted === isCompleted) {
        newTasks.push(value);
      }
    }
    this.props.fromParentAddSortedListOfTasks(newTasks);
  }

  filterByTitle = () => {  
    this.props.fromParentAddSortedListOfTasks(this.props.listOfTasks.sort((a, b) => a.title.localeCompare(b.title)));
  }

  filterByOrigin = () => {  
    this.props.fromParentAddSortedListOfTasks(this.props.listOfTasks.sort((a, b) =>a.data - b.data));
  }

  render() {
    return (
      <div className="filters">
        <div className = "filter1"
         onClick={this.showAll}
         >
         SHOW ALL
         </div>
        <div className = "filter2"
         onClick={()=>this.filterByCompletedAndActiveTasks(false)}
         >
         SHOW ACTIVE
         </div>
        <div className = "filter3"
         onClick={()=>this.filterByCompletedAndActiveTasks(true)}
         >
         SHOW COMPLETED
         </div>
        <div className = "filter4" 
        onClick={this.filterByTitle}
        >SORT BY A-Z
        </div>
        <div className = "filter5" 
        onClick={this.filterByOrigin}
        >
        SORT BY ORIGIN
        </div>
      </div>
    );
  }
}

export default Filters;