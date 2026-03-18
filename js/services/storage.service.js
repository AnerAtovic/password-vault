const storageService = {
    saveToStorage(information) {
        console.log("saveToStorageCalled");
    },
    
    getFromStorage() {
        console.log("getFromStorageCalled");
        return [];
    }
}

export default storageService;    