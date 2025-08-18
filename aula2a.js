const express = require('express');
const app = express();

app.use(express.json());

// Rota GET
app.get('/produtos', (req, res) => {
  res.json([
    { id: 1, nome: 'Mouse', preco: 89.90 },
    { id: 2, nome: 'Teclado', preco: 199.90 }
  ]);
});

// Rota POST
app.post('/produtos', (req, res) => {
  res.json({
    mensagem: 'Produto criado com sucesso',
    dados: req.body
  });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

// Rodar servidor:
// node index.js