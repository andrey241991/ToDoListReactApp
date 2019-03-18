import React, { Component } from "react";
import "./Selected.css";

class Selected extends Component {

  state = {
    selectedIds: []
  };

  setSelected = (selected) => {
    const {listOfTasks} = this.props;
    let selectedIds = [];
    if(selected){
      for (let value of listOfTasks) {
        selectedIds.push(value.data);
      }
    }

    this.setState({
      selectedIds:selectedIds
    })

    this.props.fromParentSetSelected(selectedIds);
  };

  deleteSelected = () => {
    const {selectedIds} = this.state;
    const {listOfTasks} = this.props;
    let tasksToDelete = [];

    for (let value of listOfTasks) {
      if(selectedIds.includes(value.data)){
        tasksToDelete.push(value);
      }
    }
    this.props.fromParentDeleteTasks(tasksToDelete);
    //this.props.fromParentDeleteTasks(selectedIds);
  }

  render() {
    const {fromParentsetSelected, fromParentDeleteSelected} = this.props;
    return (
      <section className="selected">
        <div className="selected_block"> 
          <button
              className="selected_block__btn-check selected_block__button"
              onClick={()=>this.setSelected(true)}
          >
              CHECK ALL
          </button>
          <button 
              className="selected_block__btn-uncheck selected_block__button"
              onClick={()=>this.setSelected(false)}
          >
              UNCHECK ALL
          </button>
          <button
              className="selected_block__btn-delete selected_block__button"
              onClick={()=>this.deleteSelected()}
          >
              DELETE SELECTED
          </button>
        </div>
      </section>
    );
  }
}

export default Selected;
