import './Filters.css';
import React, { Component } from "react";

class Filters extends Component {

    state = {
      sortByTitleUp:false,
      sortByOriginUp:false
    }

    filterTasks = filterTasksBy =>{
      const{fromParentfilterTasks} = this.props;
      const{sortByTitleUp, sortByOriginUp} = this.state;

      switch(filterTasksBy.by){
      case 'title':
        this.setState({
          sortByTitleUp :!sortByTitleUp
        });
        filterTasksBy.sortUp = !sortByTitleUp;
        break;
      case 'origin':
        this.setState({
          sortByOriginUp :!sortByOriginUp
        });
        filterTasksBy.sortUp = !sortByOriginUp;
        break;
      }

      fromParentfilterTasks(filterTasksBy);
    }

    render() {
      const {sortByTitleUp, sortByOriginUp} = this.state;
      let titleText = sortByTitleUp ? 'SORT BY Z-A' : 'SORT BY A-Z'; 

      return (
        <aside className="filters">
          <div 
            className="filters__block block block--show-all" 
            onClick={()=> this.filterTasks({by:''})}
          >
            SHOW ALL
          </div>
          <div 
            className="filters__block block block--show-active" 
            onClick={()=> this.filterTasks({by:'activeTasks'})}
          >
            SHOW ACTIVE
          </div>
          <div 
            className="filters__block block block--show-completed" 
            onClick={()=> this.filterTasks({by:'complitedTasks'})}
          >
            SHOW COMPLETED
          </div>
          <div 
            className="filters__block block block--sort-by-alphabet" 
            onClick={()=> this.filterTasks({by:'title'})}
          >
            {titleText}
          </div>
          <div 
            className="filters__block block block--sort-by-origin" 
            onClick={()=> this.filterTasks({by:'origin'})}
          >
            SORT BY ORIGIN
            <span className={`block__arrow ${sortByOriginUp ? 'block__arrow--flip' : ''  }`}>&uarr;</span>
          </div>
        </aside>
      );
    }
}

export default Filters;
