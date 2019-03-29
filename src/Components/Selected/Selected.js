import React, { Component } from "react";
import "./Selected.css";

class Selected extends Component {

  render() {
    const {fromParentClickOnSelectAll, fromParentClickOnUnSelectAll, fromParentClickOnDeleteSelected} = this.props;
    return (
      <section className="selected">
        <div className="selected_block"> 
          <button
              className="selected_block__btn-check selected_block__button"
              onClick={fromParentClickOnSelectAll}
          >
              CHECK ALL
          </button>
          <button 
              className="selected_block__btn-uncheck selected_block__button"
              onClick={fromParentClickOnUnSelectAll}
          >
              UNCHECK ALL
          </button>
          <button
              className="selected_block__btn-delete selected_block__button"
              onClick={fromParentClickOnDeleteSelected}
          >
              DELETE SELECTED
          </button>
        </div>
      </section>
    );
  }
}

export default Selected;
