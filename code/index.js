const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const Database = require('@replit/database');
const db = new Database()

app.get('/', (request, response) => {
  console.log('Site opened D:')
  response.sendFile('index.html', { root: '.' })
  
})


app.get(/embeds/, (request, response) => {
  const id = request.url.slice(8);
   db.get(id).then(embed => {
    response.send(`<html>
        <head>
        <meta content="${embed.title}" property="og:title"/>
        <meta content="${embed.description}" property="og:description"/>
        <meta content="${embed.image}" property="og:image"/>
        <meta content="${embed.color}" name="theme-color"/>
        <meta name="twitter:card" content="summary_large_image">
        </head>
        <body>
        ${JSON.stringify(embed)}
        </body>
        </html>`
  )  
  })
  
})

app.use(express.static('public'));

app.get('/database/get', async (req, res) => {
  res.send(database)
})

app.post('/database/post', jsonParser, async (req, res) => {
  res.send(req.body)
  db.set(req.body.id, req.body).then(() => {})
})

app.listen(8080, () => console.log('App listening at http://localhost:8080'))
