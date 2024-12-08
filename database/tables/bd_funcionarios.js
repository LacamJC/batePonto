const Sequelize = require('sequelize');
const database = require('../connection');

const bd_funcionarios = database.define('funcionarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nome: {
        type: Sequelize.STRING
    },

    ano_nascimento: {
        type: Sequelize.INTEGER
    },

    cpf: {
        type: Sequelize.STRING(11),
        unique: true,
    },

    cargo: {
        type : Sequelize.STRING
    },

    carga_horaria: {
        type : Sequelize.INTEGER
    }
})

// bd_funcionarios.sync({force:true});

module.exports = bd_funcionarios;