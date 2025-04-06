// Criamos constantes para facilitar a seleção de elementos no DOM:
// Assim, podemos usar apenas "c" ou "cs" para selecionar elementos com querySelector e querySelectorAll, respectivamente.
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

// Vamos mapear a lista de pizzas (pizzaJson),
// clonar o modelo de pizza existente no HTML,
// preencher os dados de cada pizza,
// e então adicionar cada uma na tela.
pizzaJson.map((item, index) => {
   // Clona o modelo de item de pizza (tudo que estiver dentro de .pizza-item)
   let pizzaItem = c('.models .pizza-item').cloneNode(true);

   // Insere a imagem da pizza
   pizzaItem.querySelector('.pizza-item--img img').src = item.img;

   // Insere o preço formatado com cifrão e duas casas decimais
   pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
   // Obs: usamos template string para incluir o símbolo de "R$"
   // e toFixed(2) para garantir que apareçam os centavos, mesmo que sejam zero

   // Insere o nome da pizza
   pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;

   // Insere a descrição da pizza
   pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

   // Adiciona o item de pizza já preenchido dentro da área de pizzas no HTML
   c('.pizza-area').append(pizzaItem);
});
