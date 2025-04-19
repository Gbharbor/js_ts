let cart =[];
let modalQt = 1;
let modalkey = 0; //sempre ao abrir o modal vai me dizer qual pizza escolhi

// Funções auxiliares para seleção de elementos no DOM
// "c" para querySelector e "cs" para querySelectorAll
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

// Percorre a lista de pizzas (pizzaJson),
// clona o modelo de item de pizza existente no HTML,
// preenche os dados de cada pizza e adiciona na tela
//Listagem das pizzas
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
      modalQt = 1;
      modalkey = key; // Nos diz qual a pizza
      // Logs para teste e depuração
      console.log(pizzaJson[key]);
      // Preenche o modal com os dados da pizza clicada
      c('.pizzaBig img').src = pizzaJson[key].img;
      c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
      c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
      c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
      c('.pizzaInfo--size.selected').classList.remove('selected');// ele n deixa nada selecionado.
      cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
         if(sizeIndex == 2) {
            size.classList.add('selected'); //sempre ao abrir vai selecionar a grande automaticamente.
         }
         size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
      });
      //Quantidde de itens selecionados
      c('.pizzaInfo--qt').innerHTML = modalQt;
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
// Função para fechar o modal
function closeModal() {
   const modal = c('.pizzaWindowArea');
   modal.style.opacity = 0; // Torna o modal invisível (mas ainda na tela)
   setTimeout(() => {
      modal.style.display = 'none'; // Após 500ms, remove o modal da tela
   }, 500);
}

// Adiciona evento aos botões de cancelar (desktop e mobile)
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
   item.addEventListener('click', closeModal);
});

// Botão de diminuir quantidade
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
   // Garante que a quantidade nunca seja menor que 1
   if (modalQt > 1) {
      modalQt--;
      c('.pizzaInfo--qt').innerHTML = modalQt;
   }
});

// Botão de aumentar quantidade
c('.pizzaInfo--qtmais').addEventListener('click', () => {
   modalQt++;
   c('.pizzaInfo--qt').innerHTML = modalQt;
});

// Seleção de tamanho da pizza
cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
   size.addEventListener('click', () => {
      // Remove seleção anterior
      c('.pizzaInfo--size.selected').classList.remove('selected');
      // Adiciona a nova seleção
      size.classList.add('selected');
      // Importante: não usar e.target aqui para evitar erros ao clicar em elementos internos (ex: span)
   });
});
c('.pizzaInfo--addButton').addEventListener('click', () => {
   let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
   let identifier = pizzaJson[modalkey].id+'@'+size;
   let key = cart.findIndex((item)=>item.identifier == identifier); //se tiver o msm identifier, ele junta.
   if(key > -1) {
      cart[key].qt += modalQt;
   } else {
      cart.push({
         identifier,
         id:pizzaJson[modalkey].id,
         size,
         qt:modalQt
      });
   }
   updateCart();
   closeModal();
});
function updateCart() {
   if(cart.length > 0) {
      c('aside').classList.add('show');
      for(let i in cart) {
         let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
         let cartItem = c('.models .cart--item').cloneNode(true);
         let pizzaSizeName;
         switch(cart[i].size) {
            case 0:
               pizzaSizeName = 'P';
               break;
            case 1:
               pizzaSizeName = 'M';
               break;
            case 2:
               pizzaSizeName = 'G';
               break;
         }
         let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
         cartItem.querySelector('img').src = pizzaItem.img;
         cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
         cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
         c('.cart').append(cartItem);
      }
   } else {
      c('aside').classList.remove('show');
   }
}