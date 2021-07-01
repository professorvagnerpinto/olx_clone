/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import {createNumberMask} from 'text-mask-addons';
import {PageArea} from './styles';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponentes';
import useApi from '../../helpers/OlxApi';

const AddAd = () => {
  const api = useApi();
  const fileField = useRef();
  const history = useHistory();

  const[categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [description, setDescription] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  useEffect(()=>{
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    }
    getCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    setError('');

    //verificações
    let erros = [];
    if(!title.trim()){
      erros.push('Sem título');
    }
    if(!category){
      erros.push('Sem categoria');
    }

    if(erros.length === 0){ //não houve erros, envia dados
      const fData = new FormData();
      fData.append('title', title);
      fData.append('price', price);
      fData.append('priceneg', priceNegotiable);
      fData.append('desc', description);
      fData.append('cat', category);
      //adicionando as imagens
      if(fileField.current.files.length > 0){
        for (let i = 0; i < fileField.current.files.length; i++) {
          fData.append('img', fileField.current.files[i]);
          
        }
      }

      //faz a requisição
      const json = await api.addAd(fData);
      if(!json.error){
        history.push(`/ad/${json.id}`);
        return;
      } else {
        setError(json.error);
      }

    } else{
      setError(erros.join("\n"));
    }
    setDisabled(false);
  }

  const priceMask = createNumberMask({
    prefix: 'R$ ',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
  });

  return(
    <PageContainer>
      <PageTitle>Postar um anúncio</PageTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <PageArea>
        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area-title">Título</div>
            <div className="area-input">
              <input 
                type="text" 
                disabled={disabled} 
                value={title} 
                onChange={e=>setTitle(e.target.value)}
                required/>
            </div>
          </label>
          <label className="area">
            <div className="area-title">Categoria</div>
            <div className="area-input">
              <select
                disable={disabled}
                onChange={e=>setCategory(e.target.value)}
                required
              >
                <option></option>
                {categories && categories.map((i)=>
                  <option key={i._id} value={i._id}>{i.name}</option>
                )}
              </select>
            </div>
          </label>
          <label className="area">
            <div className="area-title">Preço</div>
            <div className="area-input">
              <MaskedInput
                mask={priceMask}
                placeholder="R$ "
                disabled={disabled || priceNegotiable}
                value={price}
                onChange={e=>setPrice(e.target.value)}
              ></MaskedInput>
            </div>
          </label>
          <label className="area">
            <div className="area-title">Preço Negociável</div>
            <div className="area-checkbox">
              <input
                type="checkbox"
                disable={disabled}
                checked={priceNegotiable}
                onChange={e=>setPriceNegotiable(!priceNegotiable)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area-title">Descrição</div>
            <div className="area-input">
              <textarea
                disable={disabled}
                value={description}
                onChange={e=>setDescription(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area-title">Imagens (1 ou mais)</div>
            <div className="area-file">
              <input
                type="file"
                disable={disabled}
                ref={fileField}
                multiple
              />
            </div>
          </label>
          <label className="area">
            <div className="area-title"></div>
            <div className="area-input">
              <button disabled={disabled}>Adicionar Anúncio</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
}
export default AddAd;