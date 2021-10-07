import React from 'react'
import { AuthContext } from '../main/provedorAutenticacao';

import UsuarioService from '../app/service/usuarioService';

class Home extends React.Component {

    state = {
        saldo: 0
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {
        const usuarioLogadoObj = this.context.usuarioAutenticado;
        
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
                <a className="btn btn-danger btn-lg" href="#/cadastro-lancamentos" role="button"><i
                    className="fa fa-users"></i> <i className="pi pi-money-bill p-mr-2"> Cadastrar Lançamento</i> </a>
            </div>
        )
    }
}

Home.contextType = AuthContext;

export default Home