//ex using GET with async/await
async function clicked() {
   try {
      let response = await fetch('https://jsonplaceholder.typicode.com/posts');
      let json = await response.json();
      alert(`first title post ${json[0].title}`);
      alert('clicked!');
   } catch(error) {
      alert('Error on request');
   }
}
document.querySelector('#botao').addEventListener('click', clicked);

//ex using POST with async/await
async function insert() {
   try {
      let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
         method:'POST',
         Headers: {
            'Content-type' : 'application/json'
         },
         body: JSON.stringify(
            {
               title: 'Ttile test',
               body: 'body test',
               userID: 2
            })
      });
      let json = await response.json();
      onsole.log("Post created it:", json);
      document.getElementById('output').innerHTML += `
         <div style="margin:10px 0; padding:10px; border:1px solid #ccc; border-radius:5px;">
            <strong>ID do Post:</strong> ${json.id}<br>
            <strong>Título:</strong> ${json.title}<br>
            <strong>Corpo:</strong> ${json.body}<br>
            <strong>UserID:</strong> ${json.userId}
         </div>`;
   } catch (error) {
      console.error('Error while sent data:', error);
   }
}
document.querySelector('#insert').addEventListener("click", insert);