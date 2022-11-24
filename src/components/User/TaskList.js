import styles from './TaskList.module.css'
import Task from "./Task";

const TaskList = (props) => {

    const removeTaskHandler = (taskId) => {
        props.removeTaskItem(taskId)
    };

    const changeTaskHandler = (changedTask) => {
        props.changeTaskItem(changedTask);
    };

    return (
        <div className={styles['user-list']}>
            {(props.tasks.length > 0) ? props.tasks.map(task => <Task
                key={task.id}
                id={task.id}
                title={task.title}
                task={task}
                description={task.description}
                date={task.date}
                files={task.files}
                deleteTaskItem={removeTaskHandler}
                changeTaskItem={changeTaskHandler}
            />) : "Задач нет"}
        </div>
    );
};

export default TaskList;