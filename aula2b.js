const express = require('express');
const app = express();

app.use(express.json());

// "Banco de dados" em memória
let produtos = [
  { id: 1, nome: 'Teclado', preco: 199.90 },
  { id: 2, nome: 'Mouse', preco: 89.90 }
];

// Rota GET
app.get('/produtos', (req, res) => {
  res.json([...produtos]); // cópia para evitar alteração acidental
});

// Rota POST
app.post('/produtos', (req, res) => {
  const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
  const novoProduto = { id: novoId, ...req.body };

  produtos.push(novoProduto);

  res.status(201).json({
    message: 'Produto criado com sucesso',
    dados: novoProduto
  });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));