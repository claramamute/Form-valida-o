import ehUmCpf from "./validaCpf.js";
import ehMaiorIdade from "./validaIdade.js";
import { conectaApi } from "./armazena.js";

const campos = document.querySelectorAll('[required]');
const form = document.querySelector('[data-formulario]');

form.addEventListener('submit', async function criarCadastro(e) {
    e.preventDefault();

    const listaRespostas = {
        'nome': e.target.elements['nome'].value,
        'email': e.target.elements['email'].value,
        'rg': e.target.elements['rg'].value,
        'cpf': e.target.elements['cpf'].value,
        'aniversario': e.target.elements['aniversario'].value

    }

    await conectaApi.criarCadastro(listaRespostas['nome'], listaRespostas['email'], listaRespostas['rg'], listaRespostas['cpf'], listaRespostas['aniversario']);

    window.location.href = './abrir-conta-form-2.html';
})

campos.forEach((campo) =>{
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault())
})

const tiposErro = [
    'valueMissing',
    'tooShort', //Muito curto
    'customError', //Erros customizados, ex: validar cpf
    'typeMismatch', //Tipo do conteúdo não batendo
    'patternMismatch' //Não segue o padrão
]

const mensagens = { //Objeto 
    nome: { //Objeto que recebe objeto 
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}


function verificaCampo(campo){
    let mensagem = '';
    campo.setCustomValidity('');

    if (campo.name == 'cpf' && campo.value.lenght >= 11){
        ehUmCpf(campo)
    }
    if (campo.name =='aniversario' && campo.value != ''){
        ehMaiorIdade(campo)
    }

    tiposErro.forEach(erro =>{
        if (campo.validity[erro]){
            mensagem = mensagens[campo.name][erro]
            //console.log(mensagem)
        }
    })
    
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorInput = campo.checkValidity();

    if(!validadorInput){
        mensagemErro.textContent = mensagem;
    }else{
        mensagemErro.textContent = '';
    }
}

