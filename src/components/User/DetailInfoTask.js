import styles from "./DetailInfoTask.module.css";
import React, {Fragment, useState} from "react";
import ReactDom from "react-dom";
import FilesList from './FilesList';


const DetailInfoTask = ({isVisible = false, task, onClose, id, deleteTask, changeTask}) => {

    const ModalInfoTask = () => {

        const [isDisabledStateInputs, setIsDisabledStateInputs] = useState(true);
        const [changeTitle, setChangeTitle] = useState(task.title);
        const [changeDescription, setChangeDescription] = useState(task.description);
        const [changeDate, setChangeDate] = useState(new Date(task.date).toLocaleDateString('en-ca'));

        const changeTitleHandler = (event) => {
            setChangeTitle(event.target.value);
        };

        const changeDescriptionHandler = (event) => {
            setChangeDescription(event.target.value);
        };

        const changeDateHandler = (event) => {
            setChangeDate(event.target.value);
        };

        const changeStateInputs = () => {
            if (isDisabledStateInputs) {
                setIsDisabledStateInputs(false);
            } else if (!isDisabledStateInputs) {
                setIsDisabledStateInputs(true);
                task.title = changeTitle;
                task.description = changeDescription;
                task.date = changeDate;
                changeTask(task);
            }
        };

        const removeTaskHandler = () => {
            deleteTask(task);
            onClose();
        };

        return (
            <div className={styles['main-detail-task']}>
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