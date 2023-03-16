//conectores do mysql
const Sequelize = require("sequelize")
const connection = require("./database")


//� assim q define o model de cricao de tabelas
const Resposta = connection.define('resposta',{
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    pergunta_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})


//criacao da tabela
//force:false = se a tabela pergunta ja existe, ele n vai for�ar a cricao dnv
Resposta.sync({force:false}).then(()=>{})


module.exports = Resposta