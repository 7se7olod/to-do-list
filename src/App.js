import React, {useState, useEffect} from "react";
import styles from './App.module.css';
import NewTask from "./components/User/NewTask";
import TaskList from "./components/User/TaskList";
import Popup from "./components/UI/Popup";
import {writeTaskData, loadDatabase, removeTaskDatabase, updateDatabase} from './Database.module';
import {removeTaskObject, addNewTaskObject} from './Storage.module';


function App() {

    const initialStatePopup = {isModal: false, title: '', content: ''};
    const [isModal, setIsModal] = useState(initialStatePopup);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadDatabase(setTasks);
    }, []);

    const showPopupHandler = (modal) => {
        setIsModal(modal);
    };

    const addNewTaskHandler = (newTask) => {

        let fileNames = [];
        for (let i = 0; i < newTask.files.length; i++) {
            fileNames.push(newTask.files[i].name);
            addNewTaskObject(newTask.files[i], `${newTask.id}/${newTask.files[i].name}`)
        }

        writeTaskData(newTask.id, newTask.title, newTask.description, newTask.date, fileNames);
    };

    const deletedTaskHandler = (taskRemove) => {

        const nameFilesPaths = Object(JSON.parse(taskRemove.files));
        const path = `tasks/${taskRemove.id}`;

        for (let i = 0; i < nameFilesPaths.length; i++) {
            removeTaskObject(`${taskRemove.id}/${nameFilesPaths[i]}`);
        };

        removeTaskDatabase(path);
        setTasks(tasks.filter(taskItem => taskItem.id !== taskRemove.id));
    };

    const changeTaskHandler = (changedTask) => {
        updateDatabase(changedTask.id, changedTask)
    };


    return (
        <React.Fragment>
            <div className={styles['main']}>
                <NewTask addNewTask={addNewTaskHandler}
                         showPopup={showPopupHandler}/>
                <TaskList tasks={tasks}
                          removeTaskItem={deletedTaskHandler}
                          changeTaskItem={changeTaskHandler}/>
                <Popup isVisible={isModal.isModal}
                       title={isModal.title}
                       content={isModal.content}
                       onClose={() => setIsModal(initialStatePopup)}/>
            </div>
        </React.Fragment>
    );
}

export default App;
