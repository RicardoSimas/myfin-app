import React from 'react'
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

import CadastroUsuario from '../views/cadastro-usuarios'
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamentos'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import Home from '../views/home'
import Login from '../views/login'
import { AuthConsumer } from './provedorAutenticacao'

function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            if (isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
                )
            }
        }}
        />
    )
}

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}></Route>

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <Rotas isUsuarioAutenticado={context.isAutenticado} />
        )}
    </AuthConsumer>
)