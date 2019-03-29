import React, { Component } from "react";
import "./List.css";
import { FORMERR } from "dns";

class List extends Component {
  state = {
    edittedText: "",
    editItems:[]
  };

  setTaskChecked = item => {
    item.isCompleted = !item.isCompleted;
    this.forceUpdate();
  };

  removeTask = itemTask => {
    const { fromParentChangeListOfTasks } = this.props;
    fromParentChangeListOfTasks(itemTask);
  };

  editTask = item => {
    this.state.editItems.push(item.data);
    console.log(this.state.editItems.length);
    this.setState({
      edittedText: item.title
    });
  };

  handleEditChange = event => {
    this.setState({
      edittedText: event.target.value
    });
  };

  saveTaskChanges = item => {
    const {editItems} = this.state;
    item.title = this.state.edittedText;
    let newEditItems = [];

    for(let i=0; i<editItems.length; i++){
        if(editItems[i] !==item.data){
          newEditItems.push(editItems[i]);
        }
    }
    this.setState({
      editItems: newEditItems
    });
  };

  setSelected = data => {
    const {selectedIds} = this.props;
    if(selectedIds.includes(data)){
      return true;
    }else{
      return false;
    }
  }

  checkIfEdit = data =>{
    const {editItems} = this.state;
    if(editItems.includes(data)){
      return true;
    }else{
      return false;
    }

  }

  EditedListElement = item => (
    <section
        key={item.data}
        className={item.isCompleted ? 
        "list_item--completed " : 
        "list_item--not-completed "}
    >
        <li 
            className={this.setSelected(item.data) ? 
            "list_item--selected " : 
            "list_item--not-selected "}>
            <input
                value={this.state.edittedText}
                className="list_item__input"
                maxLength="40"
                onChange={this.handleEditChange}
            />
            <div className="list_item_block">
                <button
                    className="list_item__button list_item_block__button-save"
                    onClick={() => this.saveTaskChanges(item)}
                >
                    Save
                </button>
                <button
                    className="list_item__button list_item_block__button-cancel"
                    onClick={() => this.editTask(item)}
                >
                    Cancel
                </button>
            </div>
      </li>
    </section>
  );

  ListElement = item => (
    <section
        key={item.data}
        className={item.isCompleted ? 
        "list_item list_item--completed " :  
        "list_item list_item--not-completed "}
    >
      <li 
          className={this.setSelected(item.data) ? 
          "list_item list_item--selected" : 
          "list_item list_item--not-selected "}>
            <input
                className="list_item__checkbox" 
                type="checkbox"
                checked={item.isCompleted}
                onClick={() => this.setTaskChecked(item)}
            />
            {item.title}
            <div className="list_item__block">
                <button
                    className="list_item__button list_item_block__button-edit"
                    onClick={() => this.editTask(item)}
                >
                    Edit
                </button>
                <button
                    className="list_item__button list_item_block__button-remove"
                    onClick={() => this.removeTask(item)}
                >
                    Remove
                </button>
                <button
                    className="list_item__button list_item_block__button-done"
                    onClick={() => this.setTaskChecked(item)}
                >
                    Done
                </button>
            </div>
     </li>
    </section>
  );

  render() {
    const {changedListOfTasks, selectedIds} = this.props;
    return (
      <ol className="list">
        {changedListOfTasks.map(item => {
          if (this.checkIfEdit(item.data)) {
            return this.EditedListElement(item);
          } else {
            return this.ListElement(item);
          }
        })}
      </ol>
    );
  }
}

export default List;
