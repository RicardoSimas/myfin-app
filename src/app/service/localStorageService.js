class LocalStorageService{

    static setItem(chave, valor){
        localStorage.setItem(chave, JSON.stringify(valor));
    }

    static getItem(chave){
        const localStorageObj = localStorage.getItem(chave);
        return  JSON.parse(localStorageObj);
    }

}

export default LocalStorageService