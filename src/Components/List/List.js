import React, { Component } from "react";
import "./List.css";
import { FORMERR } from "dns";

class List extends Component {

  state = {
    listOfTasks: this.props.listOfTasks,
    edittedText: ""
  };

  setTaskChecked = item => {
    item.isCompleted = !item.isCompleted;
    this.forceUpdate();
  };

  removeTask = itemTask => {
    let newTasks = [];
    for (let value of this.props.listOfTasks) {
      if (value.data !== itemTask.data) {
        newTasks.push(value);
      }
    }
    this.props.fromParentChangeListOfTasks(newTasks);
  };

  editTask = item => {
    item.isEdit = !item.isEdit;
    this.forceUpdate();
  };

  handleEditChange = event => {
    this.setState({
      edittedText: event.target.value
    });
  };

  saveTaskChanges = item => {
    item.title = this.state.edittedText;
    this.editTask(item);
  };

     EditedListElement = (item) => (
        <div className={item.isCompleted ? "completed" : "not-completed"}>
          <li
            key={item.data}
            className={item.isSelected ? "selected" : "not-selected"}
          >
            <input
              className="list-edit-input"
              maxLength="40"
              onChange={this.handleEditChange}
            />
            <div className="list-button">
              <button onClick={() => this.saveTaskChanges(item)}>Save</button>
              <button onClick={() => this.editTask(item)}>Cancel</button>
            </div>
          </li>
        </div>
    )

     ListElement = (item) => {
      return (
        <div className={item.isCompleted ? "completed" : "not-completed"}>
          <li
            key={item.data}
            className={item.isSelected ? "selected" : "not-selected"}
          >
            <input
              className="checkbox"
              type="checkbox"
              onClick={() => this.setTaskChecked(item)}
            />
            {item.title}
            <div className="list-button">
              <button onClick={() => this.editTask(item)}>Edit</button>
              <button onClick={() => this.removeTask(item)}>Remove</button>
              <button onClick={() => this.setTaskChecked(item)}>Done</button>
            </div>
          </li>
        </div>
      );
    }

    render() {
    return (
      <ol className="List">
        {this.props.listOfTasks.map(item => {
          if (item.isEdit) {
           return this.EditedListElement(item)
          } else {
           return this.ListElement(item)
          }
        })}
      </ol>
    );
  }
}

export default List;
