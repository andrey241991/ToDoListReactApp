import React, { Component } from 'react';
import './ListItem.css';

class ListItem extends Component{
    state = {
      edittedItem:false,
      edittedText: '',
      showButtons:false
    };

    editTask = item => {
      this.setState({
        edittedItem: true,
        edittedText: item.title
      });
    };

    cansel = () => {
      this.setState({
        edittedItem: false
      });
    };
    
    handleEditChange = event => {
      this.setState({
        edittedText: event.target.value
      });
    };

    removeTask = itemTask => {
      const {fromParentChangeListOfTasks} = this.props;
      fromParentChangeListOfTasks(itemTask);
    };

    setSelected = data => {
      const {selectedIds} = this.props;
      return selectedIds.includes(data);
    }

    setTaskChecked = item => {
      item.isCompleted = !item.isCompleted;
      this.forceUpdate();
    };

    removeTask = itemTask => {
      const { fromParentChangeListOfTasks } = this.props;
      fromParentChangeListOfTasks(itemTask);
    };

    saveTaskChanges = item => {
      const {edittedText} = this.state;
      item.title = edittedText;
      this.setState({
        edittedItem:false
      });
    };

    EditedListElement = item => (
      <section
        key={item.data}
        className={item.isCompleted ? 
          'list_item--completed ' : 
          'list_item--not-completed '}
      >
        <li 
          className={this.setSelected(item.data) ? 
            'list_item--selected ' : 
            'list_item--not-selected '}>
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
              onClick={() => this.cansel()}
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
            'list_item list_item--completed' :  
            'list_item list_item--not-completed'}
        >
          <li 
            className={this.setSelected(item.data) ? 
              'list_item list_item--selected' : 
              'list_item list_item--not-selected'}>
            <input
              className="list_item__checkbox" 
              type="checkbox"
              checked={item.isCompleted}
              onClick={() => this.setTaskChecked(item)}
              onChange={() => {}}
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
        const {item} = this.props;
        const {edittedItem} = this.state;
        let itemElement = this.ListElement(item);
        if(edittedItem){
          itemElement = this.EditedListElement(item);
        }
        return itemElement;
      }
}

export default ListItem;

