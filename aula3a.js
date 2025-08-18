const express = require('express');
const app = express();

const produtos = [
  { id: 1, nome: 'Notebook', preco: 3500 },
  { id: 2, nome: 'Mouse', preco: 120 },
  { id: 3, nome: 'Teclado', preco: 250 }
];

app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ erro: 'Produto não encontrado' });
  }
});

app.get('/produtos', (req, res) => {
  // Filtro fictício
  res.json(produtos);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

// Para executar o servidor, use o comando:
// node aula3.js

// Para testar a API, você pode usar o Postman ou o Insomnia para fazer requisições GET para os endpoints:
// - Obter todos os produtos: GET http://localhost:3000/produtos
// - Obter um produto específico: GET http://localhost:3000/produtos/1
// - Filtrar os produtos por categoria: GET http://localhost:3000/produtos?categoria=eletronicos
