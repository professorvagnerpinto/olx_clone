import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
  return(
    <div>
      <h1>Página Home</h1>
      <br/>
      <Link to="/about">Sobre</Link>
    </div>
  );
}
export default Home;