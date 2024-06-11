import React, { useState, useEffect } from 'react';
import '../styles/read.css';
import Home from './home';
import { FaTrash, FaEdit } from 'react-icons/fa'; 

function ReadFilme() {
  const [secaoAtual, setSecaoAtual] = useState('readFilme');
  const [dadosCadastrados, setDadosCadastrados] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  
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

  const handleDelete = async (e, filme) => {
    e.preventDefault();

    try {
      console.log("ID a ser deletado:", filme.id);
      const response = await fetch(`http://localhost:3000/filmes/${filme.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Erro ao excluir filme: ${response.status}`);
      }
      const updatedData = dadosCadastrados.filter(item => item.id !== filme.id);
      setDadosCadastrados(updatedData);
    } catch (error) {
      console.error('Erro ao excluir filme:', error);
    }
  };

  const handleUpdate = async (index) => {
    try {
      const filme = dadosCadastrados[index];
      const response = await fetch(`http://localhost:3000/filmes/${filme.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filme),
      });
      if (!response.ok) {
        throw new Error(`Erro ao atualizar filme: ${response.status}`);
      }
      // Recarrega os dados após a atualização bem-sucedida
      const updatedData = [...dadosCadastrados];
      setDadosCadastrados(updatedData);
      setEditIndex(null);
    } catch (error) {
      console.error('Erro ao atualizar filme:', error);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newData = [...dadosCadastrados];
    newData[index] = {
      ...newData[index],
      [name]: value
    };
    setDadosCadastrados(newData);
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
                    <td>{editIndex === index ? <input type="text" name="titulo" value={filme.titulo} onChange={(e) => handleChange(e, index)} /> : filme.titulo}</td>
                    <td>{editIndex === index ? <input type="text" name="diretor" value={filme.diretor} onChange={(e) => handleChange(e, index)} /> : filme.diretor}</td>
                    <td>{editIndex === index ? <input type="text" name="ano_lancamento" value={filme.ano_lancamento} onChange={(e) => handleChange(e, index)} /> : filme.ano_lancamento}</td>
                    <td>{editIndex === index ? <input type="text" name="genero" value={filme.genero} onChange={(e) => handleChange(e, index)} /> : filme.genero}</td>
                    <td>{editIndex === index ? <input type="text" name="sinopse" value={filme.sinopse} onChange={(e) => handleChange(e, index)} /> : filme.sinopse}</td>
                    <td>{editIndex === index ? <input type="text" name="poster_url" value={filme.poster_url} onChange={(e) => handleChange(e, index)} /> : filme.poster_url}</td>
                    <td>
                    <FaTrash onClick={(e) => handleDelete(e, filme)} />
{editIndex === index ?
  <button className="salvar-button" onClick={() => handleUpdate(index)}>Salvar</button> :
  <FaEdit onClick={() => handleEdit(index)} />
}

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
