const express = require('express');

const app = express();



app.get('/', (request, response) => {
  console.log('Site opened D:')
  response.sendFile('index.html', { root: '.' })
  // console.log(document.getElementById('color'))
  
})


app.get(/embeds/, (request, response) => {
  let decoded = JSON.parse(decodeURIComponent((request.url.slice(8) + '')));
  decoded.color = `#${decoded.color}`
  console.log(decoded)
  response.send(`<html>
        <head>
        <meta content="${decoded.title}" property="og:title"/>
        <meta content="${decoded.description}" property="og:description"/>
        <meta content="${decoded.image}" property="og:image"/>
        <meta content="${decoded.color}" name="theme-color"/>
        <meta name="twitter:card" content="summary_large_image">
        </head>
        <body>
        ${JSON.stringify(decoded)}
        </body>
        </html>`)
})

app.use(express.static('public'))

app.listen(8080, () => console.log('App listening at http://localhost:8080'))
