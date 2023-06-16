const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response){
    response.json({
        nome: "Francine Eli Barbosa",
        imagem: "https://avatars.githubusercontent.com/u/89308110?v=4",
        minibio: "Advogada e Engenheria de Dados"
    })
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get("/mulher", mostraMulher))
app.listen(porta, mostraPorta)