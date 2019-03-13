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
    console.log("PAGE= " + page);
    this.setState({
      currentPage: page
    });
    this.props.fromParentSetCurrentPage(page);
  };

  render() {
    let pagesCount = [];
    for (
      let i = 0;
      i < Math.ceil(this.props.listOfTasks.length / this.state.tasksPerPage);
      i++
    ) {
      pagesCount.push(
        <li
          className="Pagination-element"
          onClick={() => this.passPageToParent(i)}
        >
          {i}
        </li>
      );
    }

    if (this.props.listOfTasks.length > this.state.tasksPerPage) {
      return (
        <div className="Pagination">
          <h2>{pagesCount}</h2>
        </div>
      );
    } else {
      return <div className="Pagination" />;
    }
  }
}

export default Pagination;
