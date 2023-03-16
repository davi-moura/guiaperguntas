const Sequelize = require("sequelize")
const connection = require("./database")


//é assim q define o model de cricao de tabelas
const Pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})


//criacao da tabela
//force:false = se a tabela pergunta ja existe, ele n vai forçar a cricao dnv
Pergunta.sync({force:false}).then(()=>{
    console.log("tabela criada")
})


module.exports = Pergunta