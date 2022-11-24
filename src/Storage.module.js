import {getStorage, ref, uploadBytes, deleteObject, getDownloadURL} from 'firebase/storage';

const storage = getStorage();

export function createRef(path) {
    return ref(storage, path)
}

export function removeTaskObject(deletePath) {
    deleteObject(createRef(deletePath)).then(() => {
        console.log(`Файл удален!`);
    }).catch((error) => {
        console.log(`Ошибка удаления файла`);
    });
};

export function addNewTaskObject(files, addPath) {
    uploadBytes(createRef(addPath), files).then((snapshot) => {
        console.log(`Файл "${files.name}" отправлен`);
    });
};

export function addHrefFiles(id, files, documentClassLinkFile) {

    for (let i = 0; i < files.length; i++) {

        getDownloadURL(ref(storage, `${id}/${files[i]}`))
            .then((url) => {
                documentClassLinkFile[i].setAttribute('href', url);
                console.log(documentClassLinkFile);
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export function uploadFiles(storageRef, files) {
    uploadBytes(storageRef, files).then((snapshot) => {
        console.log(`Файл "${files.name}" отправлен`);
    });
} ;
