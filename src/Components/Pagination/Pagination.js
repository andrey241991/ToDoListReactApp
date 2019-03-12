
import React, { Component } from "react";
import "./Pagination.css";

class Pagination extends Component {

   state = {
      currentPage:0,
      tasksPerPage: 10,
      generalPagesCount:0,
      PREV_BUTTON_CLICK: 100,
      NEXT_BUTTON_CLICK: 200,
    };


passPageToParent= (page) => {
  console.log("PAGE= " + page);
  this.setState({
    currentPage: page
  })
  this.props.fromParentSetCurrentPage(page);
}    

onChangePageClick = (page) => {

//   switch(page){
//     case this.state.PREV_BUTTON_CLICK:
//     if(this.state.currentPage>0 && this.state.currentPage < this.state.generalPagesCount -1){
//       this.passPageToParent(--this.state.currentPage);
//     }
//     break;
//     case this.state.NEXT_BUTTON_CLICK:
//    // let increasedPage = ++this.state.currentPage;
//     if(this.state.currentPage>0 && this.state.currentPage < this.state.generalPagesCount -1){
//       this.passPageToParent(++this.state.currentPage);
//     }
//     break;
//     default:
//     this.passPageToParent(page);
//     break;

  }
// };


  render() {
    let pagesCount = [];
    for (let i = 0; i < Math.ceil(this.props.listOfTasks.length / this.state.tasksPerPage); i++) {
      pagesCount.push(
        <li className="Pagination-element"
          onClick={()=>this.passPageToParent(i)}>
         {i}
        </li>
      );
      // this.passPageToParent(pagesCount.length); 
    }

    this.state.generalPagesCount = pagesCount.length;
    // this.passPageToParent(pagesCount.length);         // сделать это в цикле

    //this.props.fromParentSetCurrentPage(this.state.generalPagesCount);
    
    if (this.props.listOfTasks.length > this.state.tasksPerPage) {
     // this.passPageToParent(pagesCount.length); 
      return (
        <div className="Pagination">
          <button onClick={()=>this.onChangePageClick(this.state.PREV_BUTTON_CLICK)}>PREV</button>
          <h2>{pagesCount}</h2>
          <button onClick={()=>this.onChangePageClick(this.state.NEXT_BUTTON_CLICK)}>NEXT</button>
        </div>
      );
    } else {
      return <div className="Pagination" />;
    }

  }
}

export default Pagination;
