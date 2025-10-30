const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.static('dist'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json());

morgan.token('data',(req)=>{
    return JSON.stringify(req.body)
})

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);
``

app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.get('/info',(req,res)=>{
    const pCount = persons.length
    const now = new Date()
    res.send(
    `<div>
       <p>Phonebook has info for ${pCount} people</p>
       <p>${now.toString()}</p>
    </div>` 
    )
})

app.get('/api/persons/:id',(req,res)=>{
    const id = req.params.id
    const person = persons.find((p)=> p.id === id)
    if (person){
        return res.json(person)
    }
    else{
       res.status(404).end()
    }
})

app.post('/api/persons',(req,res)=>{
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ error: "Name or number missing" })
    }
    
    const dupli = persons.find(
        (p) => p.name.toLowerCase() === body.name.toLowerCase()
    )
    if(dupli){
        return res.status(400).json({ error: "Name must be unique" });
    }

    const person = {
        id: Math.floor(Math.random() * 100000),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})