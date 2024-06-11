import React, { useState, useEffect } from 'react';
import '../styles/read.css';
import Home from './home';
import { FaTrash } from 'react-icons/fa';

function ReadFilme() {
  const [secaoAtual, setSecaoAtual] = useState('readFilme');
  const [dadosCadastrados, setDadosCadastrados] = useState([]);
  const [formValores, setFormValores] = useState({
    id: ''
  });

  useEffect(() => {
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValores(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e, filme) => {
    e.preventDefault();

    try {
      console.log("ID a ser deletado:", filme.id);
      const response = await fetch(`http://localhost:3000/filmes/${filme.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Erro ao excluir filme: ${response.status}`);
      }
      // Atualize a lista de filmes após a exclusão bem-sucedida
      const updatedData = dadosCadastrados.filter(item => item.id !== filme.id);
      setDadosCadastrados(updatedData);
    } catch (error) {
      console.error('Erro ao excluir filme:', error);
    }
  };

  return (
    <div>
      {secaoAtual === 'readFilme' && (
        <>
          <div className="container_tabela">
            <h1 className="h1_visualizacao"> SUA LISTA DE FILMES </h1>
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
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {dadosCadastrados.map((filme, index) => (
                  <tr key={index}>
                    <td>{filme.id}</td>
                    <td>{filme.titulo}</td>
                    <td>{filme.diretor}</td>
                    <td>{filme.ano_lancamento}</td>
                    <td>{filme.genero}</td>
                    <td>{filme.sinopse}</td>
                    <td>{filme.poster_url}</td>
                    <td>
                      {/* Ícone de exclusão */}
                      <FaTrash onClick={(e) => handleSubmit(e, filme)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="home_voltar2">
            <button className="button_home_voltar" onClick={() => setSecaoAtual('home')}> Voltar a página inicial </button>
          </div>
        </>
      )}

      <div className='secao'>
        {secaoAtual === 'home' && <Home />}
      </div>
    </div>
  );
}

export default ReadFilme;

