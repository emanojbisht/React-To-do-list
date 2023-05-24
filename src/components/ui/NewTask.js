import classes from "./NewTask.module.css";
import { Fragment, useState } from "react";

const NewTask = (props) => {
  const [task, setTask] = useState("");
  const [error, setError] = useState(false);
  function setTaskHandler(event) {
    setError(false);
    setTask(event.target.value);
  }

  function addTaskHandler() {
    if (task === "") {
      setError(true);
    } else {
      const taskData = {
        id: new Date().toISOString(),
        text: task,
        completed: false,
      };
      setTask("");
      props.addToList(taskData);
    }
  }

  function searchTaskitems() {
    if (task === "") {
      setError(true);
    } else {
      props.searchItem(task);
      setTask("");
    }
  }

  return (
    <Fragment>
      {props.action === 1 && (
        <div className={classes.container}>
          <input
            className={
              error ? `${classes.error} ${classes.input}` : classes.input
            }
            type="text"
            placeholder="Add New"
            onChange={setTaskHandler}
            value={task}
          />
          <button className={classes.button} onClick={addTaskHandler}>
            Add Task
          </button>
        </div>
      )}
      {props.action === 2 && (
        <div className={classes.container}>
          <input
            className={
              error ? `${classes.error} ${classes.input}` : classes.input
            }
            type="text"
            placeholder="Search"
            onChange={setTaskHandler}
            value={task}
          />
          <button className={classes.btnBlue} onClick={searchTaskitems}>
            Search Task
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default NewTask;
