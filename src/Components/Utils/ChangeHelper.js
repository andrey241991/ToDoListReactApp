
const SetChangedTasks = (generalTasks, filterTasksBy, currentPage) => {
   let newTasks = [];
   newTasks = sortTasks(generalTasks, filterTasksBy);
   newTasks = setPagination(newTasks, currentPage);
   return newTasks;
}

const GetSortedTasks = (generalTasks, filterTasksBy) => {
   let newTasks = [];
   newTasks = sortTasks(generalTasks, filterTasksBy);
   return newTasks;
}

function sortTasks(generalTasks, filterTasksBy){   
   let sortedTasks = []; 
   var clonedTasks = generalTasks.slice(0);

   if(filterTasksBy === undefined){
      return generalTasks;
   }

   switch(filterTasksBy.by){
      case '':
      return generalTasks;
      case 'activeTasks':
         filterByActive();
      break;
      case 'complitedTasks':
         filterByComplited();
      break;
      case 'title':
         filterByTitle();
      break;
      case 'origin':
         filterByOrigin();
       break;
   }

   function filterByTitle(){  
      sortedTasks = clonedTasks.sort((a, b) => a.title.localeCompare(b.title));
   }

   function filterByOrigin(){
      sortedTasks = clonedTasks.sort((a, b) =>a.data - b.data);
   }

   function filterByComplited(){
      for (let value of clonedTasks) {
         if (value.isCompleted === true) {
            sortedTasks.push(value);
         }
       }
   }

   function filterByActive(){
      for (let value of clonedTasks) {
         if (value.isCompleted === false) {
            sortedTasks.push(value);
         }
      }  
   }
   return sortedTasks;
}

function setPagination(newTasks, currentPage){
   let firstTask = 0;
   if(currentPage >0){
      firstTask = currentPage * 10;
   }
   
   let lastTask = firstTask + 10;
   let newListOfTasks = [];
   for (let i = 0; i < newTasks.length; i++) {
      if (i >= firstTask && i < lastTask) {
        newListOfTasks.push(newTasks[i]);
      }
    }
    return newListOfTasks;
}

export {SetChangedTasks, GetSortedTasks}