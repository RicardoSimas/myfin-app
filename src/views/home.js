import React from 'react'

class Home extends React.Component {

    state = {
        saldo: 0
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
                    <a className="btn btn-primary btn-lg" href="#/cadastro-usuarios" role="button"><i
                    className="fa fa-users"></i> Cadastrar Usuário </a>
                    <a className="btn btn-danger btn-lg" href="/" role="button"><i
                    className="fa fa-users"></i> Cadastrar Lançamento </a>
            </div>
        )
    }
}

export default Home