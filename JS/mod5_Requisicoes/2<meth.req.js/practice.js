function clicou() {
   fetch('https://jsonplaceholder.typicode.com/posts').then((response)=>{
      return response.json();
   }).then((json)=>{
      alert(`titulo do primeiro post: ${json[0].title}`);
      document.querySelector('#resultado').innerHTML = `GET executado com sucesso <br>Titulo: ${json[0].title}`;
   }).catch(()=>{
      alert('Houve um problema na requisicao');
   });
};
document.querySelector('#botao').addEventListener('click', clicou);

//exemplo de requisicao POST
function inserir() {
   fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         title: 'Titulo de teste',
         body: 'Corpo de teste',
         userId: 2
      })
   }).then((response)=>{
      return response.json();
   }).then((json)=>{
      console.log('Dados do post criado: ', json);
      document.querySelector('#resultado').innerHTML = `Post executado com sucesso! <br>ID do novo post: ${json.userId}`;
   });
}
document.querySelector('#inserir').addEventListener('click', inserir);