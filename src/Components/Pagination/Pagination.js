import React, { Component } from "react";
import "./Pagination.css";

class Pagination extends Component {
  state = {
    currentPage: 0,
    tasksPerPage: 10,
    generalPagesCount: 0,
    PREV_BUTTON_CLICK: 100,
    NEXT_BUTTON_CLICK: 200
  };

  passPageToParent = page => {
    const {fromParentSetCurrentPage} = this.props;
    this.setState({
      currentPage: page
    });
    fromParentSetCurrentPage(page);
  };

  render() {
    const {listOfTasks} = this.props;
    const {tasksPerPage} = this.state;
    let pagesCount = [];
    for ( let i = 0; i < Math.ceil(listOfTasks.length / tasksPerPage); i++) {
      pagesCount.push(
        <li
          className="item"
          onClick={() => this.passPageToParent(i)}
        >
          {i}
        </li>
      );
    }

    if (listOfTasks.length > tasksPerPage) {
      return (
          <div 
            className="pagination"
            >
              <h2 
              className="item__title"
              >
              {pagesCount}
              </h2>
          </div>
        );
    } else {
      return <
        div className="pagination" 
        />;
    }
  }
}

export default Pagination;
