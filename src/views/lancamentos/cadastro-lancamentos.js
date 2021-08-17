import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/select-menu'
import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localStorageService'
import * as messages from '../../components/toastr'

class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null
    }

    constructor() {
        super();
        this.lancamentoService = new LancamentoService();
    }

    componentDidMount() {
        const params = this.props.match.params
        if (params.id) {
            this.lancamentoService.obterPorId(params.id)
                .then(response => {
                    this.setState({ ...response.data, atualizando: true })
                }).catch(error => {
                    messages.mensagemErro(error.response.data)
                });
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }

    cancelar = () => {
        this.props.history.push('/home');
    }

    atualizar = () => {
        const { descricao, valor, mes, ano, tipo, status, id, usuario } = this.state;

        const lancamento = {
            descricao: descricao,
            valor: valor,
            mes: mes,
            ano: ano,
            tipo: tipo,
            status: status,
            id: id,
            usuario: usuario,
            atualizando: false
        };

        this.lancamentoService.atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento atualizado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    submit = () => {

        const usuarioLogado = LocalStorageService.getItem('_user_logado')

        const { descricao, valor, mes, ano, tipo } = this.state;

        const lancamento = {
            descricao: descricao,
            valor: valor,
            mes: mes,
            ano: ano,
            tipo: tipo,
            usuario: usuarioLogado.id
        };

        try {
            this.lancamentoService.validar(lancamento);
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => {
                messages.mensagemErro(msg);
                return false;
            });
        }

        this.lancamentoService.salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento salvo com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    render() {

        const tipos = this.lancamentoService.getListaTipos();
        const meses = this.lancamentoService.getListaMeses();

        return (
            <Card title={this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao"
                                type="text"
                                className="form-control"
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChange}>
                            </input>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno"
                                type="text"
                                className="form-control"
                                name="ano"
                                value={this.state.ano}
                                onChange={this.handleChange}>
                            </input>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes"
                                lista={meses}
                                className="form-control"
                                name="mes"
                                value={this.state.mes}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor"
                                type="text"
                                className="form-control"
                                name="valor"
                                value={this.state.valor}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu
                                id="inputTipo"
                                lista={tipos}
                                className="form-control"
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: ">
                            <input
                                type="text"
                                className="form-control"
                                disabled={true}
                                name="status"
                                value={this.state.status} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <br />
                        {this.state.atualizando ?
                            (
                                <button
                                    onClick={this.atualizar}
                                    className="btn btn-success"
                                    type="button">
                                    <i className="pi pi-save p-mr-2"> Salvar</i>
                                </button>
                            ) :
                            (
                                <button
                                    onClick={this.submit}
                                    className="btn btn-success"
                                    type="button">
                                    <i className="pi pi-plus p-mr-2"> Cadastrar</i>
                                </button>
                            )
                        }

                        <button
                            onClick={this.cancelar}
                            className="btn btn-danger"
                            type="button">
                            <i className="pi pi-times p-mr-2"> Cancelar</i>
                        </button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos);