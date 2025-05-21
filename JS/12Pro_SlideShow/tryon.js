const sliderWidth = document.querySelector('.slider--width');
const sliderControls = document.querySelector('.slider--controls');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider--item');

let totalSlides = slides.length;
let currentSlide = 0;

if(totalSlides > 0) {
   //ajusta a largura da area que contem os slides
   sliderWidth.style.width = `calc(100vw * ${totalSlides})`;
   //ajusta altura dos controles conforme o slider
   sliderControls.style.height = `${slider.clientHeight}px`;

   function updateMargin() {
      //pegando a largura do slide atual (considera que todos tem a msm largura)
      let slideItemWidth = slides[0].clientWidth;
      let newMargin = currentSlide * slideItemWidth;
      sliderWidth.style.marginLeft = `-${newMargin}px`;
   }
   function goPrev() {
      currentSlide--;
      if(currentSlide < 0){
         currentSlide = totalSlides - 1;
      }
      updateMargin();
   }
   function goNext() {
      currentSlide++;
      if(currentSlide >= totalSlides) {
         currentSlide = 0;
      }
      updateMargin();
   }
   setInterval(goNext, 4000);
}