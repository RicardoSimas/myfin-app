import React from 'react';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/select-menu';
import LancamentosTable from './lancamentos-table';
import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localStorageService'
import * as messages from '../../components/toastr'


class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    constructor() {
        super()
        this.service = new LancamentoService();
    }

    buscar = () => {

        if (!this.state.ano) {
            messages.mensagemErro('O preenchimento do campo Ano é obrigatório!')
            return false;
        }

        const usuarioLogado = LocalStorageService.getItem('_user_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.consultar(lancamentoFiltro)
            .then(response => {
                this.setState({ lancamentos: response.data })
            }).catch(error => {
                messages.mensagemErro(error.data)
            })
    }

    editar = (id) => {
        console.log('Id editar :', id);
    }


    deletar = (lancamento) => {
        this.service.deletar(lancamento.id)

        const lancamentos = this.state.lancamentos;
        const index = lancamentos.indexOf(lancamento);
        lancamentos.splice(index, 1);
        this.setState(lancamentos);

        messages.mensagemSucesso('Lançamento deletado com sucesso!')
    }

    render() {
        const listaMes = this.service.getListaMeses();
        const listaTipos = this.service.getListaTipos();

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputAno"
                                    value={this.state.ano}
                                    onChange={e => this.setState({ ano: e.target.value })}
                                    placeholder="Digite o Ano">
                                </input>
                            </FormGroup>

                            <FormGroup htmlFor="selectMes" label="Mês: *">
                                <SelectMenu id="selectMes"
                                    value={this.state.mes}
                                    onChange={e => this.setState({ mes: e.target.value })}
                                    className="form-control"
                                    lista={listaMes} />
                            </FormGroup>

                            <FormGroup htmlFor="inputDescricao" label="Descrição:">
                                <input id="inputDescricao"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    placeholder="Digite a descrição"
                                    className="form-control" />
                            </FormGroup>

                            <FormGroup htmlFor="selectTipoLancamento" label="Tipo: *">
                                <SelectMenu id="selectTipo"
                                    value={this.state.tipo}
                                    onChange={e => this.setState({ tipo: e.target.value })}
                                    className="form-control"
                                    lista={listaTipos} />
                            </FormGroup>
                            <br />
                            <button onClick={this.buscar}
                                type="button"
                                className="btn btn-success">
                                Buscar
                            </button>&nbsp;
                            <button type="button"
                                className="btn btn-danger">
                                Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                deletar={this.deletar}
                                editar={this.editar}>
                            </LancamentosTable>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
export default ConsultaLancamentos