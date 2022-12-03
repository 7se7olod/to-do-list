import styles from './Task.module.css';
import React, {useState} from "react";
import DetailInfoTask from "../EditTask/DetailInfoTask";

const Task = (props) => {

    const day = new Date(props.date).toLocaleString('ru-RU', {day: '2-digit'});
    const month = new Date(props.date).toLocaleString('ru-RU', {month: 'short'});
    const year = new Date(props.date).getFullYear();
    const date = `${day} ${month} ${year}`;
    const [isVisibleTask, setIsVisibleTask] = useState(false);


    const viewingTask = () => {
        setIsVisibleTask(true);
    };

    const removeTaskItemHandler = (taskId) => {
        props.deleteTaskItem(taskId);
    };

    const changeTaskHandler = (changedTask) => {
        props.changeTaskItem(changedTask);
    };

    const getTaskClass = () => {
        if (JSON.parse(props.task.status)) {
            return styles.taskPerformed;
        }

        return props.date <= new Date().toLocaleDateString('en-ca') ? styles.taskDelay : styles.taskProcess;
    }

    return (
        <div>
            <div className={getTaskClass()}>
                <div>Задача: {props.title}</div>
                <div>Завершение задачи: {date}</div>
                <button type='button' onClick={viewingTask}>Просмотр</button>
            </div>
            {<DetailInfoTask
                isVisible={isVisibleTask}
                id={props.id}
                task={props.task}
                onClose={() => setIsVisibleTask(false)}
                deleteTask={removeTaskItemHandler}
                changeTask={changeTaskHandler}
                status={props.task.status}
            />}
        </div>
    );
}

export default Task;