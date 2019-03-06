
import React, { Component } from "react";
import "./Pagination.css";

class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listOfTasks: this.props.listOfTasks,
            currentPage: 1,
            tasksPerPage: 10
          };
    }


  render() {
    // console.log("RENDER FUNCTION IN PAGINATION");
    // console.log("RENDER FUNCTION IN PAGINATION this.props.listOfTasks = " + this.props.listOfTasks);


    let {listOfTasks, currentPage, tasksPerPage } = this.state;


    let pagesCount = [];
    for (let i = 1; i < Math.ceil(listOfTasks.length / tasksPerPage); i++) {
      pagesCount.push(
        <li className="Pagination-element">
          <a href="#">{i}</a>
        </li>
      );
      // pagesCount.push(i);
    }

    console.log("FUNCTION IN PAGINATION in listOfTasks = " + this.state.listOfTasks.length);

    if (listOfTasks.length > tasksPerPage) {
      return (
        <div className="Pagination">
          <button>PREV</button>
          {pagesCount}
          <button>NEXT</button>
        </div>
      );
    } else {
      return <div className="Pagination" />;
    }

  }
}

export default Pagination;

