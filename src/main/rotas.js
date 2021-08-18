import React from 'react'
import {Route, Switch, HashRouter, Redirect} from 'react-router-dom'

import CadastroUsuario from '../views/cadastro-usuarios'
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamentos'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import AuthService from '../app/service/authService'
import Home from '../views/home'
import Login from '../views/login'

function RotaAutenticada( { component: Component, ...props } ){
    return(
        <Route {...props} render={ (componentProps) => {
            if(AuthService.isUsuarioAutenticado()){
                return(
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={ {pathname: '/login', state : {from: componentProps.location} } } />
                )
            }
        }} />
    )
}

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}></Route>

                <RotaAutenticada path="/home" component={Home} />
                <RotaAutenticada path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas