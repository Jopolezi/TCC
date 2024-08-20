const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// Configurando o middleware
app.use(cors()); // Permite requisições de qualquer origem
app.use(bodyParser.json()); // Faz o parse de JSON no corpo das requisições

// Configurando o pool do PostgreSQL
const pool = new Pool({
    user: 'postgres', // substitua pelo seu usuário do PostgreSQL
    host: 'localhost',
    database: 'ratings',
    password: 'etec', // substitua pela senha do seu usuário do PostgreSQL
    port: 5432, // Porta padrão do PostgreSQL
});

// Rota para testar a conexão com o banco de dados
app.get('/api/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.status(200).json({ success: true, message: 'Conexão com o banco de dados funcionando!', time: result.rows[0].now });
    } catch (err) {
        console.error('Erro ao testar a conexão com o banco de dados', err);
        res.status(500).json({ success: false, message: 'Erro ao conectar ao banco de dados', error: err.message });
    }
});

// Rota para receber avaliações
app.post('/api/ratings', async (req, res) => {
    const { rating } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO ratings (rating) VALUES ($1) RETURNING *',
            [rating]
        );

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao salvar avaliação', err);
        res.status(500).send('Erro ao salvar avaliação');
    }
});

// Rota para calcular a média das avaliações
app.get('/api/ratings/average', async (req, res) => {
    try {
        const result = await pool.query('SELECT AVG(rating) AS average_rating FROM ratings');
        let averageRating = result.rows[0].average_rating;
        
        // Verifica se averageRating é null e define como 0 se for o caso
        averageRating = averageRating === null ? 0 : parseFloat(averageRating);

        res.status(200).json({ averageRating });
    } catch (err) {
        console.error('Erro ao calcular a média das avaliações', err);
        res.status(500).json({ success: false, message: 'Erro ao calcular a média das avaliações', error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
//funcionando