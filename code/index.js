//for the site
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const jsonParser = bodyParser.json();

//for the database
const Database = require('@replit/database');
const db = new Database()

app.get('/', (request, response) => {
  console.log('Site opened D:')
  response.sendFile('index.html', { root: '.' })
  
})

// to generate the embed in discord
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
//to load css and js in 'public' folder
app.use(express.static('public'));
//get info from the database
app.get('/database/get', async (req, res) => {
  res.send(database)
})
//send info to the database
app.post('/database/post', jsonParser, async (req, res) => {
  res.send(req.body)
  db.set(req.body.id, req.body).then(() => {})
})
//login into the host
app.listen(8080, () => console.log('App listening at http://localhost:8080'))
