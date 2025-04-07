// Funções auxiliares para seleção de elementos no DOM
// "c" para querySelector e "cs" para querySelectorAll
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

// Percorre a lista de pizzas (pizzaJson),
// clona o modelo de item de pizza existente no HTML,
// preenche os dados de cada pizza e adiciona na tela
pizzaJson.map((item, index) => {
   // Clona o modelo de item de pizza (elemento dentro de .pizza-item)
   let pizzaItem = c('.models .pizza-item').cloneNode(true);

   // Define um atributo data-key com o índice da pizza
   pizzaItem.setAttribute('data-key', index);

   // Insere a imagem da pizza
   pizzaItem.querySelector('.pizza-item--img img').src = item.img;

   // Insere o preço, formatado com "R$" e duas casas decimais
   pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

   // Insere o nome da pizza
   pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;

   // Insere a descrição da pizza
   pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

   // Adiciona evento de clique no link do item de pizza
   pizzaItem.querySelector('a').addEventListener('click', (e) => {
      // Previne o comportamento padrão (como atualizar a página)
      e.preventDefault();

      // Pega o índice da pizza clicada a partir do atributo data-key
      let key = e.target.closest('.pizza-item').getAttribute('data-key');

      // Logs para teste e depuração
      console.log('Pizza clicada: ' + key);
      console.log(pizzaJson[key]);
      console.log('Clicou na pizza');

      // Preenche o modal com os dados da pizza clicada
      c('.pizzaBig img').src = pizzaJson[key].img;
      c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
      c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

      // Exibe o modal com animação suave
      c('.pizzaWindowArea').style.opacity = 0;
      c('.pizzaWindowArea').style.display = 'flex';

      // Aplica efeito de transição com delay
      setTimeout(() => {
         c('.pizzaWindowArea').style.opacity = 1;
      }, 200);
   });

   // Adiciona o item de pizza preenchido na área de pizzas do HTML
   c('.pizza-area').append(pizzaItem);
});