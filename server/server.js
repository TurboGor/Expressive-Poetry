const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors')

app.use(cors())

app.use(function(req, res, next) {
    if (req.headers.bob != 'Bobalooba') {
      return res.status(403).json({ error: 'No credentials sent!' });
    }
    next();
  });

let poems = [
    {
        "id": 0,
        "title": "Campervan",
        "author": "Bob Bobalooba",
        "authorid": 0,
        "text": `__Lorem__ ipsum dolor sit amet,  
        consectetur adipiscing elit,  
        sed do eiusmod tempor incididunt ut 
        labore et dolore magna aliqua.  `,
        "votes": 16
    },
    {
        "id": 1,
        "title": "Test poem",
        "author": "Hayden Chan",
        "authorid": 2,
        "text": `### Lorem!  
        __Lorem__ ipsum dolor sit amet,  
        new line`,
        "votes": 5
    },
    {
        "id": 2,
        "title": "Cara Aceitunada",
        "author": "Nathalie Handal",
        "authorid": 1,
        "text": `
        In Granada  
        a man asked  
        for the birds inside of me  
          
        I told him I’ve never  
        belonged to anyone  
          
        He asked  
        where I was from  
        I gave him a list of cities  
          
        He said  
        the mirrors of history  
        confuse history  
          
        but in your olive-colored face  
        no one can disturb your heart  `,
        "votes": 40
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Expressive Poetry!</h1>')
})

app.get('/api/poems', (request, response) => {
    response.json(poems)
})

app.get('/api/poems/:id', (request, response) => {
    const id = Number(request.params.id)
    const poem = poems.find(poem => poem.id === id)
    if (poem) {
        response.json(poem)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/poems/:id', (request, response) => {
    const id = Number(request.params.id)
    poems = poems.filter(poem => poem.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = poems.length > 0
        ? Math.max(...poems.map(n => n.id))
        : 0
    return maxId + 1
}

const generateAuthID = () => {
    const maxId = poems.length > 0
        ? Math.max(...poems.map(n => n.authorid))
        : 0
    return maxId + 1
}

app.post('/api/poems', (request, response) => {
    const body = request.body

    if (!body.title) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const existAuth = poems.find(poem => poem.author.toLowerCase() === body.author.toLowerCase())
    let authID = 0
    let authName = ""
    if (typeof existAuth !== "undefined") {
        authID = existAuth.authorid
        authName = existAuth.author
    } else {
        authID = generateAuthID()
        authName = body.author
    }

    const poem = {
        id: generateId(),
        title: body.title,
        author: authName,
        authorid: authID,
        text: body.text,
        votes: 0
    }

    poems = poems.concat(poem)

    response.json(poem)
})

app.post('/api/poems/:id', (request, response) => {
    const id = Number(request.params.id)
    let poem = poems.find(poem => {
        console.log(poem.id, typeof poem.id, id, typeof id, poem.id === id)
        return poem.id === id
    })
    if (typeof poem === "undefined") {
        return response.status(400).json({
            error: 'cannot find poem'
        })
    }

    const body = request.body
    if (!body.votes) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    updatedPoem = {
        id: id,
        title: poem.title,
        author: poem.author,
        authorid: poem.authorid,
        text: poem.text,
        votes: body.votes
    }

    let repPoem = poems.findIndex(item => item.id === id)
    poems.splice(repPoem, 1, updatedPoem)

    response.json(poems)
})

const HOST = require("os").hostname;
const PORT = process.env.PORT || 3001;
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log(`IP: ${add}:${PORT}`);
  })

app.listen(PORT, () => {
    console.log(`Hostname: ${HOST}:${PORT}`)
})