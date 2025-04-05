//          |SELECIONANDO ELEMENTOS I|
// Exibe todas as tags "h1"
let elementos = document.getElementsByTagName("h1");
elementos;
elementos[1];

//          |SELECIONANDO ELEMENTOS II|
// Seleção por ID (único)
document.getElementById("teste");

// Seleção por classe (pode retornar múltiplos elementos)
document.getElementsByClassName("botao0");

// Seleção usando querySelector (como no CSS)
document.querySelector("#teste");
document.querySelector(".botao0");
document.querySelector("h1");

// Selecionando elementos em níveis/hierarquias
document.querySelector("li");                  // Primeiro "li"
document.querySelectorAll("li");              // Todos os "li"
document.querySelectorAll("#teste2 ul li");   // Hierarquia específica

//          |EVENTOS DE CLIQUE|

// 1. Função chamada pelo onclick no HTML
function clicou0() {
    console.log("clicou botao0");
}

// 2. Usando addEventListener com função nomeada
function clicou1() {
    console.log("clicou botao1");
}
let botao1 = document.querySelector(".botao1");
botao1.addEventListener("click", clicou1);

// 3. Função dentro do addEventListener
let botao2 = document.querySelector(".botao2");
botao2.addEventListener("click", function clicou2() {
    console.log("clicou botao2");
});

// 4. Função anônima com arrow function
let botao3 = document.querySelector("#botao3");
botao3.addEventListener("click", () => {
    console.log("clicou botao3");
});

// 5. Chamando função existente dentro do addEventListener
function clicou4() {
    console.log("clicou botao4");
}
let botao4 = document.getElementById("botao4");
botao4.addEventListener("click", function() {
    clicou4();
});

// 6. Selecionando elemento específico por classe (índice)
document.getElementsByClassName("botao5")[1].addEventListener("click", function clicou5() {
    console.log("clicou botao5");
});

//          |VISUALIZAÇÃO E CONSOLE|

// Selecionando vários <li> dentro da div #teste2
let list0 = document.querySelectorAll("#teste2 ul li");
console.log(list0);       // Todos os itens
console.log(list0[0]);    // Primeiro item

let list1 = document.querySelector("li");
console.log(list1);       // Primeiro <li>

let list2 = document.querySelectorAll("li");
console.log(list2[3]);    // Quarto <li>

console.log(elementos[0]); // Primeiro <h1>

//          |EVENTO NA ÁREA NEUTRA|

document.querySelector('.neutralArea').addEventListener('click', (e) => {
   console.log('TARGET', e.target);            // Elemento exato clicado
   console.log('CURRENT TARGET', e.currentTarget); // Onde o evento está registrado
});

/*
Explicação:
- e.target -> Elemento exato clicado (ex: botão dentro da div)
- e.currentTarget -> Elemento onde o evento foi anexado (ex: .neutralArea)

Exemplo:
<div class="neutralArea">
   <button class="btn">Clique aqui</button>
</div>

Clicando no botão:
- e.target = <button class="btn">
- e.currentTarget = <div class="neutralArea">
*/