import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/select-menu'
import LancamentoService from '../../app/service/lancamentoService'

class CadastroLancamentos extends React.Component {

    constructor() {
        super();
        this.lancamentoService = new LancamentoService();
    }

    cancelar = () => {
        this.props.history.push('/home');
    }

    render() {

        const tipos = this.lancamentoService.getListaTipos();
        const meses = this.lancamentoService.getListaMeses();

        return (
            <Card title="Cadastro de Lançamento">
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" type="text" className="form-control">

                            </input>
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="text" className="form-control">

                            </input>
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" lista={meses} className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" type="text" className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" lista={tipos} className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: ">
                            <input type="text" className="form-control" disabled={true} />
                        </FormGroup>
                    </div>
                </div>
                <br/>
                <button onClick={this.cadastrar} className="btn btn-success" type="button">Salvar</button>&nbsp;
                <button onClick={this.cancelar} className="btn btn-danger" type="button">Cancelar</button>

            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos);