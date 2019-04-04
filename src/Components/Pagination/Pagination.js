import React, { Component } from "react";
import "./Pagination.css";

class Pagination extends Component {
  state = {
    PREV_BUTTON_CLICK: 100,
    NEXT_BUTTON_CLICK: 200
  };

  passPageToParent = page => {
    const { fromParentSetCurrentPage } = this.props;
    fromParentSetCurrentPage(page);
  };

  onChangePageClick = (buttonPressed, currentPage, pagesCount) => {
    const { PREV_BUTTON_CLICK, NEXT_BUTTON_CLICK } = this.state;
    switch (buttonPressed) {
      case PREV_BUTTON_CLICK:
        if (currentPage > 1 && currentPage <= pagesCount) {
          this.passPageToParent(--currentPage);
        }
        break;
      case NEXT_BUTTON_CLICK:
        if (currentPage >= 1 && currentPage < pagesCount ) {
          this.passPageToParent(++currentPage);
        }
        break;
    }
  };

  render() {
    const {generalListOfTasks, currentPage, tasksCount} = this.props;
    const {PREV_BUTTON_CLICK, NEXT_BUTTON_CLICK} = this.state;
    let generalPageCount = Math.ceil(generalListOfTasks / tasksCount);
    let lcurrentPage = currentPage;

    if(lcurrentPage>generalPageCount){            //If after sorting\searching current page becoming bigger then general pages count
      lcurrentPage = generalPageCount;            //than I returned to last page from general pages count        
      this.passPageToParent(lcurrentPage)         
    }

      let pagesCount = [];
      for (let i = 1; i <= generalPageCount; i++) {
        pagesCount.push(
          <li className={lcurrentPage === i ?
            "item__title--checked" : 
            "item__title"}
             onClick={() => this.passPageToParent(i)}
          >
            {i}
          </li>
        );
      }
 
    if(generalPageCount > 1){
      return (
        <section className="pagination">
            <button
               className="pagination__button-prev"
               onClick={() => this.onChangePageClick(PREV_BUTTON_CLICK, lcurrentPage, pagesCount.length)}
            >
            PREV
            </button>
              <h2>{pagesCount}</h2>
            <button
              className="pagination__button-next"
              onClick={() => this.onChangePageClick(NEXT_BUTTON_CLICK, lcurrentPage, pagesCount.length)}
            >
            NEXT
            </button>
        </section>
      );
    }else{
      return <section className="pagination" />;
    }
  }
}
export default Pagination;
