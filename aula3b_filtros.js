const express = require('express');
const app = express();

const produtos = [
    { id: 1, nome: "Notebook", preco: 3500 },
    { id: 2, nome: "Mouse", preco: 80 },
    { id: 3, nome: "Teclado", preco: 150 },
    { id: 4, nome: "Monitor", preco: 1200 }
];

app.get('/produtos', (req, res) => {
    let { min_preco, max_preco } = req.query;
    let resultado = produtos;

    if (min_preco) {
        min_preco = parseFloat(min_preco);
        resultado = resultado.filter(p => p.preco >= min_preco);
    }

    if (max_preco) {
        max_preco = parseFloat(max_preco);
        resultado = resultado.filter(p => p.preco <= max_preco);
    }

    res.json({ produtos: resultado });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

// Para executar o servidor, use o comando:
// node aula3b_filtros.js

// Para testar, acesse as URLs:
// http://localhost:3000/produtos
// - http://localhost:3000/produtos?min_preco=100
// - http://localhost:3000/produtos?max_preco=1000
// - http://localhost:3000/produtos?min_preco=100&max_preco=1000
