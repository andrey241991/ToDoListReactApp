import React, { Component } from "react";

class ListItem extends Component{

    

  render() {
    return (
      <section className="input">
        if (this.checkIfEdit(item.data)) {
            return ListItem;
          } else {
            return <ListItem/>;
          }
      </section>
    );
  }
}

export default ListItem;