/* eslint-disable import/no-anonymous-default-export */
/*
  Endereço do Web Service do B7Web:
  1. http://alunos.b7web.com.br:501/
  2. http://alunos.b7web.com.br:501/ping (para ver se está online)
*/

import Cookies from "js-cookie";
import qs from 'qs';

const BASEAPI = 'http://alunos.b7web.com.br:501'

const apiFetchPost = async (endPoint, body) => {
  if(!body.token){
    let token = Cookies.get('token');
    if(token){
      body.token = token;
    }
  }

  const res = await fetch(BASEAPI+endPoint, {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(body),
  });
  const json = await res.json();

  if(json.notallowed){
    window.location.href = '/signin';
    return;
  }

  return json;
}

// eslint-disable-next-line no-unused-vars
const apiFetchGet = async (endPoint, body = []) => {
  if(!body.token){
    let token = Cookies.get('token');
    if(token){
      body.token = token;
    }
  }

  const res = await fetch(`${BASEAPI+endPoint}?${qs.stringify(body)}`);
  const json = await res.json();

  if(json.notallowed){
    window.location.href = '/signin';
    return;
  }

  return json;
}

const OlxApi = {
  login: async(email, password) => {
    console.log('chamou login');
    const json = await apiFetchPost(
      '/user/signin',
      {email, password}
    );
    return json;

  }
}
export default () => OlxApi;