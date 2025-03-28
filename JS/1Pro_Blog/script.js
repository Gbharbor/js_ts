w// URL para a API JSON Placeholder para ler e inserir posts
// Essa API é "fake", então o POST simula a inserção de dados, mas não salva de fato no servidor.

// Limite de posts que serão exibidos
const postLimit = 4;

// Função para carregar e exibir os posts
async function readPosts() {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Carregando...';

    // Faz uma requisição GET para buscar os posts
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();

    // Verifica se a resposta contém posts
    if (json.length > 0) {
        postArea.innerHTML = '';
        
        // Exibe apenas os posts até o limite especificado
        for (let i = 0; i < Math.min(postLimit, json.length); i++) {
            let postHtml = `<div><h1>${json[i].title}</h1><p>${json[i].body}</p></div>`;
            postArea.innerHTML += postHtml;
        }
    } else {
        postArea.innerHTML = 'Nenhum post para exibir.';
    }
}

// Função para adicionar um novo post
async function addNewPost(title, body) {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            body,
            userId: 2
        })
    });

    document.querySelector('#titleField').value = '';
    document.querySelector('#bodyField').value = '';

    // Atualiza a exibição dos posts após a inserção
    updatePostArea(title, body);
}

// Função auxiliar para atualizar a área de posts ao inserir um novo post
function updatePostArea(title, body) {
    const postArea = document.querySelector('.posts');
    const postHtml = `<div><h1>${title}</h1><p>${body}</p></div>`;
    postArea.innerHTML = postHtml + postArea.innerHTML;

    // Limita a quantidade de posts visíveis, removendo os mais antigos
    while (postArea.children.length > postLimit) {
        postArea.removeChild(postArea.lastChild);
    }
}

// Evento de clique para o botão de inserir post
document.querySelector('#insertButton').addEventListener("click", () => {
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    if (title && body) {
        addNewPost(title, body);
    } else {
        alert('Preencha todos os campos');
    }
});

// Chama a função readPosts ao carregar a página para exibir os posts iniciais
readPosts();
