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
    const {fromParentChangeListOfTasks} = this.props;
    fromParentChangeListOfTasks(itemTask);
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
      <div  
        key={item.data} 
        className={item.isCompleted 
          ? "item--completed" 
          : "item--notcompleted"}
        >
          <li
            className={item.isSelected 
              ? "item--selected" 
              : "item--notselected"}
          >
            <input
              className="item__input"
              maxLength="40"
              onChange={this.handleEditChange}
            />
            <div 
              className="buttons_block"
              >
              <button
               className="button_block__savebtn"
               onClick={() => this.saveTaskChanges(item)}
              >
              Save
              </button>
              <button
               className="button_block__cancelbtn"
               onClick={() => this.editTask(item)}
              >
              Cancel
              </button>
            </div>
          </li>
     </div>
    )

     ListElement = (item) => (
        <div 
        key={item.data} 
        className={item.isCompleted 
          ? "item--completed" 
          : "item--notcompleted"}
        >
          <li
            className={item.isSelected 
              ? "item--selected" 
              : "item--notselected"}
          >
            <input
              className="item__checkbox"
              type="checkbox"
              onClick={() => this.setTaskChecked(item)}
            />
            {item.title}
            <div
             className="buttons_block">
              <button 
              className="buttons_block__editbtn"
              onClick={() => this.editTask(item)}
              >
              Edit
              </button>
              <button
               className="buttons_block__removebtn"
               onClick={() => this.removeTask(item)}
               >
               Remove
               </button>
              <button 
              className="buttons_block__donebtn"
              onClick={() => this.setTaskChecked(item)}
              >
              Done
              </button>
            </div>
          </li>
        </div>
      )
   

    render() {
    const {listOfTasks} = this.props;
    return (
      <ol 
      className="list"
      >
        {listOfTasks.map(item => {
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
