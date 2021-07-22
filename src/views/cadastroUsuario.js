import React from 'react'
import {withRouter} from 'react-router-dom'

import Card from '../components/card'
import FormGroup from '../components/form-group'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        repitaSenha: ''
    }

    cadastrar = () => {
        console.log(this.state);
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
                                    <button onClick={this.cadastrar} className="btn btn-success" type="button">Salvar</button>
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