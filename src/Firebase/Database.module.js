import {initializeApp} from "firebase/app";
import {onValue, getDatabase, ref, set, update, remove} from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCYgkSUnQ_ZAytdERZUP5ioTuFkUCmD51s",
    authDomain: "todoproject-4ea32.firebaseapp.com",
    projectId: "todoproject-4ea32",
    storageBucket: "todoproject-4ea32.appspot.com",
    messagingSenderId: "673559072777",
    appId: "1:673559072777:web:69af02fd37a98cab5028d8",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

function loadDatabase(setTasks) {
    const tasksRef = ref(db, 'tasks/');
    onValue(tasksRef, (snapshot) => {
        if (snapshot.val() === null) {
            return;
        }
        const data = snapshot.val();
        setTasks(Object.values(data));
    });
};

function removeTaskDatabase(path) {
    const tasksRef = ref(db, path);
    remove(tasksRef, [path]);
};

function updateDatabase(id, changedTask) {
    const tasksRef = ref(db, 'tasks/');
    const updates = {};
    updates[id] = changedTask;
    update(tasksRef, updates);
};

function writeTaskData(taskId, taskTitle, taskDescription, taskDate, files) {
    set(ref(db, 'tasks/' + taskId), {
        id: `${taskId}`,
        title: `${taskTitle}`,
        description: `${taskDescription}`,
        date: `${taskDate.toLocaleDateString('en-ca')}`,
        files: JSON.stringify(files),
        status: `false`,
    });
};

function updateFiles(filesUpdated, id) {
    update(ref(db, `tasks/${id}`), {
        files: JSON.stringify(filesUpdated),
    });
};

export {writeTaskData, loadDatabase, removeTaskDatabase, updateDatabase, updateFiles};


