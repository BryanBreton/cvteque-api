require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const offreLBS = require('./LBS/offreLBS')
const etudiantLBS = require('./LBS/etudiantLBS')
const ecoleLBS = require('./LBS/ecoleLBS')
const { request, response } = require('express')
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
  await offreLBS.like(request.body.idOffre, request.body.idEtudiant)
  response.status(201).json("Created")
})

app.get('/etudiants', async(request, response) => {
  const etudiants = await etudiantLBS.getEtudiants()
  response.status(200).json(etudiants)
})

app.get('/etudiants/:id', async(request, response) => {
  const etudiant = await etudiantLBS.getEtudiantById(request.params.id)
  response.status(200).json(etudiant)
})

app.post('/etudiant', jsonParser, async (request, response) => {
  await etudiantLBS.insertEtudiant(request.body)
  response.status(201).json("Created")
})

app.post('/connexionEtudiant', async (request, response) => {
  const params = request.headers.authorization.split(":")
  const user = await etudiantLBS.connexionEtudiant(params[0], params[1])
  response.status(200).json(user)
})

app.post('/ecole', jsonParser, async (request, response) => {
  await ecoleLBS.insertEcole(request.body)
  response.status(201).json("Created")
})

app.get('/ecole/filtre', async(request, response) => {
  const ecoles = await ecoleLBS.getEcoleFiltered(request.query)
  response.status(200).json(ecoles)
})

app.listen(3000, () => {
    console.log("j'ecoute au port 3000 frr");
})