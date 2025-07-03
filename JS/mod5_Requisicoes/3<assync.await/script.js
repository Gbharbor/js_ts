// Utilizando Async/Await para simular uma execução síncrona em requisições assíncronas
// - O async/await simplifica o código, tornando-o mais legível e eliminando a necessidade de encadeamento com .then() e .catch().
// - A função async permite o uso do await, que faz com que a execução aguarde a finalização de cada etapa antes de continuar.

// Exemplo de GET usando async/await
async function clicked() {
    try {
        // Armazena a resposta da requisição na variável response e aguarda a finalização com await
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        // Converte a resposta para JSON e armazena em uma variável
        let json = await response.json();
        
        // Exibe o título do primeiro post
        alert(`First title post: ${json[0].title}`);
        
        // O alert abaixo só será exibido após a execução completa das etapas anteriores, devido ao uso de await
        alert("clicked");
    } catch (error) {
        // Em caso de erro na requisição, exibe uma mensagem
        alert("Error on request");
    }
}
document.querySelector('#botao').addEventListener('click', clicked);

// Exemplo de POST usando async/await
async function inserir() {
    try {
        // Faz uma requisição POST com async/await para enviar dados
        let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST', // Define o método como POST para enviar dados
            headers: {
                'Content-Type': 'application/json' // Define o cabeçalho indicando que os dados são JSON
            },
            // Define o corpo (body) da requisição em JSON, com os dados a serem enviados
            body: JSON.stringify({
                title: 'Title test',
                body: 'Body test',
                userId: 2 // Define o autor do post
            })
        });
        
        // Converte a resposta para JSON e armazena em uma variável
        let json = await response.json();
        
        // Exibe os dados do post criado no console
        console.log("Post created it:", json);
        document.getElementById('output').innerHTML += `
        <div style="margin:10px 0; padding:10px; border:1px solid #ccc; border-radius:5px;">
            <strong>ID do Post:</strong> ${json.id}<br>
            <strong>Título:</strong> ${json.title}<br>
            <strong>Corpo:</strong> ${json.body}<br>
            <strong>UserID:</strong> ${json.userId}
        </div>`;
    } catch (error) {
        // Em caso de erro na requisição, exibe uma mensagem
        console.error("Error while sent data:", error);
    }
}
document.querySelector('#inserir').addEventListener("click", inserir);

/*
Explicação dos Conceitos Chave:

1. **Async/Await**:
   - Async: Adiciona a capacidade de uma função usar await e retornar automaticamente uma Promise.
   - Await: Faz com que o código espere até que a Promise seja resolvida ou rejeitada, tornando a execução síncrona, linha por linha.

2. **Requisições GET e POST**:
   - GET: Busca dados do servidor. No exemplo, é usado para recuperar posts.
   - POST: Envia dados para o servidor, criando um novo recurso (neste caso, um post).

3. **Tratamento de Erros com Try/Catch**:
   - O bloco `try/catch` captura e lida com erros dentro de funções assíncronas.
   - Se um erro ocorrer em qualquer ponto do `await`, o bloco `catch` será executado.

4. **Headers e Body**:
   - `Content-Type`: Define o tipo de dados enviados. `"application/json"` indica que os dados estão em JSON.
   - `Body`: Contém os dados a serem enviados em uma requisição POST, convertidos para JSON com `JSON.stringify()`.

5. **Diferença na Ordem de Execução**:
   - Com await, a execução é pausada até a Promise ser resolvida, simulando uma execução síncrona.
   - O alert "CLICOU" só é exibido após a conclusão da requisição no primeiro exemplo.

6. **Uso do DevTools para Monitorar a Requisição**:
   - Em "Network" (Fetch/XHR), as requisições GET e POST são monitoradas. 
   - Podemos verificar o status da requisição (ex., 200 para sucesso em GET, 201 para criação em POST) e inspecionar o conteúdo enviado e recebido.

Esse código ilustra como transformar uma execução assíncrona em um fluxo semelhante ao síncrono, utilizando async/await para simplificar e tornar o código mais legível e organizado.
*/