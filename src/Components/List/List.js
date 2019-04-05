import React, { Component } from 'react';
import './List.css';
import ListItem from '../LIstItem/ListItem';

class List extends Component {

removeTask = itemTask => {
  const {fromParentChangeListOfTasks} = this.props;
  fromParentChangeListOfTasks(itemTask);
};

render() {
  const {changedListOfTasks, selectedIds} = this.props;
  return (
    <ol className="list">
      {changedListOfTasks.map(item => {
        return <ListItem
          key={item.data}
          fromParentChangeListOfTasks={this.removeTask}
          item={item}
          selectedIds={selectedIds}
        />;
      })}
    </ol>
  );
}
}

export default List;
