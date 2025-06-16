let nome = "gui";
let sobrenome = "porto";
let nomeCompleto = nome +" "+sobrenome
console.log("Nome Completo(sincrono): ", nomeCompleto);

//calback direto
document.querySelector('#botao').addEventListener('click', ()=>{
   alert('clicou no botao usando callback direto');
});
//callback definido
function clickCallback() {
   alert('clicou usando funcao de callback definida');
}
document.querySelector('#botao2').addEventListener('click', clickCallback);
//requisicoes assincrono com fetch (com promise)
function clicou() {
   fetch('https://jsonplaceholder.typicode.com/posts').then((response)=>{
      console.log(`status da resposta: ${response.status}`);
      return response.json();
   })
   .then((json)=>{
      document.querySelector('.teste1').innerHTML = `${json.length} posts encontrados. Primeiro titulo ${json[0].title}`;
      console.log('Primeiro Post:', json[0]);
   })
   .catch((error)=>{
      console.log('Erro na requisicao: ', error);
      alert ('houve uma requisicao');
   })
   .finally(()=>{
      alert('Requisicao finalizada');
   })
   alert ('esse alerta aparece antes da requisicao assincrona ser finalizada.');
};
document.querySelector('#botao3').addEventListener('click'. clicou);

//sincrono simples
function somar (x, y) {
   return (x + y);
}
console.log('resultado da soma sincrona: ', somar(5,5));