import { auto } from 'async';
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isLogged} from '../helpers/AuthHandler';

//para a criação das rotas privadas
const RouteHandler = ({children, ...rest}) => {
  let logged = isLogged();
  let authorized = (rest.private && !logged) ? false : true;

  return(
    <Route
      {...rest}
      render={()=>
        authorized ? children : <Redirect to="/sigin"/>
      }  
    />

  );
}
export default RouteHandler;