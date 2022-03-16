let db;
const request = indexedDB.open("SaveYourMoney", 1);

request.onerror = function(event) {
    console.log(event.target.errorCode)
};

function recordSave(record) {
    const trans = db.transaction(['item_progression'], 'redo');

    const budgetObjStore = trans.objectStore('item_progression');
    budgetObjStore.add(record)
}
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('item_progression', { autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.online) {
        uploadBudget();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode)
};