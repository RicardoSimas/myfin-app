import React from 'react'
import LocalStorageService from '../app/service/localStorageService';

import UsuarioService from '../app/service/usuarioService';

class Home extends React.Component {

    state = {
        saldo: 0
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
        this.localStorage = new LocalStorageService()
    }

    componentDidMount() {
        const usuarioLogadoObj = LocalStorageService.getItem('_user_logado')
        
        this.usuarioService.obterSaldoUsuario(
            usuarioLogadoObj.id
        ).then(response => {
            this.setState({ saldo: response.data })
        }).catch(error => {
            console.error(error.response)
        });
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem Vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de: R$ {this.state.saldo}</p>
                <hr className="my-4"></hr>
                <p>E essa é sua área administrativa. Utilize o menu ou um dos botões abaixo para nevegar pelo sistema.</p>
                <p className="lead"></p>
                <a className="btn btn-danger btn-lg" href="/" role="button"><i
                    className="fa fa-users"></i> Cadastrar Lançamento </a>
            </div>
        )
    }
}

export default Home