/* eslint-disable import/no-anonymous-default-export */
/*
  Endereço do Web Service do B7Web:
  1. http://alunos.b7web.com.br:501
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

const apiFetchFile = async (endPoint, body = []) => {
  if(!body.token){
    let token = Cookies.get('token');
    if(token){
      body.append('token', token);
    }
  }

  const res = await fetch(BASEAPI+endPoint, {
    method: 'POST',
    body,
  });
  const json = await res.json();

  if(json.notallowed){
    window.location.href = '/signin';
    return;
  }

  return json;
}

const OlxApi = {
  login: async (email, password) => {
    console.log('chamou login');
    const json = await apiFetchPost(
      '/user/signin',
      {email, password}
    );
    return json;
  },
  register: async (name, uf, email, password) => {
    const json = await apiFetchPost(
      '/user/signup',
      {name, state:uf, email, password}
    );
    return json;
  },
  getStates: async () => {
    const json = await apiFetchGet(
      '/states'
    );
    return json.states;
  },
  getCategories: async () => {
    const json = await apiFetchGet(
      '/categories'
    );
    return json.categories;
  },
  getRecentAds: async (options) => {
    const json = await apiFetchGet(
      '/ad/list',
      options,
    );
    return json.ads;
  },
  getAdInfo: async (id, other = false) => {
    const json = await apiFetchGet(
      '/ad/item',
      {id, other}
    );
    return json;
  },
  addAd: async (fData) => {
    console.log(fData);
    const json = await apiFetchFile(
      '/ad/add',
      fData,
    );
    return json;
  }
}
export default () => OlxApi;