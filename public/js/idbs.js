let db;
const request = indexedDB.open("SaveYourMoney", 1);

request.onerror = function(event) {
    console.log(event.target.errorCode)
};

function saveRecord(record) {
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
        bringUp();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode)
};
function bringUp() {
    const trans = db.transaction(['item_progression'], 'redo');

    const budgetObjStore = trans.objectStore('item_progression');

    const getAll = budgetObjStore.getAll();
    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
            fetch('/api/transaction', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse);
                    }
                    const trans = db.transaction(['item_progression'], 'redo');

                    const budgetObjStore = trans.objectStore('item_progression');

                    budgetObjStore.clear();

                    alert('All Items have been entered')
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}
window.addEventListener('online', bringUp);