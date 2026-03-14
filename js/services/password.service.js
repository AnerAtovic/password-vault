import storageService from './storage.service.js';

const passwordSerivce = {
    savePassword: (passwordData) => {
        console.log("savePasswordCalled");
        storageService.saveToStorage(passwordData);
    }


}

export default passwordSerivce;