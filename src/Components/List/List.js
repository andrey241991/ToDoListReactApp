import React, { Component } from "react";
import "./List.css";
import { FORMERR } from "dns";

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfTasks: this.props.listOfTasks
    };

    this.setTaskChecked = this.setTaskChecked.bind(this);
    // this.removeTask = this.removeTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    console.log("My list of tasks =" + this.props.listOfTasks);
  }

  setTaskChecked(item) {
    item.isCompleted = !item.isCompleted;
    this.forceUpdate();
  }

  // removeTask(item){
  //   for (let value of this.props.listOfTasks) {
  //     value.data = item.data;
  //   }
  //   this.props.fromParentChangeListOfTasks(this.props.listOfTasks);
  // }

  removeTask(item) {
    console.log(this.state.listOfTasks);
    this.setState({
      listOfTasks: this.state.listOfTasks.filter(t => {
        return t.data !== item.data;
      })
    });
    this.props.fromParentChangeListOfTasks(this.state.listOfTasks);

    console.log(this.state.listOfTasks);
  }

  deleteTask(itemTask) {
    let newTasks = [];
    for (let value of this.props.listOfTasks) {
      if (value !== itemTask) {
        console.log("Delete selected add tonew Array = " + value.title);
        newTasks.push(value);
      }
    }
    this.props.fromParentChangeListOfTasks(newTasks);
  }

  editTask(item) {
    item.isEdit = true;   ///поменять тут
    this.forceUpdate();
  }

  render() {
    return (
      <ol className="List">
        {this.props.listOfTasks.map(item => {
          if(item.isEdit){
            return (
              console.log("MY LOG=" + this.props.listOfTasks),
              (
                <div className={item.isCompleted ? "completed" : "not-completed"}>
                  <li
                    key={item.data}
                    className={item.isSelected ? "selected" : "not-selected"}
                  >
                  <input onChange={this.handleInputChange} value={item.title}/>
                    <button onClick={() => this.editTask(item)}>Save</button>
                    <button>Cancel={onCa}</button>
                  </li>
                </div>
              )
            );
          }else{
            return (
              console.log("MY LOG=" + this.props.listOfTasks),
              (
                <div className={item.isCompleted ? "completed" : "not-completed"}>
                  <li
                    key={item.data}
                    className={item.isSelected ? "selected" : "not-selected"}
                  >
                    <input
                      className="checkbox"
                      type="checkbox"
                      onClick={() => this.setTaskChecked(item)}
                    />
                    {item.title}
                    <button onClick={() => this.editTask(item)}>Edit</button>
                    <button onClick={() => this.deleteTask(item)}>Remove</button>
                    <button onClick={() => this.setTaskChecked(item)}>
                      Done
                    </button>
                  </li>
                </div>
              )
            );
          }
        })}
      </ol>
    );
  }
}

export default List;


// render() {
//   return (
//     <ol className="List">
//       {this.props.listOfTasks.map(item => {
//         if(item.isEdit){

//         }else{
          
//         }


//         return (
//           console.log("MY LOG=" + this.props.listOfTasks),
//           (
//             <div className={item.isCompleted ? "completed" : "not-completed"}>
//               <li
//                 key={item.data}
//                 className={item.isSelected ? "selected" : "not-selected"}
//               >
//                 <input
//                   className="checkbox"
//                   type="checkbox"
//                   onClick={() => this.setTaskChecked(item)}
//                 />
//                 {item.title}
//                 <button onClick={(item.isEdit = true)}>Edit</button>
//                 <button onClick={() => this.deleteTask(item)}>Remove</button>
//                 <button onClick={() => this.setTaskChecked(item)}>
//                   Done
//                 </button>
//               </li>
//             </div>
//           )
//         );
//       })}
//     </ol>
//   );
// }
// }