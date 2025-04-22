// =========================
// Elementos do DOM
// =========================
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeroContainer = document.querySelector('.d-1-3');

// =========================
// Estado da votação
// =========================
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

// =========================
// Função utilitária
// =========================
function mostrarElemento(elemento, mostrar) {
   elemento.style.display = mostrar ? 'block' : 'none';
}

// =========================
// Inicializa a etapa atual
// =========================
function comecarEtapa() {
   let etapa = etapas[etapaAtual];
   let numeroHtml = '';
   numero = '';
   votoBranco = false;

   for (let i = 0; i < etapa.numeros; ++i) {
      numeroHtml += `<div class="numero${i === 0 ? ' pisca' : ''}"></div>`;
   }

   mostrarElemento(seuVotoPara, false);
   mostrarElemento(aviso, false);

   cargo.innerHTML = etapa.titulo;
   descricao.innerHTML = '';
   lateral.innerHTML = '';
   numeroContainer.innerHTML = numeroHtml;
}

// =========================
// Atualiza a interface após digitação
// =========================
function atualizaInterface() {
   let etapa = etapas[etapaAtual];
   let candidato = etapa.candidatos.filter((item) => item.numero === numero);

   if (candidato.length > 0) {
      candidato = candidato[0];

      mostrarElemento(seuVotoPara, true);
      mostrarElemento(aviso, true);

      descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

      let fotosHtml = '';
      for (let i in candidato.fotos) {
         const foto = candidato.fotos[i];
         fotosHtml += `
            <div class="d-1-image${foto.small ? ' small' : ''}">
               <img src="images/${foto.url}" alt="" />${foto.legenda}
            </div>`;
      }
      lateral.innerHTML = fotosHtml;

   } else {
      mostrarElemento(seuVotoPara, true);
      mostrarElemento(aviso, true);
      descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
   }

   console.log("candidato: ", candidato);
}

// =========================
// Trata clique em um número
// =========================
function clicou(n) {
   let elNumero = document.querySelector('.numero.pisca');

   if (elNumero !== null) {
      elNumero.innerHTML = n;
      numero += n;
      elNumero.classList.remove('pisca');

      if (elNumero.nextElementSibling !== null) {
         elNumero.nextElementSibling.classList.add('pisca');
      } else {
         atualizaInterface();
      }
   }
}

// =========================
// Voto em branco
// =========================
function branco() {
   numero = '';
   votoBranco = true;

   mostrarElemento(seuVotoPara, true);
   mostrarElemento(aviso, true);

   numeroContainer.innerHTML = '';
   descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
   lateral.innerHTML = '';
}

// =========================
// Corrigir voto
// =========================
function corrige() {
   comecarEtapa();
}

// =========================
// Confirmar voto
// =========================
function confirma() {
   let etapa = etapas[etapaAtual];
   let votoConfirmado = false;

   if (votoBranco === true) {
      votoConfirmado = true;
      votos.push({
         etapa: etapa.titulo,
         voto: 'branco'
      });

   } else if (numero.length === etapa.numeros) {
      votoConfirmado = true;
      votos.push({
         etapa: etapa.titulo,
         voto: numero
      });
   }

   if (votoConfirmado) {
      etapaAtual++;

      if (etapas[etapaAtual] !== undefined) {
         comecarEtapa();
      } else {
         document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
         console.log(votos);
      }
   }
}

// =========================
// Inicialização
// =========================
comecarEtapa();