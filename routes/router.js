const express = require('express');
const router = express.Router();

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
    var funcionario = {}
    res.render('../public/views/baterSaida.ejs', {funcionario : funcionario})
})

module.exports = router