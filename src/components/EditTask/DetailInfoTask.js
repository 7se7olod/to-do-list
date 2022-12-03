import styles from "./DetailInfoTask.module.css";
import React, {Fragment, useState} from "react";
import ReactDom from "react-dom";
import FilesList from './FilesList';


const DetailInfoTask = ({isVisible = false, task, onClose, id, deleteTask, changeTask, status}) => {

    const ModalInfoTask = () => {

        const [isDisabledStateInputs, setIsDisabledStateInputs] = useState(true);
        const [changeTitle, setChangeTitle] = useState(task.title);
        const [changeDescription, setChangeDescription] = useState(task.description);
        const [changeDate, setChangeDate] = useState(new Date(task.date).toLocaleDateString('en-ca'));
        const [changeStatus, setChangeStatus] = useState(JSON.parse(status));

        const changeTitleHandler = (event) => {
            setChangeTitle(event.target.value);
        };

        const changeDescriptionHandler = (event) => {
            setChangeDescription(event.target.value);
        };

        const changeDateHandler = (event) => {
            setChangeDate(event.target.value);
        };

        const changeStatusHandler = (event) => {
            setChangeStatus(event.target.checked);
        };


        const changeStateInputs = () => {
            setIsDisabledStateInputs(!isDisabledStateInputs);

            if (!isDisabledStateInputs) {
                changeTask({ title: changeTitle, description: changeDescription, date: changeDate, status: changeStatus });
            }
        };

        const removeTaskHandler = () => {
            deleteTask(task);
            onClose();
        };

        return (
            <div className="main-detail-task">
                <div className={styles['main-backdrop']} onClick={onClose}></div>
                <form className={styles['form-task']}>
                    <label className={styles['form-label']}>
                        Заголовок
                        <input type="text"
                               value={changeTitle}
                               className={styles['form-input']}
                               disabled={isDisabledStateInputs}
                               onChange={changeTitleHandler}/>
                    </label>
                    <label className={styles['form-label']}>
                        Описание задачи
                        <textarea type="text"
                                  value={changeDescription}
                                  className={styles['form-input']}
                                  disabled={isDisabledStateInputs}
                                  onChange={changeDescriptionHandler}/>
                    </label>
                    <label className={styles['form-label']}>
                        Дата завершения
                        <input type="date"
                               value={changeDate}
                               className={styles['form-input']}
                               disabled={isDisabledStateInputs}
                               onChange={changeDateHandler}/>
                    </label>
                    <label>
                        {changeStatus ? "Задача выполнена" : "Задача не выполнена"}
                        <input type="checkbox"
                               checked={changeStatus}
                               disabled={isDisabledStateInputs}
                               onChange={changeStatusHandler}/>
                    </label>
                    <FilesList fileTask={task.files}
                               task={task}
                               isActiveButton={isDisabledStateInputs}/>
                    <button
                        type='button'
                        className={styles['form-button']}
                        onClick={changeStateInputs}>{isDisabledStateInputs ? 'Изменить задачу' : 'Сохранить'}</button>
                    <button
                        type='button'
                        className={styles['form-button-red']}
                        onClick={removeTaskHandler}>Удалить задачу
                    </button>
                    <button type='button' className={styles['form-button']} onClick={onClose}>Отмена</button>
                </form>
            </div>
        );
    };

    return !isVisible ? null : (
        <Fragment>
            {ReactDom.createPortal(<ModalInfoTask/>, document.getElementById('modal-info-task'))}
        </Fragment>
    );
}

export default DetailInfoTask;