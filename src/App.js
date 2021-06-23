import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';

import {Template} from './components/MainComponentes';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';

function App() {
  return (
    <BrowserRouter>
      <Template>
        <Header/>
        <Routes/>
        <Footer/>
      </Template>
    </BrowserRouter>
  );
}
export default App;
