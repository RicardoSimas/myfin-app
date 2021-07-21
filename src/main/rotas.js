import React from 'react'
import {Route, Switch, HashRouter} from 'react-router-dom'

import CadastroUsuario from '../views/cadastroUsuario'
import Login from '../views/login'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}></Route>
            </Switch>
        </HashRouter>
    )
}

export default Rotas