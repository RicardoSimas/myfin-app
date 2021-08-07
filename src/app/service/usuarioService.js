import ApiService from "../apiservice";

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios')
    }

    cadastrar(usuario){
        return this.post('', usuario);
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais);
    }

    obterSaldoUsuario(id){
        return this.get(`/${id}/saldo`);
    }
}

export default UsuarioService