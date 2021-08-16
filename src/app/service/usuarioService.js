import ApiService from "../apiservice";
import ErroValidacao from "../exception/erroValidacao";

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

    validar(usuario){
        const erros = []

        if(!usuario.nome){
            erros.push('Campo Nome é obrigatório!')
        }

        if(!usuario.email){
            erros.push('Campo Email é obrigatório!')
        }else if( !usuario.email.match(/[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            erros.push('Digite um email válido!')
        }

        if(!usuario.senha || !usuario.repitaSenha){
            erros.push('Digite a senha 2x!')
        }else if(usuario.senha !== usuario.repitaSenha){
            erros.push('As senhas não batem!')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }
}

export default UsuarioService