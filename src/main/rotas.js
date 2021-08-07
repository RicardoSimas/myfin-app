import React from 'react'
import {Route, Switch, HashRouter} from 'react-router-dom'

import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import Home from '../views/home'
import Login from '../views/login'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}></Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos}></Route>
            </Switch>
        </HashRouter>
    )
}

export default Rotas