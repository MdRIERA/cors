const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/characters', async (req, res) => {
  const page = req.query.page || 1
  const url = `https://rickandmortyapi.com/api/character?page=${page}`

  try {
    const response = await axios.get(url)
    res.json(response.data) // { info, results }
  } catch (error) {
    res.status(404).json({ error: 'Fallo al hacer la petición' })
  }
})


app.get('/character/:characterName', async (req, res) => {
  const characterName = req.params.characterName
  const url = `https://rickandmortyapi.com/api/character?name=${characterName}`
    console.log('Ruta /character llamada con:', req.params.characterName)
  try {
    const response = await axios.get(url)

    const character = response.data.results[0] 

    const { name, status, species, gender, origin, image } = character

    res.json({ name, status, species, gender, origin, image })
  } catch (error) {
    res.status(404).json({ error: 'Personaje no encontrado' })
  }
})


app.listen(3000, () => {
  console.log('Servidor arrancado en http://localhost:3000')
})
