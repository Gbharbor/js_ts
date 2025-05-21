// Seleciona o elemento que contém todos os slides (a "faixa" que desliza)
const sliderWidth = document.querySelector('.slider--width');

// Seleciona o container dos botões de controle (voltar/próximo)
const sliderControls = document.querySelector('.slider--controls');

// Seleciona o container principal do slider
const slider = document.querySelector('.slider');

// Seleciona todos os slides individuais dentro do slider
const slides = document.querySelectorAll('.slider--item');

// Guarda a quantidade total de slides
let totalSlides = slides.length;

// Índice do slide atual que está sendo exibido (começa no primeiro)
let currentSlide = 0;

// Só roda o código se houver pelo menos um slide
if (totalSlides > 0) {

  // Define a largura total da faixa de slides para acomodar todos lado a lado
  // Cada slide tem 100vw (100% da largura da viewport), então multiplica pela quantidade total
  sliderWidth.style.width = `calc(100vw * ${totalSlides})`;

  // Ajusta a altura dos controles para serem igual à altura do slider
  sliderControls.style.height = `${slider.clientHeight}px`;

  // Função que atualiza a margem esquerda da faixa de slides para mostrar o slide correto
  function updateMargin() {
    // Pega a largura de um slide (assume que todos têm a mesma largura)
    //slides[0] pega o primeiro slide dessa lista, ou seja, o primeiro elemento <div class="slider--item">
    let slideItemWidth = slides[0].clientWidth;

    // Calcula a nova margem, deslocando a faixa para a esquerda para exibir o slide atual
    let newMargin = currentSlide * slideItemWidth;

    // Aplica a margem negativa para "mover" a faixa de slides horizontalmente
    sliderWidth.style.marginLeft = `-${newMargin}px`;
  }

  // Função que vai para o slide anterior
  function goPrev() {
    currentSlide--; // diminui o índice do slide atual

    // Se passar do primeiro slide, volta para o último
    if (currentSlide < 0) {
      currentSlide = totalSlides - 1;
    }

    // Atualiza a posição da faixa para o slide correto
    updateMargin();
  }

  // Função que vai para o próximo slide
  function goNext() {
    currentSlide++; // aumenta o índice do slide atual

    // Se passar do último slide, volta para o primeiro
    if (currentSlide >= totalSlides) {
      currentSlide = 0;
    }

    // Atualiza a posição da faixa para o slide correto
    updateMargin();
  }

  // Executa automaticamente a função de ir para o próximo slide a cada 5 segundos
  setInterval(goNext, 5000);
}
