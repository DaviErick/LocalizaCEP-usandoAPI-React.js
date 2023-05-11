import { useState } from 'react';
import './style.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch(){
    // 01310930 /json/

    if(input === ''){
      alert('prencha algum CEP');
      return
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    }catch{
      alert('Este CEP não existe ou não está registrado na API');
      setInput('');
    }
    
  }

  return (
    <div className="container">
      <h1 className="title">Localize o CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu cep..." value={input} onChange={(e) => {setInput(e.target.value)}}></input>
        <button className="buttonSearch" onClick={handleSearch}>Procurar</button>
      </div>

      <main className="main">
        <h2>CEP : {cep.cep}</h2>
        <span>Rua {cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro : {cep.bairro}</span>
        <span>Estado: {cep.uf}</span>
      </main>
    </div>
  );
}

export default App;