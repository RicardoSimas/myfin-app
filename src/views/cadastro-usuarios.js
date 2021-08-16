import React from 'react'
import {withRouter} from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'

import Card from '../components/card'
import FormGroup from '../components/form-group'

import {mensagemSucesso ,mensagemErro} from '../components/toastr'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        repitaSenha: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {
        const{nome, email, senha, repitaSenha} = this.state
        const usuario = {nome, email, senha, repitaSenha}
        
        try{
            this.service.validar(usuario);
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg => mensagemErro(msg));
            
            return false;
        }

        this.service.cadastrar(usuario)
            .then( response => {
                mensagemSucesso('Usuario cadastrado com sucesso!')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="card mb-3">
                <Card title="Cadastro de Usuario">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <fieldset>
                                    <FormGroup label="Nome: *" htmlFor="inputName1">
                                        <input type="text"
                                            id="inputName1"
                                            className="form-control"
                                            name="nome"
                                            onChange={e => this.setState({ nome: e.target.value })}
                                            placeholder="Digite o nome" >
                                        </input>
                                    </FormGroup>
                                    <FormGroup label="Email: *" htmlFor="inputEmail1">
                                        <input type="email"
                                            className="form-control"
                                            id="inputEmail1"
                                            name="email"
                                            onChange={e => this.setState({ email: e.target.value })}
                                            aria-describedby="emailHelp"
                                            placeholder="Digite o email" >
                                        </input>
                                    </FormGroup>
                                    <FormGroup label="Senha: *" htmlFor="inputPassword1">
                                        <input type="password"
                                            className="form-control"
                                            id="inputPassword1"
                                            name="senha"
                                            onChange={e => this.setState({ senha: e.target.value })}
                                            placeholder="Digite a senha" >
                                        </input>
                                    </FormGroup>
                                    <FormGroup label="Repita a Senha: *" htmlFor="inputPassword2">
                                        <input type="password"
                                            className="form-control"
                                            id="inputPassword2"
                                            name="repitaSenha"
                                            onChange={e => this.setState({ repitaSenha: e.target.value })}
                                            placeholder="Digite a senha" >
                                        </input>
                                    </FormGroup>
                                    <br />
                                    <button onClick={this.cadastrar} className="btn btn-success" type="button">Salvar</button>&nbsp;
                                    <button onClick={this.cancelar} className="btn btn-danger" type="button">Cancelar</button>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(CadastroUsuario)