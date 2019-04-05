import React, { Component } from 'react';
import './Selected.css';

class Selected extends Component {

  selectItem = () =>{
    const {fromParentSelect} = this.props;
    let selectedValue = document.getElementById('selected_block__pages-count-select').value;
    fromParentSelect(selectedValue);
  }

  render() {
    return (
      <section className='selected_block'>
        <select id="selected_block__pages-count-select" onChange={()=>this.selectItem()}>
          <option value="">...</option>
          <option value="100">Select All</option>
          <option value="200">Unselect All</option>
          <option value="300">Delete Selected</option>
        </select>
      </section>
    );
  }
} 

export default Selected;

 

