const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const offreLBS = require('./LBS/offreLBS')
// create application/json parser
var jsonParser = bodyParser.json()

app.get('/offres', async (request, response) => {
  const offres = await offreLBS.getOffre()
  response.status(200).json(offres)
})
app.get('/offres/ecole/:id', async (request, response) => {
  const offres = await offreLBS.getOffreByEcole(request.params.id)
  response.status(200).json(offres)
})

app.get('/offre/like/:id', async (request, response) => {
  const offres = await offreLBS.getOffreLiked(request.params.id)
  response.status(200).json(offres)
})

app.post('/like', jsonParser, async (request, response) => {
  const offres = await offreLBS.like(request.body.idOffre, request.body.idEtudiant)
  response.status(201).json("Created")
})

app.listen(3000, () => {
    console.log("j'ecoute au port 3000 frr");
})