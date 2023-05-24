import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Card from "./components/layout/Card";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import NewTask from "./components/ui/NewTask";
import TaskList from "./components/ui/TaskList";

function reducer(state, action) {
  if (action.type === "update") {
    const task = state.find((item) => {
      return item.id === action.id;
    });
    if (action.completed) {
      task.completed = true;
    } else {
      task.completed = false;
    }
    return [...state];
  }
  return [action.task, ...state];
}

function App() {
  const [action, setAction] = useState(1);
  const [displayStatus, setDisplayStatus] = useState("All");
  const initial = [];
  const [ListofTask, dispatchTask] = useReducer(reducer, initial);
  function addTaskToListHandler(task) {
    dispatchTask({ task });
  }
  const [taskArray, setTaskArray] = useState([]);

  function showAllTaskHandler() {
    setDisplayStatus("All");
    setTaskArray([...ListofTask]);
  }
  function showActiveTaskHandler() {
    setDisplayStatus("Active");
    const activeTaskList = ListofTask.filter((item) => {
      if (!item.completed) {
        return item;
      }
    });
    setTaskArray([...activeTaskList]);
  }
  function showCompletedTaskHandler() {
    setDisplayStatus("Completed");
    const completedTaskList = ListofTask.filter((item) => {
      if (item.completed) {
        return item;
      }
    });
    setTaskArray([...completedTaskList]);
  }

  function showAddingElements() {
    setAction(1);
  }

  function showSearchElements() {
    setAction(2);
  }

  function markCompleteHandler(id, completed) {
    dispatchTask({ type: "update", id, completed });
  }

  function searchItemInList(itemToSearch) {
    const results = ListofTask.filter((item) => {
      if (item.text.includes(itemToSearch)) {
        return item;
      }
    });
    setTaskArray([...results]);
  }
  return (
    <div className="container">
      <Card>
        <Header />
        <NewTask
          addToList={addTaskToListHandler}
          action={action}
          searchItem={searchItemInList}
        />
        <TaskList taskList={taskArray} markComplete={markCompleteHandler} />
        {taskArray.length === 0 && displayStatus === "All" && (
          <p className="emptyTask">Start by adding a task. 📝</p>
        )}
        {displayStatus === "Active" && taskArray.length === 0 && (
          <p className="emptyTask">No active task found! </p>
        )}
        {displayStatus === "Completed" && taskArray.length === 0 && (
          <p className="emptyTask">No task completed! </p>
        )}
        <Footer
          taskList={ListofTask}
          allTask={showAllTaskHandler}
          activeTask={showActiveTaskHandler}
          completedTask={showCompletedTaskHandler}
          addingElement={showAddingElements}
          searchElement={showSearchElements}
        />
      </Card>
    </div>
  );
}

export default App;
