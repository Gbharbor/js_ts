//objeto responsavel pela validacao do formulario
let B7Validator = {
   //metodo q lida com o envio do formulario
   handleSubmit: (event) => {
      event.preventDefault();//impede o envio padrao do formulario
      let send = true; //flag qdetermina se o form pode ser enviado
      let form = event.target; //pega o form que disparou o evento
      let inputs = form.querySelectorAll('input');//Seleciona tds input do form
      B7Validator.clearErrors(form);//limpa os erros anteriores antes de validar novamente

      //loop por tds so inputs para validar
      for(let input of inputs){
         let check = B7Validator.checkInput(input);//verifica se o input esta de acordo com as regras
         if(check !==true){ //se n estiver valido
            send = false; //impede envio
            B7Validator.showError(input, check);//mostra a msg de erro no campo
         }
      }
      //se tds os campos forem validos, envia o form
      if(send) {
         form.submit();
      }  
   },
   //metodo q verifica se um campo atende as regras definidas em data-rules
   checkInput: (input)=>{
      let rules = input.getAttribute('data-rules');//pega o atributo com as regras de validacao
      if(rules !== null){
         rules = rules.split('|')//separa multiplas regras por |
         for(let rule of rules){
            let[ruleName, ruleValue] = rule.split('=');//separa o nome da regra e o valor, se tiver
            switch (ruleName){
               case 'required'://regra de cmapo obrigatorio
                  if(input.value.trim() === ''){
                     return 'Campo n pode ser vazio.';
                  }
               break;
               case 'min': //regra de tam min
                  if(input.value.length < perseInt(ruleValue)){
                     return `Campo tem q ter pelo menos ${ruleValue} caracteres.`;
                  }
               break;
               case 'email': //regra formato de email
                  if(input.value.trim() !== ''){
                     let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//Regex p/ validar email
                     if(!regex.test(input.value.toLowerCase())){
                        return 'Email digitado n e valido!';
                     }
                  }
               break;
            }
         }
      }
      return true;//retorna true se o campo passou por tds etapas de validacao
   },
   //metodo p/ exibir uma msg de erro abaixo do campo
   showError: (input, error)=>{
      input.style.borderColor = '#FF0000';
      let errorElement = document.createElement('div');//cria a div
      errorElement.classList.add('error');//add a classe css
      errorElement.innerHTML = error;//define o txt da msg
      input.parentElement.appendChild(errorElement);//add o erro ao DOM, logo abaixo do input
   },
   //metodo p/ limpar msg de erro e estilos de erro do form
   clearErrors: (form)=>{
      let inputs = form.querySelectorAll('input');//seleciona tds input do form
      for(let input of inputs) {
         input.style = '';//remove estilos aplicados diretamente 
      }
      let errorElements = form.querySelectorAll('.error');//seleciona tds elementos de erro
      for(let errorElement of errorElements){
         errorElement.remove();//remove os elementos de erro do DOM
      }
   }
};
//seleciona o form c/ a classe 'b7validator'
let form = document.querySelector('.b7validator');
//add o evento de envio ao form, que chamara a funcao de validacao
form.addEventListener('submit', B7Validator.handleSubmit);