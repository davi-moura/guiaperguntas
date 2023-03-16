const express = require("express")
const app = express()
const bodyParser = require("body-parser")


const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")


//database
const connection = require("./database/database")
//o then so usa quando a connection de certo
connection
    .authenticate()
    .then(()=>{
        console.log("conexao feita")
    })
    .catch((msgErro) =>{
        console.log(msgErro)
    })




//to dizendo pro express usar o ejs como view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

//body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//routes
app.get("/", (req,res) => {
    //quando abre um json, efaz um raw:true ele so manda as linhas da tabela
    Pergunta.findAll({raw:true, order:[
        ['id', 'DESC']//ordenando os dados da tabela. coluna - ordem
    ]}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas //mandando o json com os dados ta tabela pra view 
        })
    })
    
})

app.get("/perguntar",(req,res) =>{
    res.render("perguntar");
})

app.get("/pergunta/:id",(req,res) =>{
    var id =  req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){

            Resposta.findAll({
                where: {pergunta_id: pergunta.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas =>{
                res.render("pergunta", {
                    pergunta : pergunta,
                    respostas : respostas
                })
            })

        }else{
            res.redirect('/')
        }
    })

})

app.post("/salvarpergunta",(req,res) =>{

    var titulo = req.body.titulo
    var descricao = req.body.descricao

    //salvando dados na tabela model
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect('/')
    })
})


app.post("/responder",(req,res) =>{

    var corpo = req.body.corpo
    var pergunta_id = req.body.pergunta_id

    //salvando dados na tabela model
    Resposta.create({
        corpo: corpo,
        pergunta_id: pergunta_id
    }).then(()=>{
        res.redirect('/pergunta/'+pergunta_id)
    })
})



//iniciando o server
app.listen(8585,()=>{console.log("rodando")})