export default function ehMaiorIdade(campo) {
    const dataNascimento = new Date(campo.value);
    validaIdade(dataNascimento);

    if(!validaIdade(dataNascimento)){ //Se a função retornar falso
        campo.setCustomValidity('Precisa ser maior de idade para abrir a conta')
    }
}

 function validaIdade(data){
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear()+ 18, data.getUTCMonth(), data.getUTCDate());

    return dataAtual >= dataMais18;
}