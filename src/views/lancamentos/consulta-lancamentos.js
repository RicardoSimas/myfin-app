import React from 'react';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/select-menu';
import LancamentosTable from './lancamentos-table';
import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localStorageService'
import * as messages from '../../components/toastr'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
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
                const lista = response.data;
                if(lista.length < 1){
                    messages.mensagemAlerta('Nenhum resultado encontrado!')
                }
                this.setState({ lancamentos: lista })
            }).catch(error => {
                messages.mensagemErro(error.data)
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    formCadastrarLancamento = () => {
        this.props.history.push('/cadastro-lancamentos');
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
    }

    cancelDelete = () => {
        this.setState({ showConfirmDialog: false })
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                lancamentos.splice(index, 1);
                this.setState({ lancamentos: lancamentos, showConfirmDialog: false });

                messages.mensagemSucesso('Lançamento deletado com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao deletar lançamento.')
            })
    }

    alterarStatus = (lancamento, status) => {
        this.service
            .alterarStatus(lancamento.id, status)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento)
                if (index !== -1) {
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState({ lancamento })
                }
                messages.mensagemSucesso('Status atualizado com sucesso!')
            })
    }

    render() {
        const listaMes = this.service.getListaMeses();
        const listaTipos = this.service.getListaTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelDelete} className="p-button-text" />
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} autoFocus />
            </div>
        );

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
                                className="btn btn-success"
                                title="Buscar">
                                <i className="pi pi-search p-mr-2"> Buscar</i>
                            </button>
                            <button type="button"
                                title="Cadastrar"
                                className="btn btn-danger"
                                onClick={this.formCadastrarLancamento}>
                                <i className="pi pi-plus p-mr-2"> Cadastrar</i>
                            </button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                deletar={this.abrirConfirmacao}
                                editar={this.editar}
                                alterarStatus={this.alterarStatus}>
                            </LancamentosTable>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmar"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        footer={confirmDialogFooter}
                        onHide={() => this.setState({ showConfirmDialog: false })}>
                        Tem certeza que deseja excluir este lançamento?
                    </Dialog>
                </div>
            </Card>
        )
    }
}
export default ConsultaLancamentos