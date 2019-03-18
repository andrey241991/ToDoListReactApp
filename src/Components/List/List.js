import React, { Component } from "react";
import "./List.css";
import { FORMERR } from "dns";

class List extends Component {
  state = {
    listOfTasks: this.props.listOfTasks,
    edittedText: "",
    selectedIds: this.props.selectedIds
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
    item.isEdit = !item.isEdit;
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
    item.title = this.state.edittedText;
    this.editTask(item);
  };

  setSelected = data => {
    const {selectedIds} = this.props;
    if(selectedIds.includes(data)){
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
            className={this.props.selected ? 
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
                className="list_item__checkbox"  //посатвить ветвелнеи как раньше
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
    const { listOfTasks } = this.props;
    return (
      <ol className="list">
        {listOfTasks.map(item => {
          if (item.isEdit) {
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
