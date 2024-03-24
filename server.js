const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para processar o corpo das requisições como JSON
app.use(bodyParser.json());

// Simulação de uma lista de usuários
let users = [
    { id: 1, name: 'Usuário 1' },
    { id: 2, name: 'Usuário 2' },
    { id: 3, name: 'Usuário 3' }
];

// Endpoint para obter todos os usuários
app.get('/users', (req, res) => {
    res.json(users);
});

// Endpoint para obter um usuário específico
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('Usuário não encontrado');
    }
});

// Endpoint para adicionar um novo usuário
app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

// Endpoint para atualizar um usuário existente
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateUser = req.body;
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updateUser };
        res.json(users[index]);
    } else {
        res.status(404).send('Usuário não encontrado');
    }
});

// Endpoint para excluir um usuário
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(user => user.id !== id);
    res.sendStatus(204);
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
