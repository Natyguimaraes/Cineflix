import { create, read, update, deleteFil } from '../models/filmeModel.js';

//Realizando insert (create)

export async function createFilme(req, res){
    const { titulo, diretor, ano_lancamento, genero, sinopse, poster_url} = req.body;
    console.log('Dados recebidos do frontend:', {titulo, diretor, ano_lancamento, genero, sinopse, poster_url});

    create (titulo, diretor, ano_lancamento, genero, sinopse, poster_url, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({mensagem: 'Filme adicionado com sucesso'});
    });
}

//realizando consulta

export async function getAllFilmes(req, res) {
    read((err, filmes) => {
        if(err){
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(filmes);
    });
}

export async function getFilmesF(req, res) {
    const { id } = req.params;
    
    // Chame a função read para buscar uma pessoa específica pelo ID
    read(id, (err, filme) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(filme);
    });
}
//realizando atualização

export async function updateFilme(req, res){
    const { id } = req.params;
    const novosDados = req.body;
    update(id, novosDados, (err, result) => {
        if (err) {
            res.status(500).json ({ error: err.message });
            return;
        }

        // para verificar se houve alterações
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Nenhum filme encontrado para atualizar.' });
            return;
        }

        // Se chegou aqui, a pessoa foi atualizada com sucesso
        res.status(200).json({ message: 'Filme atualizado com sucesso' });
    });
}

//realizando delete (update/inativando)

export async function deleteFilme(req, res) {
    const { id } = req.params;
    console.log('delete recebidos do frontend: ', {id});
    deleteFil(id, (err, result) => {
        if(err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.send('Filme excluído da lista de desejos com sucesso');
    });
}

