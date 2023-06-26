export class LocalStorageDB{
    constructor() {
        this.updateLocalStorage.bind(this)
    }

    updateLocalStorage(key,array){
        localStorage.setItem(key,JSON.stringify(array))

    }

}
