const btnCaptura = document.querySelector('[data-video-botao]'); //Selecionar btn (foto) para inicializar a camera
const campoCamera = document.querySelector('[data-camera]'); // O container em que aparecerá a camera 
const video = document.querySelector('[data-video]'); // A camera em si
const btnTirarFoto = document.querySelector('[data-tirar-foto]');
const canvas = document.querySelector('[data-video-canvas]');
const mensagemFoto = document.querySelector('[data-mensagem]');
const btnEnviarFoto = document.querySelector('[data-enviar]');
let imagemURL = '';



btnCaptura.addEventListener('click', async function(){ //Pois as ações serão realizadas somente após o user permitir acesso à camera
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false}); //Solicita do navegador o acesso as midias, somente o video
    btnCaptura.style.display = 'none'; //Desaparecer o botao quando for clicado 
    campoCamera.style.display =  'block'; //Aparecer a camera quando o btn for clicado

    video.srcObject = iniciarVideo; //A camera recebe como origem o navegador do user para acessara camera


})

btnTirarFoto.addEventListener('click', function(){
    canvas.getContext('2d').drawImage(video, 0,0, canvas.width, canvas.height);
    imagemURL = canvas.toDataURL('image/jpeg');
    campoCamera.style.display = 'none';
    mensagemFoto.style.display = 'block';
})

btnEnviarFoto.addEventListener('click', () =>{
    const receberDadosExistente = localStorage.getItem('cadastro'); //Recebeu os dados em objeto que estavam armazenados na chave cadastro: nome, cpf, rg

    const converteRetorno = JSON.parse(receberDadosExistente); //Converte os dados em objeto

    converteRetorno.imagem = imagemURL; //Criou novo atributo

    localStorage.setItem('cadastro', JSON.stringify(converteRetorno)); //Colocou mais uma informação na chave cadastro e transformamos em json

    window.location.href = './abrir-conta-form-3.html'
})