import LocalStorageService from "./localStorageService";

export const USUARIO_LOGADO = '_user_logado';

export default class AuthService{

    static isUsuarioAutenticado(){
        const usuario = LocalStorageService.getItem(USUARIO_LOGADO)
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado(){
        localStorage.removeItem(USUARIO_LOGADO)
    }
}