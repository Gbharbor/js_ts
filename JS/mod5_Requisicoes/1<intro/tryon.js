    // Síncrono
    let nome = "gui";
    let sobrenome = "lacerta";
    let nomeCompleto = nome + " " + sobrenome;
    console.log("Nome Completo (Síncrono):", nomeCompleto);

    // Callback direto
    document.querySelector('#botao').addEventListener('click', () => {
      alert("Clicou no botão usando callback direto");
    });

    // Callback definido
    function clickCallback() {
      alert("Clicou usando função de callback definida");
    }
    document.querySelector('#botao2').addEventListener('click', clickCallback);

    // Requisição Assíncrona com Fetch (com Promise)
    function clicou() {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          console.log(`Status da resposta: ${response.status}`);
          return response.json();
        })
        .then((json) => {
          document.querySelector('.test1').innerHTML = `${json.length} posts encontrados. Primeiro título: ${json[0].title}`;
          console.log("Primeiro Post:", json[0]);
        })
        .catch((error) => {
          console.log('Erro na requisição:', error);
          alert('Houve um problema na requisição');
        })
        .finally(() => {
          alert('Requisição finalizada');
        });

      alert("Esse alerta aparece antes da requisição assíncrona ser finalizada.");
    }

    document.querySelector('#botao3').addEventListener('click', clicou);

    // Síncrono simples
    function somar(x, y) {
      return x + y;
    }
    console.log("Resultado da soma (síncrona):", somar(10, 20));