const { request } = require("express")
const express = require("express") // aqui estou iniciando o express
const router = express.Router() //aqui estou configurando a primeira parte da rota
const cors = require('cors') //aqui estou trazendo o pacote cors que permite consumir essa API no front-end
const conectaBancoDados = require('./bancoDeDados')// aqui estou linkando o banco de dados ao servidor
conectaBancoDados() //aqui estou chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() //aqui estou iniciando o app
app.use(express.json())
app.use(cors())
const porta = 3333 //aqui estou criando a porta

//GET
async function mostraMulheres(request, response){
    try {
        const mulheresVindasDoBancoDados = await Mulher.find() //espere a conexão com o banco de dados, acesse a constante mulher (que cotém o mulherModel) e ache a mulher no banco de dados
        response.json(mulheresVindasDoBancoDados)
    }catch (erro) {
        console.log(erro)
    }
}

//POST * pega o cadastro da mulher do front-end, quando preenchemos o formulário
async function criaMulher(request, response) {
    const novaMulher = new Mulher ({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })
    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response){
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }

        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio 
        }

        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }

        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizadaBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: 'Mulher deletada com sucesso!'})
    } catch(erro) {
        console.log(erro)
    }
}

// Configurações do app
app.use(router.get('/mulheres', mostraMulheres)) //configurei rota GET/mulheres - segunda parte da rota
app.use(router.post('/mulheres', criaMulher)) //configurei rota POST/ mulheres - segunda parte da rota
app.use(router.patch('/mulheres/:id', corrigeMulher))//configurei a rota PATCH/mulheres/:id 
app.use(router.delete('/mulheres/:id', deletaMulher)) //configurei a rota DELETE/mulheres/:id

//PORTA
function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}

app.listen(porta, mostraPorta) //ouvindo a porta