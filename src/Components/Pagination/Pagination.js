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
    console.log("page", page);
    const { fromParentSetCurrentPage } = this.props;
    this.setState({
      currentPage: page
    });
    fromParentSetCurrentPage(page);
  };

  onChangePageClick = (buttonPressed, currentPage, pagesCount) => {
    const { PREV_BUTTON_CLICK, NEXT_BUTTON_CLICK } = this.state;
    switch (buttonPressed) {
      case PREV_BUTTON_CLICK:
        if (currentPage > 0 && currentPage <= pagesCount) {
          this.passPageToParent(--currentPage);
        }
        break;
      case NEXT_BUTTON_CLICK:
        if (currentPage >= 0 && currentPage < pagesCount - 1) {
          this.passPageToParent(++currentPage);
        }
        break;
    }
  };



  render() {
    //comment
    const {pagesCount, currentPage} = this.props;
    const {tasksPerPage, PREV_BUTTON_CLICK, NEXT_BUTTON_CLICK, currentPage} = this.state;
    let pagesCount = [];
    for (let i = 0; i < Math.ceil(listOfTasks.length / tasksPerPage); i++) {
      pagesCount.push(
        <li className={currentPage === i ?
          "item__title--checked" : 
          "item__title"}
           onClick={() => this.passPageToParent(i)}
        >
            {i}
        </li>
      );
    }
    
    if (listOfTasks.length > tasksPerPage) {
      return (
        <section className="pagination">
            <button
                className="pagination__button-prev"
                onClick={() =>
                this.onChangePageClick(
                PREV_BUTTON_CLICK,
                currentPage,
                pagesCount.length)}
            >
                PREV
            </button>
            <h2>{pagesCount}</h2>
            <button
                className="pagination__button-next"
                onClick={() =>
                this.onChangePageClick(
                NEXT_BUTTON_CLICK,
                currentPage,
                pagesCount.length)}
            >
                NEXT
            </button>
        </section>
      );
    } else {
      return <section className="pagination" />;
    }
  }
}

export default Pagination;
