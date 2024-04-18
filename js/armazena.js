//Função assíncrona para criar um Cadastro e salvar no arquivo.json

async function criarCadastro (nome,email,rg,cpf,aniversario){
    const conexao = await fetch('https://cadastro-api-vert.vercel.app/cadastros', //Espera o arquivo.json
    {
        method: "POST", //Adiciona nele esse método para que seja possível inserir o conteúdo
        headers:{
            "Content-type": "application/json" // Tipo do conteúdo 
        },
        body: JSON.stringify({ //No corpo vai enviar objetos no formato string json
            nome: nome, //objetos
            email: email,
            rg: rg,
            cpf: cpf,
            aniversario: aniversario
        })
    });
    const listar = await conexao.json() // Retorna em formato json(objeto) para o arquivo
    return listar
}

export const conectaApi ={
    criarCadastro
}