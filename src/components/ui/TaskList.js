import { Fragment } from "react";
import classes from "./TaskList.module.css";
const TaskList = (props) => {
  function taskIsCompletedHandler(event) {
    props.markComplete(event.target.id, event.target.checked);
  }
  return (
    <div className={classes.box}>
      {props.taskList.map((item) => {
        return (
          <div key={item.id} className={classes.container}>
            <input
              className={classes.checkbox}
              type="checkbox"
              onChange={taskIsCompletedHandler}
              id={item.id}
              checked={item.completed}
            />
            <p className={item.completed ? classes.strike : classes.p}>
              {item.text}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
