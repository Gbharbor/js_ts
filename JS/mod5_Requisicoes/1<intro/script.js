/*Diferença entre Síncrono e Assíncrono

- Síncrono:
  Em execução síncrona, as operações são executadas sequencialmente, uma após a outra. Cada linha de código espera a execução da linha anterior antes de continuar.
  
  Exemplo:
*/

let nome = "gui";
let sobrenome = "lacerta";
let nomeCompleto = nome + " " + sobrenome;
console.log("Nome Completo (Síncrono):", nomeCompleto);

/*
- Assíncrono:
  Em execução assíncrona, várias operações podem ocorrer ao mesmo tempo. Funções assíncronas não bloqueiam o fluxo de execução do código enquanto aguardam uma resposta.
*/

/*
API
- API (Application Programming Interface) é uma interface que permite a comunicação entre diferentes sistemas.
- Por exemplo, para implementar um sistema de chat, uma API permite que o navegador se comunique com o servidor.

Padrões de Comunicação:
- JSON (JavaScript Object Notation): Muito utilizado para comunicação entre sistemas, com uma estrutura semelhante a objetos JavaScript.
- XML: Outro padrão de comunicação, embora menos comum atualmente.

Exemplo de uma URL que retorna dados em JSON: 
https://jsonplaceholder.typicode.com/posts
*/

/*
Callback
- Um callback é uma função passada como argumento para outra função, que será chamada ao final de uma operação específica.
*/

// Exemplo de uso de callback em um botão
document.querySelector('#botao').addEventListener('click', () => {
    alert("Clicou no botão usando callback direto");
});

// Definindo uma função de callback para uso posterior
function clickCallback() {
    alert("Clicou usando função de callback definida");
}
document.querySelector("#botao2").addEventListener("click", clickCallback); // Callback acionado ao clicar no botão

/*
Funções de callback são usadas para definir ações após um evento específico, como um clique de botão ou uma resposta de uma API.

Exemplo de Requisição Assíncrona usando Fetch API:
- A Fetch API é usada para fazer requisições HTTP. Ela retorna uma Promise que pode ser manipulada para processar respostas de forma assíncrona.
*/

// Função para executar uma requisição e processar a resposta
function clicou() {
    fetch('https://jsonplaceholder.typicode.com/posts') // Requisição GET para a URL especificada
        .then((response) => {
            console.log(`Status da resposta: ${response.status}`); // Exibe o status da resposta (ex., 200 para sucesso)

            // Transforma a resposta em JSON para ser utilizada no próximo .then()
            return response.json();
        })
        .then((json) => {
            // Exibe a quantidade de posts no DOM e mostra o título do primeiro post
            document.querySelector('.test1').innerHTML = `${json.length} posts`;
            console.log("Primeiro Post:", json[0]);
            alert(`Título do Primeiro Post: ${json[0].title}`);
        })
        .catch((error) => {
            // Executado em caso de erro
            console.log('Erro na requisição:', error);
            alert('Houve um problema na requisição');
        })
        .finally(() => {
            // Executado após o término da requisição, independente de sucesso ou erro
            alert('Requisição finalizada');
        });

    // Exemplo de alerta síncrono que aparece antes da requisição ser concluída
    alert("Esse alerta aparece antes da requisição assíncrona ser finalizada.");
}
document.querySelector('#botao3').addEventListener('click', clicou); // Associa a função 'clicou' ao botão

/*
Como monitorar a requisição no DevTools:
- Acesse a aba "Network" no DevTools para ver a requisição "posts" sendo enviada.
- Em "Fetch/XHR" são exibidas as requisições AJAX. Clique na requisição para ver detalhes como cabeçalhos, preview, response, etc.

Explicação sobre Promises:
- Uma Promise representa uma operação assíncrona e seu resultado futuro.
- Promises podem ser manipuladas com os métodos: 
    - then() - para quando a operação é bem-sucedida,
    - catch() - para quando há um erro, e 
    - finally() - executado após a finalização, independentemente de sucesso ou erro.
*/

// Exemplo básico de Promise simulando uma operação síncrona simples
function somar(x, y) {
    return x + y; // Retorna a soma dos valores
}
console.log("Resultado da soma:", somar(10, 20));

/*
Códigos de Status HTTP:
Os status HTTP informam o resultado de uma requisição:
- 200: OK - Requisição bem-sucedida.
- 201: Created - Recurso criado com sucesso.
- 301: Moved Permanently - URL movida permanentemente.
- 400: Bad Request - Erro na requisição.
- 401: Unauthorized - Falta de autorização.
- 403: Forbidden - Acesso negado.
- 404: Not Found - URL não encontrada.
- 500: Internal Server Error - Erro interno no servidor.
Para mais detalhes: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
*/