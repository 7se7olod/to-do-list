import styles from './FilesList.module.css';
import {updateFiles} from '../../Firebase/Database.module';
import {removeTaskObject, addHrefFiles} from '../../Firebase/Storage.module';

const FilesList = (props) => {

    const filesParsed = JSON.parse(props.fileTask);
    let files = filesParsed;

    addHrefFiles(props.task.id, files, document.getElementsByClassName('linkFile'));

    const removeFile = (event) => {

        let updatedFiles = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i] !== event.target.value) {
                updatedFiles.push(files[i]);
            }
        };

        removeTaskObject(`${props.task.id}/${event.target.value}`);

        updateFiles(updatedFiles, props.task.id);
    };

    return (
        <ul className={styles['files-list']}>
            {(files.length > 0) ? "Файлы:" : "Нет файлов"}
            {files.map(file => <li key={file}>
                <a href='&'
                   className={`linkFile ${styles['file-link']}`}
                   target='_blank'
                   >{file}</a>
                <button type='button'
                        value={file}
                        className={props.isActiveButton ? styles['delete-file-button-disabled'] : styles['delete-file-button']}
                        onClick={removeFile}
                        disabled={props.isActiveButton}>Удалить файл
                </button>
            </li>)}
        </ul>
    );
};

export default FilesList;