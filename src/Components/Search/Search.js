import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
 
  handleSearchChange =(event)=>{
    const {fromParantSearchByTitle} = this.props;
    fromParantSearchByTitle(event.target.value);
  }

  render() {
    return (
      <section className="search">
      <div className='search_block'>
      <input
          placeholder='Input please your search text'
          className="search__input"
          maxLength="40"
          onChange={this.handleSearchChange}
        />
        </div>
      </section>
    );
  }
}

export default Search;

