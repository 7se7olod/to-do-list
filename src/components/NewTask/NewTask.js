import styles from './NewTask.module.css'
import FormTask from "./FormTask";
import React, { useState } from "react";

const NewTask = (props) => {

    const newTask = (newTask) => {
        props.addNewTask(newTask);
    };

    const [isFormVisible, setIsFormVisible] = useState(false);

    const showFormTaskHandler = () => {
      setIsFormVisible(true);
    };

    const cancelFormHandler = () => {
        setIsFormVisible(false);
    };


  return (
      <div className={styles['new-task']}>
          {!isFormVisible && <button type='button' onClick={showFormTaskHandler}>Добавить новую задачу</button>}
          {isFormVisible && <FormTask addNewTask={newTask} onCancel={cancelFormHandler}/>}
      </div>
  );
};

export default NewTask;