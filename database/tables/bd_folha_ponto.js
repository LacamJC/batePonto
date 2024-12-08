const Sequelize = require('sequelize');
const database = require('../connection');

const bd_folha_ponto = database.define('folha', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    funcionario: {
        type: Sequelize.STRING
    },

    data: {
        type: Sequelize.DATEONLY
    },

    entrada: {
        type: Sequelize.TIME
    },

    saida : {
        type: Sequelize.TIME
    }
});

// bd_folha_ponto.sync({force:true});

module.exports = bd_folha_ponto;