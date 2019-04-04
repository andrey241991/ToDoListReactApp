import React, { Component } from "react";
import "./TasksCountSelector.css";

class TasksCountSelector extends Component {

  selectTasksCount = () =>{
    const {fromParentselectTasksCount} = this.props;
    let selectedValue = document.getElementById('count_selector_block__select').value;
    fromParentselectTasksCount(selectedValue);
}
 
  render() {
    return (
     <section className="count_selector_block">
        <select id="count_selector_block__select" onChange={()=>this.selectTasksCount()}>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
            <option value='40'>40</option>
        </select>
     </section>
    );
  }
}

export default TasksCountSelector;