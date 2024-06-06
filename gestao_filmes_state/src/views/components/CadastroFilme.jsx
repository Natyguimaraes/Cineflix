import { useState } from 'react';
import '../styles/index.css';
import { FaFilm } from 'react-icons/fa'; // ícone de filme

function FormCadastro() {
  const [formValores, setFormValores] = useState({
    titulo: '',
    diretor: '',
    ano_lancamento: '',
    genero: '',
    sinopse: '',
    poster_url: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValores((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("dados a serem enviados:", formValores);
      const response = await fetch('http://localhost:3000/filmes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValores)
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar a solicitação: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      // Limpar os campos após o envio bem-sucedido
      setFormValores({
        titulo: '',
        diretor: '',
        ano_lancamento: '',
        genero: '',
        sinopse: '',
        poster_url: ''
      });
      // Adicionar feedback visual para o usuário, se necessário
    } catch (err) {
      console.error("Erro ao enviar os dados", err);
      // Define a mensagem de erro para exibir ao usuário
      setErrorMessage('Erro ao enviar os dados. Por favor, tente novamente.');
    }
  };

  return (
    <div className="Container_form">
      <div className="form">
        <h1> Cadastro de Filme </h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input_container">
            <FaFilm className="input_icon" />
            <input
              type="text"
              name="titulo"
              placeholder="Título do Filme"
              value={formValores.titulo}
              onChange={handleChange}
              required // Campo obrigatório
            />
          </div>
          <div className="input_container">
            <FaFilm className="input_icon" />
            <input
              type="text"
              name="diretor"
              placeholder="Diretor"
              value={formValores.diretor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input_container">
            <FaFilm className="input_icon" />
            <input
              type="text"
              name="ano_lancamento"
              placeholder="Ano de Lançamento"
              value={formValores.ano_lancamento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input_container">
            <FaFilm className="input_icon" />
            <input
              type="text"
              name="genero"
              placeholder="Gênero"
              value={formValores.genero}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input_container">
            <FaFilm className="input_icon" />
            <input
              type="text"
              name="sinopse"
              placeholder="Sinopse"
              value={formValores.sinopse}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input_container">
            <FaFilm className="input_icon" />
            <input
              type="text"
              name="poster_url"
              placeholder="URL do Poster"
              value={formValores.poster_url}
              onChange={handleChange}
            />
          </div>
          <button type="submit"> CADASTRAR </button>
        </form>
      </div>
    </div>
  );
}

export default FormCadastro;

