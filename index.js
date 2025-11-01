const express = require('express')
const morgan = require('morgan')
const Person = require('./models/persons')

const app = express()

app.use(express.static('dist'))

app.use(express.json())

morgan.token('data',(req)=>{
    return JSON.stringify(req.body)
})

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.get('/api/persons',(req,res, next)=>{
  Person.find({}).then(persons => {
    res.json(persons)
  })
  .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  const now = new Date();

  Person.find({})
    .then(persons => {
      const pCount = persons.length;
      res.send(`
        <div>
          <p>Phonebook has info for ${pCount} people</p>
          <p>${now.toString()}</p>
        </div>
      `);
    })
    .catch(error => next(error))

})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;

  Person.findById(id)
    .then(person => {
      if (person) {
        res.json(person);        
      } else {
        res.status(404).end();   
      }
    })
    .catch(error => {
      next(error)
      res.status(400).end();
    })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name or number missing" });
  }

  Person.findOne({ name: body.name })
    .then(existingPerson => {
      if (existingPerson) {
        
        
      }

      const person = new Person({
        name: body.name,
        number: body.number
      })

      person.save()
        .then(savedPerson => {
          res.json(savedPerson);
        })
        .catch(error => {
          next(error)
          res.status(400).end()
        })
    })
    .catch(error => {
      next(error)
      res.status(400).end()
    })
})

app.delete('/api/persons/:id',(req,res)=>{
  Person.findByIdAndDelete(req.params.id)
  .then(result => {
    res.status(204).end()
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id',(req, res, next)=>{
  const {name, number} = req.body

  const newPerson = {name,number}

  Person.findByIdAndUpdate(req.params.id, newPerson,{new: true, runValidators:true, context:'query'})
  .then(updated => {
    if(updated){
      res.json(updated)
    }
    else{
      res.status(404).end()
    }
  })
  .catch(error => next(error))

})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message }) 
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})