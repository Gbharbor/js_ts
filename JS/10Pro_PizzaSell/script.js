let cart = [];
let modalQt = 1;
let modalkey = 0; // Sempre ao abrir o modal vai me dizer qual pizza escolhi

// Funções auxiliares para seleção de elementos no DOM
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

// Listagem das pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    // Evento para exibir o modal
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalkey = key;
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected'); // Seleciona tamanho grande por padrão
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        c('.pizzaInfo--qt').innerHTML = modalQt;
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    c('.pizza-area').append(pizzaItem);
});

// Função para fechar o modal
function closeModal() {
    const modal = c('.pizzaWindowArea');
    modal.style.opacity = 0;
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500);
}

// Adiciona evento aos botões de cancelar
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

// Botão de diminuir quantidade
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
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
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

// Adiciona pizza ao carrinho
c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalkey].id + '@' + size;
    let key = cart.findIndex((item) => item.identifier == identifier);

    if (key > -1) {
        cart[key].qt += modalQt; // Se a pizza já existir no carrinho, atualiza a quantidade
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalkey].id,
            size,
            qt: modalQt
        });
    }
    updateCart();
    closeModal();
});
c('.menu-openner').addEventListener('click',()=>{
   //quando clicar o aside aparece
   if(cart.length > 0) {
      c('aside').style.left = '0'
   }
});
c('.menu-closer').addEventListener('click', ()=>{
   c('aside').style.left = '100vw';

});
// Atualiza o carrinho
function updateCart() {
   c('.menu-openner span').innerHTML = cart.length;


   if (cart.length > 0) {
      c('aside').classList.add('show');
      c('.cart').innerHTML = ''; // Limpa o carrinho antes de preencher novamente

      let subtotal = 0;
      let desconto = 0;
      let total = 0;

      for (let i in cart) {
         let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
         subtotal += pizzaItem.price * cart[i].qt;


         let cartItem = c('.models .cart--item').cloneNode(true);
         let pizzaSizeName;
         switch (cart[i].size) {
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

         // Função para diminuir a quantidade de uma pizza
         cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
               if (cart[i].qt > 1) {
                  cart[i].qt--;
               } else {
                  cart.splice(i, 1); // Remove a pizza do carrinho
               }
               updateCart();
         });

         // Função para aumentar a quantidade de uma pizza
         cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
               cart[i].qt++;
               updateCart();
         });

         c('.cart').append(cartItem);
      }
      desconto = subtotal * 0.1;
      total = subtotal - desconto;
      c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
      c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
      c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

   } else {
      c('aside').classList.remove('show');
      c('aside').style.left = '100vw';
   }
}