require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');
const app = express();
const fs = require('fs');

const uploadImgUser = require('../src/js/uploadimage');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../src/Icons-Users")));

app.post("/upload", uploadImgUser.single('file'), (req, res) => {
    const { username } = req.body;
    const file = req.file;

    if (!username) {
        console.error("Erro: Username não foi enviado na requisição");
        return res.status(400).json({
            erro: true,
            message: "Erro: Username não foi enviado na requisição!"
        });
    }

    if (!file) {
        console.error("Erro: Nenhum arquivo foi enviado");
        return res.status(400).json({
            erro: true,
            message: "Erro: Selecione uma imagem válida JPEG ou PNG!"
        });
    }

    try {
        // Renomeando o arquivo
        const originalFileName = req.file.filename;
        const extension = '.jpg';
        const newFileName = `${username}${extension}`;

        fs.renameSync(
            path.join(__dirname, '../src/Icons-Users/', originalFileName),
            path.join(__dirname, '../src/Icons-Users/', newFileName)
        );

        console.log('File uploaded successfully');
        return res.json({
            erro: false,
            message: "Upload realizado com sucesso!",
        });
    } catch (err) {
        console.error('Erro ao renomear o arquivo:', err);
        return res.status(500).json({
            erro: true,
            message: "Erro: Upload não realizado com sucesso!"
        });
    }
});



app.get('/', (req, res) => {
    res.json({ message: 'funcionando!' });
});

app.post('/login', async (req, res) => {
    const { username, senha } = req.body;

    try {
        const usuario = await db.selectUsuarioPorNome(username);
        console.log('Usuário encontrado:', usuario);

        let userRes = false;
        let senhaRes = false;
        let NameUsuario = null;

        if (usuario) {
            userRes = true;
        } else {
            userRes = false;
        }

        if (usuario && usuario.senha === senha) {
            senhaRes = true;
            NameUsuario = usuario.username;
        } else {
            senhaRes = false;
        }

        res.json({ User: userRes, senha: senhaRes, Name: NameUsuario });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

app.post('/register', async (req, res) => {
    const { username, email, senha } = req.body;
    try {
        const usuario = await db.selectUsuarioPorNome(username);
        const usuarioPorEmail = await db.selectUsuarioPorEmail(email);
        let UserExist = false;
        let EmailExist = false;

        if (usuario) {
            UserExist = true;
        }
        if (usuarioPorEmail) {
            EmailExist = true;
        }

        if (!UserExist && !EmailExist) {
            await db.insertUsuario(username, email, senha);
        }

        res.json({ User: UserExist, Email: EmailExist });

    } catch (error) {
        console.error('Erro ao fazer registro:', error);
        res.status(500).json({ error: 'Erro ao fazer registro' });
    }
});

app.listen(port, () => {
    console.log(`Backend rodando na porta ${port}`);
});
