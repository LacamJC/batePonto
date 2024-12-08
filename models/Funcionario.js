class Funcionario{
    constructor(id, nome, ano_nascimento, cpf, cargo, carga_horaria){
        this.setId(id);
        this.setNome(nome);
        this.setAno_nascimento(ano_nascimento);
        this.setCpf(cpf);
        this.setCargo(cargo);
        this.setCarga_horaria(carga_horaria);
    }

    setId(id){
        this.id = id;
    }
    setNome(nome){
        this.nome = nome;
    }
    setAno_nascimento(ano_nascimento){
        this.ano_nascimento = ano_nascimento;
    }
    setCpf(cpf){
        this.cpf = cpf;
    }
    setCargo(cargo){
        this.cargo = cargo;
    }

    setCarga_horaria(carga_horaria){
        this.carga_horaria = carga_horaria;
    }

    getId(){
        return `${this.id}`;
    }

    getNome(){
        return `${this.nome}`;
    }

    getAno_nascimento(){
        return `${this.ano_nascimento}`;
    }

    getCpf(){
        return `${this.cpf}`;
    }

    getCargo(){
        return `${this.cargo}`;
    }

    getCarga_horaria(){
        return `${this.carga_horaria}`;
    }
}

const jon = new Funcionario(2, "John", 2005, 123123, "Vigilante");

// console.log(jon)
// console.log(jon.getId())
// console.log(jon.getNome())
// console.log(jon.getAno_nascimento());
// console.log(jon.getCpf());
// console.log(jon.getCargo());


module.exports = Funcionario