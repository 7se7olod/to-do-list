import React, {useState, useEffect} from "react";
import styles from './App.module.css';
import NewTask from "./components/NewTask/NewTask";
import TaskList from "./components/TasksList/TaskList";
import {writeTaskData, loadDatabase, removeTaskDatabase, updateDatabase} from './Firebase/Database.module';
import {removeTaskObject, addNewTaskObject} from './Firebase/Storage.module';


function App() {
    
    const [tasks, setTasks] = useState([]);
    
    /** Загрузка всех задач из БД */
    const firstLoadingTasks = () => {
        loadDatabase(setTasks);
    };

    /** Один запуск загрузки задач (второй аргумент для ограниченя повторных запусков) */
    useEffect(firstLoadingTasks, []);

    /** Добавление новой задачи в список */
    const addNewTaskHandler = (newTask) => {

        let fileNames = []; /** Пустой массив названий файлов для записи в database*/
        /** Проходимся по всем выбранным файлам.*/
        for (let i = 0; i < newTask.files.length; i++) {
            fileNames.push(newTask.files[i].name); /** Добавляем имена файлов в массив fileNames*/
            addNewTaskObject(newTask.files[i], `${newTask.id}/${newTask.files[i].name}`) /** Добавляем сами файлы по назначенному пути в FB Storage */
        }

        /** Записываем все данные в FB database*/
        writeTaskData(newTask.id, newTask.title, newTask.description, newTask.date, fileNames);
    };

    /** Удаление задачи из списка */
    const deletedTaskHandler = (taskRemove) => {

        const nameFilesPaths = Object(JSON.parse(taskRemove.files)); /** Массив названий файлов */
        const path = `tasks/${taskRemove.id}`;  /** Путь до конкретной задачи */

        for (let i = 0; i < nameFilesPaths.length; i++) { /** Удаление всех файлов из задачи в storage */
            removeTaskObject(`${taskRemove.id}/${nameFilesPaths[i]}`);
        };

        removeTaskDatabase(path); /** Удаление задачи из database */
        setTasks(tasks.filter(taskItem => taskItem.id !== taskRemove.id)); /** Удаляем задачу по id задачи */
    };

    /** Изменение задачи из списка*/
    const changeTaskHandler = (changedTask) => {
        /** Обновление задачи по id */
        updateDatabase(changedTask.id, changedTask)
    };


    return (
        <React.Fragment>
            <div className={styles['main']}>
                <NewTask addNewTask={addNewTaskHandler}/>
                <TaskList tasks={tasks}
                          removeTaskItem={deletedTaskHandler}
                          changeTaskItem={changeTaskHandler}/>
            </div>
        </React.Fragment>
    );
}

export default App;
