import { useEffect, useState } from "react";
import classes from "./Footer.module.css";
const Footer = (props) => {
  const completedNumber = props.taskList.reduce((acc, value) => {
    if (!value.completed) {
      acc++;
    }
    return acc;
  }, 0);

  useEffect(() => {
    allTaskHandler();
  }, [completedNumber]);
  useEffect(() => {}, []);
  const [taskStatus, setTaskStatus] = useState("allTask");
  const [action, setAction] = useState("add");
  function allTaskHandler() {
    setTaskStatus("allTask");
    props.allTask();
  }
  function activeTaskHandler() {
    setTaskStatus("activeTask");
    props.activeTask();
  }
  function completedTaskHandler() {
    setTaskStatus("completedTask");
    props.completedTask();
  }
  function taskAddition() {
    setAction("add");
    props.addingElement();
  }
  function searchTask() {
    setAction("search");
    props.searchElement();
  }

  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <span
          className={
            action === "add"
              ? `${classes.plus} ${classes.active}`
              : classes.plus
          }
          onClick={taskAddition}
        >
          +
        </span>
        <span
          className={
            action === "search"
              ? `${classes.find} ${classes.active}`
              : classes.find
          }
          onClick={searchTask}
        >
          🔍
        </span>
      </div>
      <div className={classes.countDiv}>
        <span>
          {completedNumber}
          &nbsp;items left
        </span>
      </div>
      <div className={classes.status}>
        <span
          className={taskStatus === "allTask" ? classes.active : ""}
          onClick={allTaskHandler}
        >
          All
        </span>
        <span
          className={taskStatus === "activeTask" ? classes.active : ""}
          onClick={activeTaskHandler}
        >
          Active
        </span>
        <span
          className={taskStatus === "completedTask" ? classes.active : ""}
          onClick={completedTaskHandler}
        >
          Completed
        </span>
      </div>
    </div>
  );
};

export default Footer;
