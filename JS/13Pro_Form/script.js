// Objeto responsável pela validação do formulário
let B7Validator = {
   // Método que lida com o envio do formulário
   handleSubmit: (event) => {
      event.preventDefault(); // Impede o envio padrão do formulário

      let send = true; // Flag que determina se o formulário pode ser enviado

      let form = event.target; // Pega o formulário que disparou o evento
      let inputs = form.querySelectorAll('input'); // Seleciona todos os campos input do formulário
      B7Validator.clearErrors(form); // Limpa os erros anteriores antes de validar novamente

      // Loop por todos os inputs para validar
      for (let input of inputs) {
         let check = B7Validator.checkInput(input); // Verifica se o input está de acordo com as regras
         if (check !== true) { // Se não estiver válido
            send = false; // Impede envio
            B7Validator.showError(input, check); // Mostra a mensagem de erro no campo
         }
      }

      // Se todos os campos forem válidos, envia o formulário
      if (send) {
         form.submit();
      }
   },

   // Método que verifica se um campo atende às regras definidas em data-rules
   checkInput: (input) => {
      let rules = input.getAttribute('data-rules'); // Pega o atributo com as regras de validação

      if (rules !== null) {
         rules = rules.split('|'); // Separa múltiplas regras por "|"

         for (let rule of rules) {
            let [ruleName, ruleValue] = rule.split('='); // Separa o nome da regra e o valor, se houver

            switch (ruleName) {
               case 'required': // Regra de campo obrigatório
                  if (input.value.trim() === '') {
                     return 'Campo não pode ser vazio';
                  }
                  break;

               case 'min': // Regra de tamanho mínimo
                  if (input.value.length < parseInt(ruleValue)) {
                     return `Campo tem que ter pelo menos ${ruleValue} caracteres`;
                  }
                  break;

               case 'email': // Regra de formato de email
                  if (input.value.trim() !== '') {
                     let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar email
                     if (!regex.test(input.value.toLowerCase())) {
                        return 'Email digitado não é válido!';
                     }
                  }
                  break;
            }
         }
      }

      return true; // Retorna true se o campo passou por todas as validações
   },

   // Método para exibir uma mensagem de erro abaixo do campo
   showError: (input, error) => {
      input.style.borderColor = '#FF0000'; // Destaca o campo com borda vermelha

      let errorElement = document.createElement('div'); // Cria elemento para mensagem de erro
      errorElement.classList.add('error'); // Adiciona classe CSS
      errorElement.innerHTML = error; // Define o texto da mensagem

      input.parentElement.appendChild(errorElement); // Adiciona o erro ao DOM, logo abaixo do input
   },

   // Método para limpar mensagens de erro e estilos de erro do formulário
   clearErrors: (form) => {
      let inputs = form.querySelectorAll('input'); // Seleciona todos os inputs do formulário
      for (let input of inputs) {
         input.style = ''; // Remove estilos aplicados diretamente (como borda vermelha)
      }

      let errorElements = form.querySelectorAll('.error'); // Seleciona todos os elementos de erro
      for (let errorElement of errorElements) {
         errorElement.remove(); // Remove os elementos de erro do DOM
      }
   }
};

// Seleciona o formulário com a classe 'b7validator'
let form = document.querySelector('.b7validator');

// Adiciona o evento de envio ao formulário, que chamará a função de validação
form.addEventListener('submit', B7Validator.handleSubmit);