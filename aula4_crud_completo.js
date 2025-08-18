const express = require('express');
const app = express();
app.use(express.json());

// Lista de itens em memória
let produtos = [
    { id: 1, nome: "Notebook", preco: 3500.00 },
    { id: 2, nome: "Mouse", preco: 80.00 },
    { id: 3, nome: "Teclado", preco: 150.00 },
    { id: 4, nome: "Monitor", preco: 1200.00 },
    { id: 5, nome: "Impressora", preco: 300.00 }
];

// Listar todos os produtos (GET)
app.get('/produtos', (req, res) => res.json(produtos));

// Listar um produto pelo ID (GET)
app.get('/produtos/:id', (req, res) => {
    const produto = produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(produto);
});

// Criar um novo produto (POST)
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;
    const novoId = produtos.length ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
    const novoProduto = { id: novoId, nome, preco };
    produtos.push(novoProduto);
    res.json({ message: "Produto criado com sucesso", dados: novoProduto });
});

// Atualizar um produto (PUT)
app.put('/produtos/:id', (req, res) => {
    const index = produtos.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Produto não encontrado" });
    produtos[index] = { id: parseInt(req.params.id), ...req.body };
    res.json({ message: "Produto atualizado com sucesso", dados: produtos[index] });
});

// Remover um produto (DELETE)
app.delete('/produtos/:id', (req, res) => {
    const index = produtos.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Produto não encontrado" });
    produtos.splice(index, 1);
    res.json({ message: "Produto removido com sucesso" });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

// Rodar o servidor
// node aula4_crud_completo.js
