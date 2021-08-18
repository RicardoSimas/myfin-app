class LocalStorageService{

    static setItem(chave, valor){
        localStorage.setItem(chave, JSON.stringify(valor));
    }

    static getItem(chave){
        const localStorageObj = localStorage.getItem(chave);
        return  JSON.parse(localStorageObj);
    }

    static removeItem(chave){
        localStorage.removeItem(chave)
    }

}

export default LocalStorageService