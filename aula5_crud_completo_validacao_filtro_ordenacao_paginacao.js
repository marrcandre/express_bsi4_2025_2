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

// Listar todos os produtos (GET), com filtros, ordenação e paginação
app.get('/produtos', (req, res) => {
    let { min_preco, max_preco, pagina, por_pagina, ordenar_por, ordem } = req.query;
    let resultado = [...produtos];

    // Filtros
    if (min_preco) resultado = resultado.filter(p => p.preco >= parseFloat(min_preco));
    if (max_preco) resultado = resultado.filter(p => p.preco <= parseFloat(max_preco));

    // Ordenação
    if (ordenar_por) {
        const validSort = ["nome", "preco"];
        if (!validSort.includes(ordenar_por)) {
            return res.status(400).json({ error: "Parâmetro ordenar_por inválido. Use 'nome' ou 'preco'." });
        }
        resultado.sort((a, b) => {
            if (a[ordenar_por] < b[ordenar_por]) return ordem === "desc" ? 1 : -1;
            if (a[ordenar_por] > b[ordenar_por]) return ordem === "desc" ? -1 : 1;
            return 0;
        });
    }

    // Paginação
    pagina = parseInt(pagina) || 0;
    por_pagina = parseInt(por_pagina) || resultado.length;
    resultado = resultado.slice(pagina, pagina + por_pagina);

    res.json(resultado);
});

// Listar produto por ID (GET)
app.get('/produtos/:id', (req, res) => {
    const produto = produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(produto);
});

// Criar novo produto (POST)
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;

    // Validação
    if (!nome || nome.trim() === "") {
        return res.status(400).json({ error: "O nome não pode ser vazio" });
    }
    if (typeof preco !== "number" || preco <= 0) {
        return res.status(400).json({ error: "O preço deve ser maior que zero" });
    }

    const novoId = produtos.length ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
    const novoProduto = { id: novoId, nome, preco };
    produtos.push(novoProduto);

    res.json({ message: "Produto criado com sucesso", dados: novoProduto });
});

// Atualizar produto (PUT)
app.put('/produtos/:id', (req, res) => {
    const index = produtos.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Produto não encontrado" });

    const { nome, preco } = req.body;

    // Validação
    if (!nome || nome.trim() === "") {
        return res.status(400).json({ error: "O nome não pode ser vazio" });
    }
    if (typeof preco !== "number" || preco <= 0) {
        return res.status(400).json({ error: "O preço deve ser maior que zero" });
    }

    produtos[index] = { id: parseInt(req.params.id), nome, preco };
    res.json({ message: "Produto atualizado com sucesso", dados: produtos[index] });
});

// Remover produto (DELETE)
app.delete('/produtos/:id', (req, res) => {
    const index = produtos.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Produto não encontrado" });
    produtos.splice(index, 1);
    res.json({ message: "Produto removido com sucesso" });
});

// Iniciar servidor
app.listen(8000, () => console.log('Servidor rodando na porta 8000'));

// Rodar servidor:
// node aula5_crud_completo_validacao_filtro_ordenacao_paginacao.js

// Exemplos de testes:

// Listar todos os produtos
// http://localhost:8000/produtos

// Ordenar por preço (crescente)
// http://localhost:8000/produtos?ordenar_por=preco&ordem=asc

// Ordenar por nome (decrescente)
// http://localhost:8000/produtos?ordenar_por=nome&ordem=desc

// Filtrar por preço mínimo
// http://localhost:8000/produtos?min_preco=100

// Filtrar por preço máximo
// http://localhost:8000/produtos?max_preco=1000

// Filtrar por preço mínimo e máximo
// http://localhost:8000/produtos?min_preco=100&max_preco=1000

// Paginação
// http://localhost:8000/produtos?pagina=1&por_pagina=10
