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
        newTask.files.forEach(file => {
            fileNames.push(file.name); /** Добавляем имена файлов в массив fileNames*/
            addNewTaskObject(file, `${newTask.id}/${file.name}`) /** Добавляем сами файлы по назначенному пути в FB Storage */
        });

        /** Записываем все данные в FB database*/
        writeTaskData(newTask.id, newTask.title, newTask.description, newTask.date, fileNames);
    };

    /** Удаление задачи из списка */
    const deletedTaskHandler = (taskRemove) => {

        const nameFilesPaths = Object(JSON.parse(taskRemove.files)); /** Массив названий файлов */
        const path = `tasks/${taskRemove.id}`;  /** Путь до конкретной задачи */

        nameFilesPaths.forEach(name => removeTaskObject(`${taskRemove.id}/${name}`));

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
