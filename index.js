const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const jsonParser = bodyParser.json();
app.use(jsonParser);


app.get('/', (req, res) => {
    res.send('Hello world!');
});

// Endpoints de envio de mensagens
// CRUD -> Create, Read (Read All e Read Single), Update and Delete

const mensagens = [
    "Essa é uma mensagem",
    "Essa é outra mensagem"
];

// Read All
app.get('/mensagens', (req, res) => {
    res.json(mensagens);
});

// Create
app.post('/mensagens', (req, res) => {
    // Obtendo a mensagem que foi recebida através do body da requisição
    const mensagem = req.body.mensagem;
    
    // Inserindo a mensagem na lista de mensagens
    mensagens.push(mensagem);

    const id = mensagens.length - 1;

    // Exibindo o ID da mensagem, que no caso é o índice que ela foi adicionada
    res.send(`Mensagem criada. ID: ${id}`);
});

// Read Single
app.get('/mensagens/:id', (req, res) => {
    // Pega o ID através dos parâmetros da requisição
    const id = req.params.id;

    // Acessamos a mensagem de acordo com o ID informado
    const mensagem = mensagens[id];

    res.json(mensagem);

    /*
    Referência, passando também o ID em um objeto de mensagem
    res.json({ id, mensagem });
    */
});

// Update
app.put('/mensagens/:id', (req, res) => {
     // Acessa o ID pelos parâmetros
     const id = req.params.id;

     // Obtém a mensagem que foi enviada pelo usuário no corpo (body) da requisição
     const mensagem = req.body.mensagem;
 
     // Atualiza a mensagem direto na lista de mensagens, acessando pelo ID que foi informado
     mensagens[id] = mensagem;
 
     // Envia uma mensagem de sucesso.
     res.send(`Mensagem com o ID ${id} foi atualizada com sucesso.`);
});

// Delete
app.delete('/mensagens/:id', (req, res) => {
    const id = req.params.id;

    delete mensagens[id];

    res.send(`Mensagem com o ID ${id} foi removida com sucesso.`);
});

app.listen(port, () => {
    console.log(`App rodando em http://localhost:${port}`);
});