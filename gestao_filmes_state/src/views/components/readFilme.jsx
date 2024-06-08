import React, { useState, useEffect } from 'react';
import '../styles/index.css';
import Home from './home';


function ReadFilme() {

  const [secaoAtual, setSecaoAtual] = useState('readFilme');
    
        const cliqueSecao = (secao) => {
            setSecaoAtual(secao);
        };

  const [dadosCadastrados, setDadosCadastrados] = useState([]);

  useEffect(() => {
    // Aqui você faz a requisição GET para obter os dados já cadastrados
    async function fetchDadosCadastrados() {
      try {
        const response = await fetch('http://localhost:3000/filmes');
        if (!response.ok) {
          throw new Error(`Erro ao obter os dados: ${response.status}`);
        }
        const dados = await response.json();
        setDadosCadastrados(dados);
      } catch (err) {
        console.error("Erro ao obter os dados cadastrados", err);
      }
    }
    fetchDadosCadastrados();
  }, []); // O array vazio assegura que o useEffect será executado apenas uma vez após a montagem do componente

  return (
    <div>
      {secaoAtual === 'readFilme' && (
     <><div className="container_tabela">
          <h1 className="h1_visualizacao"> Dados Cadastrados </h1>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Titulo</th>
                <th>Diretor</th>
                <th>Ano de lançamento</th>
                <th>Gênero</th>
                <th>Sinopse</th>
                <th>Url do Poster</th>
              </tr>
            </thead>
            <tbody>
              {dadosCadastrados.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.titulo}</td>
                  <td>{item.diretor}</td>
                  <td>{item.ano_lancamento}</td>
                  <td>{item.genero}</td>
                  <td>{item.sinopse}</td>
                  <td>{item.poster_url}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div><div className="home_voltar2">
            <button className="button_home_voltar" onClick={() => cliqueSecao('home')}> Voltar a página inicial </button>
          </div></>

      )}

<div className='secao'>
        {secaoAtual === 'home' && <Home />}
    </div>


    </div>
  );
}

export default ReadFilme;
