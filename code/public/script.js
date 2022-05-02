
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const lowercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase().split('')
const button = document.getElementById('submit');
//make the id for the database
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


//set the color of the color input to white, otherwise it is just a black bar
document.getElementById('color').value = '#FFFFFF'
button.addEventListener('click', async() => {
    //post embed to the database
    function postIdWithEmbed(id, title, description, color, image) {
        fetch('https://EmbedGenerator.kooterman.repl.co/database/post', {
        method: 'POST',
        body: JSON.stringify({
          id,
          title,
          description,
          color,
          image,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        }
      }).then(res => res.text()).then(console.log)
    }
    button.remove()
    //get the embed
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const image = document.getElementById('image').value
    const color =  document.getElementById('color').value;

    const id = makeid(6)
    const url = `https://embedgenerator.kooterman.repl.co/embeds/${id}`

  	postIdWithEmbed(id, title, description, color, image); 
    //create popup
    const div = document.createElement('div');
    div.classList.add('popup');
    div.id = 'newDiv'
    div.classList.remove('hidden')
    div.style.color = 'white';
    div.style.fontFamily = 'Arial';
    div.style.fontSize = 400;

  
    if(url.length > 200) {
        const newUrl = url.slice(0, 'https://embedgenerator.kooterman.repl.co/embeds/'.length)
        const textNodeEM = document.createTextNode(newUrl);
        const textNode = document.createElement('div')
        textNode.appendChild(textNodeEM);
        textNode.classList.add('url')
        div.appendChild(textNode);
    }
    else {
        const textNodeEM = document.createTextNode(url);
        const textNode = document.createElement('div')
        textNode.appendChild(textNodeEM);
        textNode.classList.add('url')
        div.appendChild(textNode);
    }

    const URLEm = document.createTextNode('Your URL');
    const URL = document.createElement('div');
    URL.appendChild(URLEm);
    URL.classList.add('uUrl')
    div.appendChild(URL)

    const copyButton = document.createElement('button')
    copyButton.classList.add('copyButton')
    copyButton.innerText = 'Copy'
    div.appendChild(copyButton);


    const closeButton = document.createElement('button');
    closeButton.classList.add('closeButton')
    closeButton.innerText = 'Close'
    div.appendChild(closeButton);

    document.body.appendChild(div)

    copyButton.addEventListener('click', async () => {
        await navigator.clipboard.writeText(url);
        alert('URL is copied to clipboard')
    });
    closeButton.addEventListener('click', async () => {
        div.remove()
        const btn = document.createElement('button');
        btn
        document.getElementById('main-div').appendChild(button)
    })
})  

const viewChangesButton = document.getElementById('viewChanges');

viewChangesButton.addEventListener('click', () => {
    
    
        const div = document.createElement('div');
        const btn = document.createElement('button');
        btn.classList.add('closeChanges')
        btn.id = 'closeChanges';
        btn.innerText = '❌';
        btn.style.fontSize = 300;
        btn.style.backgroundColor = 'black';
        btn.style.outline = 'none';
        btn.style.border = 'none';
        
        div.appendChild(btn)
        // div.innerText = 'This is a test';
        div.style.color = 'white';
        div.classList.add('viewChangeDiv');
        const h3 = document.createElement('h3');
        h3.classList.add('viewChangesText')
        h3.innerText = '1.0 - Launch\n1.1 - Changed style of the page\n1.2 - Made an id system'
        div.appendChild(h3)
        document.body.appendChild(div);
        btn.addEventListener('click', () => {
            div.remove()
        })
    
})
