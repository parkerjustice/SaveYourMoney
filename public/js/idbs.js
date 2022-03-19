let DB;
const storeName = "store";
const request = indexedDB.open("SaveYourMoney", 1);
//onupgradeneeded or onsuccess? 
request.onuppgradeneeded = function(event) {
    const DB = event.target.result; 
console.log(event);
    DB.createObjectStore("store", { autoIncrement: true});
};
function recordSave(save) {
    const DB = request.result;
    const transaction = DB.transaction(['store'], 'script');
    const objectStore = transaction.objectStore('store');
    objectStore.add(record)
    storeName.add(save);

}

request.onsuccess = function(event) {
    console.log("Successful", event);
    DB = event.target.result;
};

request.onerror = function(event){
    console.log(event.target.error);
}


