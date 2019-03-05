import React, { Component } from "react";
import "./List.css";
import { FORMERR } from "dns";

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfTasks: this.props.listOfTasks,
      edittedText: ""
    };

    this.setTaskChecked = this.setTaskChecked.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.saveTaskChanges = this.saveTaskChanges.bind(this);
  }

  setTaskChecked(item) {
    item.isCompleted = !item.isCompleted;
    this.forceUpdate();
  }

  removeTask(itemTask) {
    let newTasks = [];
    for (let value of this.props.listOfTasks) {
      if (value !== itemTask) {
        newTasks.push(value);
      }
    }
    this.props.fromParentChangeListOfTasks(newTasks);
  }

  editTask(item) {
    item.isEdit = !item.isEdit;
    this.forceUpdate();
  }

  handleEditChange(event) {
    this.setState({
      edittedText: event.target.value
    });
  }

  saveTaskChanges(item) {
    item.title = this.state.edittedText;
    this.editTask(item);
  }

  render() {
    return (
      <ol className="List">
        {this.props.listOfTasks.map(item => {
          if (item.isEdit) {
            return (
              console.log("MY LOG=" + this.props.listOfTasks),
              (
                <div
                  className={item.isCompleted ? "completed" : "not-completed"}
                >
                  <li
                    key={item.data}
                    className={item.isSelected ? "selected" : "not-selected"}
                  >
                    <input onChange={this.handleEditChange} />
                    <button onClick={() => this.saveTaskChanges(item)}>
                      Save
                    </button>
                    <button onClick={() => this.editTask(item)}>Cancel</button>
                  </li>
                </div>
              )
            );
          } else {
            return (
              console.log("MY LOG=" + this.props.listOfTasks),
              (
                <div
                  className={item.isCompleted ? "completed" : "not-completed"}
                >
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
                    <button onClick={() => this.removeTask(item)}>
                      Remove
                    </button>
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
