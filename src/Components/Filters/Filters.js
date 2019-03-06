import React, { Component } from "react";
import './Filters.css';

class Filters extends Component {

  showAll = () => {
    this.props.fromParentShowNotSortedListOfTasks();
  }

  filterByActiveTasks = () => {
    let newTasks = [];
    for (let value of this.props.listOfTasks) {
      if (!value.isCompleted) {
        newTasks.push(value);
      }
    }
    this.props.fromParentAddSortedListOfTasks(newTasks);
  }

  filterByComplitedTasks = () => {
    let newTasks = [];
    for (let value of this.props.listOfTasks) {
      if (value.isCompleted) {
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
      <div className="Filters">
        <div className = "filter-block" id="filter1" onClick={this.showAll}>SHOW ALL</div>
        <div className = "filter-block" id="filter2" onClick={this.filterByActiveTasks}>SHOW ACTIVE</div>
        <div className = "filter-block" id="filter3" onClick={this.filterByComplitedTasks}>SHOW COMPLETED</div>
        <div className = "filter-block" id="filter4" onClick={this.filterByTitle}>SORT BY A-Z</div>
        <div className = "filter-block" id="filter5" onClick={this.filterByOrigin}>SORT BY ORIGIN</div>
      </div>
    );
  }
}

export default Filters;