import React, { useState } from 'react';
import {PageArea} from './styles';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponentes';
import useApi from '../../helpers/OlxApi';
import {doLogin} from '../../helpers/AuthHandler';

const Signin = () => {
  const api = useApi();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setDisable(true);

    const json = await api.login(email, password);
    if(json.error){
      setError(json.error);
    } else {
      doLogin(json.token, rememberPassword); //salva o cookie
      window.location.href = '/'; //manda para a rota home
    }
    setDisable(false);
  }  

  return(
    <PageContainer>
      <PageTitle>Entrar</PageTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <PageArea>
        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area-title">Email</div>
            <div className="area-input">
              <input 
                type="email" 
                disabled={disable} 
                value={email} 
                onChange={e=>setEmail(e.target.value)}
                required/>
            </div>
          </label>
          <label className="area">
            <div className="area-title">Senha</div>
            <div className="area-input">
              <input 
                type="password" 
                disabled={disable} 
                value={password} 
                onChange={e=>setPassword(e.target.value)}
                required/>
            </div>
          </label>
          <label className="area">
            <div className="area-title">Lembrar Senha</div>
            <div className="area-checkbox">
              <input 
                type="checkbox" 
                disabled={disable} 
                value={rememberPassword} 
                onChange={()=>setRememberPassword(!rememberPassword)}/>
            </div>
          </label>
          <label className="area">
            <div className="area-title"></div>
            <div className="area-input">
              <button disabled={disable}>Entrar</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
}
export default Signin;