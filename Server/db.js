const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: 'postgres', 
    host: 'localhost',  
    password: '131520',
    database: 'registro',
    port: 5432, // Porta padrão do PostgreSQL
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    selectUsuarioPorNome: async (username) => {
        try {
            const res = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
            return res.rows[0];
        } catch (err) {
            console.error('Erro ao buscar usuário por nome:', err);
            throw err;
        }
    },

    selectUsuarioPorEmail: async (email) => {
        try {
            const res = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
            return res.rows[0];
        } catch (err) {
            console.error('Erro ao buscar usuário por nome:', err);
            throw err;
        }
    },

    insertUsuario: async (username, email, senha) => {
        try {
            const res = await pool.query(
                'INSERT INTO usuarios (username, email, senha, adm) VALUES ($1, $2, $3, $4)',
                [username, email, senha, false]
            );
            return true;
        } catch (err) {
            console.error('Erro ao Inserir usuário:', err);
            throw err;
        }
    }
};
