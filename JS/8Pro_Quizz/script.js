// Inicialização
let currentQuestion = 0;
let correctAnswers = 0;
showQuestion();

// Evento para reiniciar o quiz
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Funções
function showQuestion() {
   if (currentQuestion < questions.length) {
      let q = questions[currentQuestion];

      // Atualiza a barra de progresso
      let pct = Math.floor((currentQuestion / questions.length) * 100);
      document.querySelector('.progress--bar').style.width = `${pct}%`;

      // Mostra a área de pergunta e esconde a pontuação
      document.querySelector('.scoreArea').style.display = 'none';
      document.querySelector('.questionArea').style.display = 'block';

      // Exibe a pergunta
      document.querySelector('.question').innerHTML = q.question;

      // Monta as opções e adiciona eventos de clique
      let optionsHtml = '';
      for (let i in q.options) {
         optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`;
      }

      let optionsContainer = document.querySelector('.options');
      optionsContainer.innerHTML = optionsHtml;

      document.querySelectorAll('.options .option').forEach(item => {
         item.addEventListener('click', optionClickEvent);
      });
   } else {
      finishQuiz();
   }
}

function optionClickEvent(e) {
   let clickedOption = parseInt(e.target.getAttribute('data-op'));
   if (questions[currentQuestion].answer === clickedOption) {
      correctAnswers++;
   }
   currentQuestion++;
   showQuestion();
}

function finishQuiz() {
   let points = Math.floor((correctAnswers / questions.length) * 100);
   let scoreText1 = document.querySelector('.scoreText1');
   let scorePct = document.querySelector('.scorePct');

   if (points < 30) {
      scoreText1.innerHTML = 'Estude mais';
      scorePct.style.color = '#ff0000';
   } else if (points >= 30 && points < 70) {
      scoreText1.innerHTML = 'Muito Bom';
      scorePct.style.color = '#ffff00';
   } else {
      scoreText1.innerHTML = 'Parabéns';
      scorePct.style.color = '#0D630D';
   }

   scorePct.innerHTML = `Acertou ${points}%`;
   document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

   // Mostra a área de resultado e esconde as perguntas
   document.querySelector('.scoreArea').style.display = 'block';
   document.querySelector('.questionArea').style.display = 'none';

   // Barra de progresso completa
   document.querySelector('.progress--bar').style.width = `100%`;
}

function resetEvent() {
   correctAnswers = 0;
   currentQuestion = 0;

   // Reseta barra de progresso
   document.querySelector('.progress--bar').style.width = `0%`;

   showQuestion();
}