const express = require("express")
const app = express()
const Joi = require("joi")

app.use(express.json())

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Sci-Fi" },
  { id: 3, name: "Comedy" },
  { id: 4, name: "Romance" },
  { id: 5, name: "Horror" },
]

app.get("/", (req, res) => {
  res.send("Welcome to Videx, the best video rental service")
})

app.get("/api/genres", (req, res) => {
  res.send(genres)
})

app.get("/api/genres/:id", (req, res) => {
  res.send(genres[req.params.id - 1])
})

app.post("/api/genres", (req, res) => {
  const newGenres = {
    id: genres.length + 1,
    name: req.body.name,
  }

  genres.push(newGenres)
  res.send(genres)
})

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id))
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.")

  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  genre.name = req.body.name
  res.send(genre)
})

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id))
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.")

  const index = genres.indexOf(genre)
  genres.splice(index, 1)

  res.send(genres)
})

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  }

  return Joi.validate(genre, schema)
}

const port = 3000 || process.env.PORT
app.listen(port, () => console.log(`listening on port ${port}`))
