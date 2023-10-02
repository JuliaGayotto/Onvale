const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const Cadastrado  = require('./entities/cadastrados')

app.get('/cadastrados/selecionar', readCadastrados);
app.post('/cadastrado/cadastrar', createCadastrado);

async function createCadastrado(req, res) {
    await Cadastrado.create(req.body).then(() => {
        return res.json({
            erro: false,
            mensagem:"Cadastrado(a) cadastrado com sucesso!"
        });
    }).catch((error) => {
        return res.status(400).json({
            erro: true,
            mensagem: error
        });
    })

}

async function readCadastrados(req, res) {
    try {
        const cadastrados = await Cadastrado.findAll();
        return res.json(cadastrados);
    } catch (error) {
        console.log(error);
        return res.json({ error: 'Erro ao buscar cadastrados'})
    }
}
 
app.listen(PORT, () => {
    console.log(`Rodando em http://localhost:${PORT}`);
})