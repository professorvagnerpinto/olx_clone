import React, { useEffect, useState } from 'react';
import {SearchArea, PageArea} from './styles';
import { PageContainer } from '../../components/MainComponentes';
import useApi from '../../helpers/OlxApi';
import {Link} from 'react-router-dom';

const Home = () => {
  const api = useApi();
  const[stateList, setStateList] = useState([]);
  const[categories, setCategories] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const sList = await api.getStates();
      setStateList(sList);
    }
    getStates();

    const getCategories = async () => {
      const cList = await api.getCategories();
      console.log(cList);
      setCategories(cList);
    }
    getCategories();
  }, []);

  return(
    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="GET" action="/ads">
              <input type="text" name="q" placeholder="O que você procura?"/>
              <select name="state">
                {stateList.map( (i, k) => 
                  <option key={k} value={i.name}>{i.name}</option>
                )}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
          <div className="categoryList">
            {categories.map( (i, k) => 
              <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                  <img src={i.img} alt=""/>
                  <span>{i.name}</span>  
              </Link>
            )}
          </div>
        </PageContainer>
      </SearchArea>
      <PageContainer>
        <PageArea>
          PageArea
        </PageArea>
      </PageContainer>
    </>
    
  );
}
export default Home;