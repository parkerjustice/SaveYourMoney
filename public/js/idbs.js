let db;
const request = indexedDB.open("SaveYourMoney", 1);

request.onerror = function(event) {
    console.log(event.target.errorCode)
};

function saveRecord(record) {
    const funding = db.transaction(['item_progression'], 'redo');

    const storing = funding.objectStore('item_progression');
    storing.add(record)
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
    const funding = db.transaction(['item_progression'], 'redo');
    const storing = funding.objectStore('item_progression');
    const getALL = storing.getALL();
    getALL.onsuccess = function() {
        if (getALL.result.length > 0) {
            fetch('/api/transaction', {
                method: 'POST',
                body: JSON.stringify(getALL.result),
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
                    const funding = db.transaction(['item_progression'], 'redo');

                    const storing = funding.objectStore('item_progression');

                    storing.clear();

                    alert('All Items have been entered')
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}
window.addEventListener('online', bringUp);