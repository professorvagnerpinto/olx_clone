import React from 'react';
import {Link} from 'react-router-dom';
import {HeaderArea} from './styles';
import {isLogged, doLogout} from '../../../helpers/AuthHandler';

function Header() {
  let logged = isLogged();

  const handleLogout = () => {
    doLogout();
    window.location.href = '/'; //manda para a rota home
  }

  return(
    <HeaderArea>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="logo-1">O</span>
            <span className="logo-2">L</span>
            <span className="logo-3">X</span>
          </Link>
        </div>
        <nav>
          <ul>
            {logged && 
              <>
                <li>
                  <Link to="/post-an-ad" className="button">Anuncie seu Produto</Link>
                </li>
                <li>
                  <Link to="/my-account">Minha Conta</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Sair</button>
                </li>
              </>
            }
            {!logged && 
              <>
                <li>
                  <Link to="/signin">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Cadastrar</Link>
                </li>
                <li>
                  <Link to="/signin" className="button">Anuncie seu Produto</Link>
                </li>
              </>
            }
          </ul>
      </nav>
      </div>
    </HeaderArea>
  );
}
export default Header;