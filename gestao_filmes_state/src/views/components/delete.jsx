import React, { useState, useEffect } from 'react';
import Home from './home';

function DeletarFilme() {

    const [secaoAtual, setSecaoAtual] = useState ('delete');
  const cliqueSecao = (secao) => {
    setSecaoAtual(secao);
  };

    const [formValores, setFormValores] = useState({
        id: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValores(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            console.log("ID a ser deletado:", formValores.id);
            const response = await fetch(`http://localhost:3000/filmes/${filmes.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const json = await response.json();
            console.log(response);
            console.log(json);
    
        } catch (err) {
            console.error("Erro ao enviar", err);
        }
    };    

    return (
        <><div>
      {secaoAtual === 'delete' && (
        <><form onSubmit={handleSubmit}>
                    ID a ser deletado:
                    <input type="text" name="id" value={formValores.id} onChange={handleChange} />
                    <button type="submit" onClick={handleSubmit}> Deletar </button>
                </form><div className="home_voltar3">
                        <button className="button_home_voltar" onClick={() => cliqueSecao('home')}> Voltar a página inicial </button>
                    </div></>
      )}
        </div>
        <div className='secao'>
        {secaoAtual === 'home' && <Home />}
    </div>
        </>
    );
}

export default DeletarFilme; 