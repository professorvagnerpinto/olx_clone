import React, { useEffect, useState } from 'react';
import {PageArea} from './styles';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponentes';
import useApi from '../../helpers/OlxApi';
import {doLogin} from '../../helpers/AuthHandler';

/* 
  User criado do web service do b7web
  user: testadorv@email.com
  pass: 12345
*/
const SignUp = () => {
  const api = useApi();
  const [name, setName] = useState('');
  const [uf, setUf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState('');
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const sList = await api.getStates();
      setStateList(sList);
    }
    getStates();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setDisable(true);
    setError('');

    if(password !== confirmPassword){
      setError('As senhas estão diferentes.');
      setDisable(false);
      return;
    }

    const json = await api.register(name, uf, email, password);
    if(json.error){
      setError(json.error);
    } else {
      doLogin(json.token); //salva o cookie
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
            <div className="area-title">Nome</div>
            <div className="area-input">
              <input 
                type="text" 
                disabled={disable} 
                value={name} 
                onChange={e=>setName(e.target.value)}
                required/>
            </div>
          </label>
          <label className="area">
            <div className="area-title">UF</div>
            <div className="area-input">
              <select
                value={uf}
                onChange={e=>setUf(e.target.value)}
                required>
                  <option></option>
                  {stateList.map((i, k) => 
                    <option key={k} value={i.id}>{i.name}</option>
                  )}
              </select>
            </div>
          </label>
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
            <div className="area-title">Confirmar Senha</div>
            <div className="area-input">
              <input 
                type="password" 
                disabled={disable} 
                value={confirmPassword} 
                onChange={e=>setConfirmPassword(e.target.value)}
                required/>
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
export default SignUp;