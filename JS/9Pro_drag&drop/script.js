let areas = {
   a: null,
   b: null,
   c: null
}

// Adiciona eventos de arrastar nos itens
document.querySelectorAll('.item').forEach(item => {
   item.addEventListener('dragstart', dragStart);
   item.addEventListener('dragend', dragEnd);
});

// Toda área de arrastar e soltar precisa de pelo menos esses 3 eventos
document.querySelectorAll('.area').forEach(area => {
   area.addEventListener('dragover', dragOver);    // ao passar por cima ele roda a função
   area.addEventListener('dragleave', dragLeave);
   area.addEventListener('drop', drop);            // só funciona se dragOver liberar que posso dar o drop
});

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

// ========================
// Functions Item
// ========================
function dragStart(e) {
   e.currentTarget.classList.add('dragging'); // ao arrastar ele cria uma opacity, ao arrastar ele cria a class no html
}

function dragEnd(e) {
   e.currentTarget.classList.remove('dragging');
}

// ========================
// Functions Area
// ========================
function dragOver(e) {
   // console.log("passou por cima") 
   // só add o efeito se não tiver nenhum item dentro da área onde quero soltar
   if (e.currentTarget.querySelector('.item') == null) {   
      e.preventDefault(); // isso faz com que libere pro drop poder soltar
      e.currentTarget.classList.add('hover');
   }
}

function dragLeave(e) {
   // console.log("saiu de uma area dopravel")
   e.currentTarget.classList.remove('hover');
}

function drop(e) {
   // console.log('liberou')
   e.currentTarget.classList.remove('hover');

   // verificar se no quadrado que to tentando dar o drop, já não tem um item lá
   if (e.currentTarget.querySelector('.item') == null) {   
      let dragItem = document.querySelector('.item.dragging');
      e.currentTarget.appendChild(dragItem); // aqui ocorre a mágica, onde trocamos o item de lugar, e removendo da área anterior
      updateAreas();
   }
}

// ========================
// Functions Neutral Area
// ========================
function dragOverNeutral(e) {
   e.preventDefault();
   e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e) {
   e.currentTarget.classList.remove('remove');
}

function dropNeutral(e) {
   e.currentTarget.classList.remove('hover');
   let dragItem = document.querySelector('.item.dragging');
   e.currentTarget.appendChild(dragItem);
   updateAreas();
}

// ========================
// Logic Functions
// ========================
// Ela irá funcionar nos dois drops, ou seja, sempre que ocorrer uma troca, atualizamos
function updateAreas() {
   document.querySelectorAll('.area').forEach(area => {
      let name = area.getAttribute('data-name');

      if (area.querySelector('.item') !== null) {
         areas[name] = area.querySelector('.item').innerHTML; // basicamente digo o que tem em cada item do objeto que criei em areas
      } else {
         areas[name] = null;
      }
   });

   if (areas.a === '1' && areas.b === '2' && areas.c === '3') {
      document.querySelector('.areas').classList.add('correct');
   } else {
      document.querySelector('.areas').classList.remove('correct');
   }
}