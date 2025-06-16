// URL para a API JSON Placeholder (https://jsonplaceholder.typicode.com/posts)
// Quando fazemos uma requisição, podemos observar no DevTools (em "Network") o método utilizado, que no caso do GET é o método padrão.
// Os principais métodos de requisição HTTP incluem:
// - GET: Recupera informações
// - POST: Insere ou envia dados
// - PUT: Altera informações existentes
// - DELETE: Remove dados

// Exemplo de requisição GET
function clicou() {
   fetch('https://jsonplaceholder.typicode.com/posts')
       .then((response) => {
           return response.json();
       })
       .then((json) => {
           alert(`Título do primeiro post: ${json[0].title}`);
           document.querySelector('#resultado').innerHTML = `GET executado com sucesso!<br>Título: ${json[0].title}`;
       })
       .catch(() => {
           alert("Houve um problema na requisição");
       });
}
document.querySelector('#botao').addEventListener('click', clicou);

// Exemplo de requisição POST
function inserir() {
   fetch('https://jsonplaceholder.typicode.com/posts', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
           title: 'Título de teste',
           body: 'Corpo de teste',
           userId: 2
       })
   })
   .then((response) => {
       return response.json();
   })
   .then((json) => {
       console.log("Dados do post criado:", json);
       document.querySelector('#resultado').innerHTML = `POST executado com sucesso!<br>ID do novo post: ${json.userId}`;
   });
}
document.querySelector('#inserir').addEventListener('click', inserir);

// Explicação dos Métodos HTTP e Status Codes:
// - GET: Usado para buscar dados sem alterar o estado do servidor.
// - POST: Usado para enviar dados e criar um novo recurso.
// - Na aba Network do DevTools, a seção Payload exibe o conteúdo enviado na requisição.
// - Status Codes:
//    - 200: OK
//    - 201: Created
//    - 404: Not Found
//    - 500: Internal Server Error