const express = require('express');
const router = express.Router();

var funcionario = {}
var Pontos = []

router.get('/', (req,res) =>{
    res.render("../public/views/index.ejs")
});


router.get('GoToListaFuncionarios', (req,res) =>{
    res.render("../public/views/listaFuncionarios.ejs", {busca : busca})
})

router.get('/goToBaterEntrada', (req,res) =>{
    var funcionario = {}
    res.render("../public/views/baterEntrada.ejs", {funcionario : funcionario})
})

router.get('/goToBaterSaida', (req,res) =>{
    
    res.render('../public/views/baterSaida.ejs', {funcionario : funcionario})
})

router.get('/goToFolhaPontoFuncionario', (req,res) =>{
    res.render('../public/views/folhaPonto.ejs', {funcionario : funcionario, Pontos : Pontos})
})

module.exports = router