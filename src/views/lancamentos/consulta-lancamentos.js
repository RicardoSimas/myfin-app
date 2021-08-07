import React from 'react';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/select-menu';
import LancamentosTable from './lancamentos-table';

class ConsultaLancamentos extends React.Component {
    render() {
        const listaMes = [
            { label: 'Selecione', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 },
        ]

        const listaTipos = [
            { label: 'Selecione', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' },
        ]

        const lancamentos = [
            {
                id: 1,
                descricao: 'Salario',
                valor: 5000,
                mes: 2,
                tipo: 'RECEITA',
                status: 'PENDENTE'
            }
        ]

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputAno"
                                    placeholder="Digite o Ano">
                                </input>
                            </FormGroup>

                            <FormGroup htmlFor="selectMes" label="Mês: *">
                                <SelectMenu className="form-control" lista={listaMes} />
                            </FormGroup>

                            <FormGroup htmlFor="selectTipoLancamento" label="Tipo: *">
                                <SelectMenu className="form-control" lista={listaTipos} />
                            </FormGroup>
                            <br/>
                            <button type="button" className="btn btn-success">Buscar</button>&nbsp;
                            <button type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div class="bs-component">
                            <LancamentosTable lancamentos={lancamentos}>

                            </LancamentosTable>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default ConsultaLancamentos