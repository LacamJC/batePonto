
const express = require('express');
const port = 3000;
const rotas = require('./routes/router.js')
const obj_Funcionario = require('./models/Funcionario.js')

const bodyParser = require('body-parser')
const app = express();
app.use(express.json());
app.use('/', rotas)

const bd_funcionarios = require('./database/tables/bd_funcionarios.js');
const bd_folha_ponto = require('./database/tables/bd_folha_ponto.js');

const redText = (text) => '\x1b[31m' + text + '\x1b[0m';
const greenText = (text) => '\x1b[32m' + text + '\x1b[0m';
const yellowText = (text) => '\x1b[33m' + text + '\x1b[0m';

app.use(bodyParser.urlencoded({extended:false}));

/* include (utilizar) um arquivo externo */
app.use(express.static(__dirname +'/public'));

app.set('view engine', 'ejs');


app.get('/getFuncionarios', (req,res) =>{
    console.log(yellowText("Buscando todos os funcionarios"))

    bd_funcionarios.findAll()
    .then(funcionarios =>{
        // console.log(funcionarios);

        const valores_id = funcionarios.map(funcionarios => funcionarios.id);
        const valores_nome = funcionarios.map(funcionarios => funcionarios.nome);
        const valores_cargo = funcionarios.map(funcionarios => funcionarios.cargo);
        const valores_ano_nascimento = funcionarios.map(funcionarios => funcionarios.ano_nascimento);
        const valores_carga_horaria = funcionarios.map(funcionarios => funcionarios.carga_horaria);

        const busca = {
            id : valores_id,
            nome : valores_nome,
            cargo : valores_cargo,
            ano_nascimento : valores_ano_nascimento,
            carga_horaria : valores_carga_horaria
        }

        // console.log(busca);
        res.render('../public/views/listaFuncionarios.ejs', {busca : busca})
    })
    .catch(err => {
        console.error('Erro ao buscar funcionarios:', err);
      });
  
});

app.post('/buscarFuncionario', (req,res) =>{
    const fun_id = req.body.funcionarioId;
    const funNum = Number(req.body.numFun);
    console.log(yellowText("////////// Buscando funcionario ////////////"));
    console.log(`////////// Id do funcionario: ${fun_id}`);
    console.log(`////////// Funcao : ${typeof funNum}`);
    

    bd_funcionarios.findOne({where : { id : fun_id}})
    .then(funcionario =>{
        if(funcionario){
            console.log(greenText("Funcionario encontrado"))
            // console.log(funcionario)

            switch (funNum){
                case 0:
                    res.render('../public/views/baterEntrada.ejs', {funcionario : funcionario})
                    break;
                case 1:
                    res.render('../public/views/baterSaida.ejs', {funcionario : funcionario})
                    break;
            }

        }else{
            console.log(redText("Funcionario não encontrado"))
            switch (funNum){
                case 0:
                    funcionario = "FUNCIONARIO NAO ENCONTRADO"
                    res.render('../public/views/baterEntrada.ejs', {funcionario : funcionario})
                    break;
                case 1:
                    funcionario = "FUNCIONARIO NAO ENCONTRADO"
                    res.render('../public/views/baterSaida.ejs', {funcionario : funcionario})
                    break;
            }
        }
    }).catch(err =>{
        console.log(redText("Erro ao buscar funcionario: "+ err))
        res.sendStatus(501)
    })

    }
)

app.post('/baterEntrada', (req,res) =>{
    console.log(yellowText("/////// Batendo ponto"))
    var nome = req.body.FunNome
    var _hora = req.body.entrada
    var _data = req.body.data
    
    bd_funcionarios.findOne({where : {nome : nome}})
    .then(funcionario => {
        if(funcionario)
        {
            console.log(greenText("///////// Funcionario encontrado"))
            // console.log(funcionario)

            bd_folha_ponto.create({
                funcionario : funcionario.id,
                data : _data,
                entrada : _hora,
                saida : null
            })
            .then(()=>{
                console.log(greenText("///// Folha de ponto criada com sucesso para o dia "+_data))
                res.sendStatus(201)
            })
            .catch(err =>{
                console.log(redText("//// Erro ao criar folha"))
                res.sendStatus(501)
            })

        }
    })
    .catch(err =>{
        console.log(redText("Erro ao encontrar usuario : " + err))
        res.sendStatus(501)
    })
})

app.post('/baterSaida', (req,res) =>{
    console.log(yellowText("//////// Batendo saida"))

    var nomeFuncionario = req.body.nome
    var data = req.body.data 
    var saida = req.body.saida
    console.log(nomeFuncionario, data, saida)

    bd_funcionarios.findOne({where : {nome : nomeFuncionario}})
    .then(funcionario =>{
        if(funcionario)
        {
            console.log(greenText("///// Funcionario encontrado"))
            
            bd_folha_ponto.findOne({where : {funcionario : funcionario.id, data : data}})
            .then(folha =>{
                if(folha)
                {
                    console.log(greenText("//////// Folha ponto encontrada"))

                    bd_folha_ponto.update({saida : saida}, {where : {data : data, funcionario : funcionario.id}})
                    
                }
                else{console.log(redText("Folha nao encontrada"));res.sendStatus(501)}
            })
            .catch(err =>{
                console.log(redText(`Erro ao encontrar folha ponto ${err}`))
            })
        }
        else{
            console.log(redText("Funcionario nao encontrado"))
            res.sendStatus(501)
        }

    })
    .catch(err =>{
        console.log(redText(`Erro ao encontrar usuario : ${err}`))
    })

})

app.listen(port, ()=>{
    console.log(greenText("Servidor aberto na porta: " + port))
});

