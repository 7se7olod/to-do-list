import React, {useState, Fragment} from "react";
import styles from './FormTask.module.css';

function randomIntegerForID() {
    let rand = 1000000 + Math.random() * (9999999 + 1 - 1000000);
    return Math.floor(rand);
}

const FormTask = (props) => {

    const [titleTask, setTitleTask] = useState('');
    const [descriptionTask, setDescriptionTask] = useState('');
    const [dateTask, setDateTask] = useState('');
    const [filesTask, setFilesTask] = useState([]);

    const titleTaskChangeHandler = (event) => {
        setTitleTask(event.target.value);
    };

    const descriptionTaskChangeHandler = (event) => {
        setDescriptionTask(event.target.value);
    };

    const dateTaskChangeHandler = (event) => {
        setDateTask(event.target.value);
    };

    const filesTaskChange = (event) => {
        if (event.target.files.length > 5) {
            let modal = {};
            modal.isModal = true;
            modal.title = 'Количество прикрепленных файлов не может быть больше 5';
            modal.content = 'Выберите до 5 файлов';
            props.modalWindow(modal);
            return;
        }
        setFilesTask(event.target.files);
    };


    function checkedInputs(title, description) {

        if (title.length === 0) {
            let modal = {};
            modal.isModal = true;
            modal.title = 'Некорректный заголовок';
            modal.content = 'Поле с заголовком должно быть заполнено';
            props.modalWindow(modal);
            return;
        }

        if (description.length === 0) {
            let modal = {};
            modal.isModal = true;
            modal.title = 'Некорректное описание';
            modal.content = 'Описание должно быть заполнено';
            props.modalWindow(modal);
            return;
        }

        if (dateTask === '') {
            let modal = {};
            modal.isModal = true;
            modal.title = 'Некорректная дата';
            modal.content = 'Выберите дату';
            props.modalWindow(modal);
            return;
        }

        return true;
    };


    const submitHandler = () => {

        if (checkedInputs(titleTask, descriptionTask)) {
            const newTask = {};
            newTask.id = randomIntegerForID().toString();
            newTask.title = titleTask;
            newTask.description = descriptionTask;
            newTask.date = new Date(dateTask);
            newTask.files = filesTask;
            props.addNewTask(newTask);
            setTitleTask('');
            setDescriptionTask('');
            setDateTask('');
            setFilesTask('');
            props.onCancel()
        }
    };

    return (
        <Fragment>
            <form className={styles['form-task']}>
                <label className={styles['form-label']}>
                    Заголовок
                    <input type="text"
                           value={titleTask}
                           className={styles['form-input']}
                           onChange={titleTaskChangeHandler}/>
                </label>
                <label className={styles['form-label']}>
                    Описание задачи
                    <textarea type="number"
                              value={descriptionTask}
                              className={styles['form-input']}
                              onChange={descriptionTaskChangeHandler}/>
                </label>
                <label className={styles['form-label']}>
                    Дата завершения
                    <input type="date"
                           className={styles['form-input']}
                           onChange={dateTaskChangeHandler}/>
                </label>
                <label className={styles['form-label']}>
                    Выбрать файлы
                    <input type="file"
                           multiple
                           accept=".jpg, .jpeg, .png, .doc, .docx, .xml"
                           onChange={filesTaskChange}/>
                </label>
                <button type='button'
                        onClick={submitHandler}
                        className={styles['form-button']}>Добавить задачу</button>
                <button type='button'
                        onClick={props.onCancel}
                        className={styles['form-button-red']}>Отмена</button>
            </form>
        </Fragment>
    );
};

export default FormTask;