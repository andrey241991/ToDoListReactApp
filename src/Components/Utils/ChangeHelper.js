const SetChangedTasks = (generalTasks, filterTasksBy, currentPage, searchedText, tasksCount) => {
    console.log('tasksCount = ' + tasksCount + 'tasksCount type = ' + typeof (tasksCount));
    let newTasks = [];
    newTasks = searchByTitle(generalTasks, searchedText);
    newTasks = sortTasks(newTasks, filterTasksBy);
    newTasks = setPagination(newTasks, currentPage, tasksCount);
    return newTasks;
};

const GetSortedTasks = (generalTasks, filterTasksBy, searchedText) => {
    let newTasks = [];
    newTasks = searchByTitle(generalTasks, searchedText);
    newTasks = sortTasks(newTasks, filterTasksBy);
    return newTasks.length;
};

function searchByTitle(generalTasks, searchedText) {
    if (searchedText.length < 2) {
        return generalTasks;
    }

    let newTasks = [];
    for (let value of generalTasks) {
        if (value.title.toLowerCase().includes(searchedText.toLowerCase())) {
            newTasks.push(value);
        }
    }
    return newTasks.length > 0 ? newTasks : generalTasks;
}

function sortTasks(generalTasks, filterTasksBy) {
    let sortedTasks = [];
    var clonedTasks = generalTasks.slice(0);

    if (filterTasksBy === undefined) {
        return generalTasks;
    }

    switch (filterTasksBy.by) {
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
        default: {
        }
    }

    function filterByTitle() {
        sortedTasks = clonedTasks.sort((a, b) => a.title.localeCompare(b.title));
        if (filterTasksBy.sortUp) {
            sortedTasks = sortedTasks.reverse();
        }
    }

    function filterByOrigin() {
        sortedTasks = clonedTasks.sort((a, b) => a.data - b.data);
        if (filterTasksBy.sortUp) {
            sortedTasks = sortedTasks.reverse();
        }
    }

    function filterByComplited() {
        for (let value of clonedTasks) {
            if (value.isCompleted === true) {
                sortedTasks.push(value);
            }
        }
    }

    function filterByActive() {
        for (let value of clonedTasks) {
            if (value.isCompleted === false) {
                sortedTasks.push(value);
            }
        }
    }

    return sortedTasks;
}

function setPagination(newTasks, currentPage, tasksCount) {
    currentPage--;
    return newTasks.slice(currentPage * tasksCount, (currentPage + 1) * tasksCount);
}

export {SetChangedTasks, GetSortedTasks};
