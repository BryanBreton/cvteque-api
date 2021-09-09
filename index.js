require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { request, response } = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const {verify} = require('./middleware')
const offreLBS = require('./LBS/offreLBS')
const etudiantLBS = require('./LBS/etudiantLBS')
const ecoleLBS = require('./LBS/ecoleLBS')
const entrepriseLBS = require('./LBS/entrepriseLBS')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
const jwt = require('jsonwebtoken')
const experienceLBS = require('./LBS/experienceLBS')
const formationLBS = require('./LBS/formationLBS')
app.use(cors())
// create application/json parser
var jsonParser = bodyParser.json()


/*
app.get('/comments', verify, async (req, res) => {
  res.sendStatus(200)
})*/
 // app.post('/login', loginjwt)



app.get('/offres', async (request, response) => {
  const offres = await offreLBS.getOffre()
  response.status(200).json(offres)
})

app.get('/offres/entreprises/:id', async (request, response) => {
  const offres = await offreLBS.getOffreByEntreprise(request.params.id)
  response.status(200).json(offres)
})

app.get('/offres/ecole/:idEcole/etudiant/:idEtudiant', async (request, response) => {
  const offres = await offreLBS.getOffreByEcole(request.params.idEcole, request.params.idEtudiant)
  response.status(200).json(offres)
})

app.get('/offres/like/:id', async (request, response) => {
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

app.get('/etudiants/:id',verify, async(request, response) => {
  const etudiant = await etudiantLBS.getEtudiantById(request.params.id)
  response.status(200).json(etudiant)
})

app.post('/etudiant', jsonParser, async (request, response) => {
  await etudiantLBS.insertEtudiant(request.body)
  response.status(201).json("Created")
})

app.get('/connexionEtudiant', async (request, res) => {
  console.log(request.headers);
  console.log("oui");
  try{
    const params = request.headers.authorization.split(":")
    console.log('params');
    console.log(params);
    // on va chercher les users 
    const user = await etudiantLBS.connexionEtudiant(params[0], params[1])
    console.log(user);
    if(!user || user === undefined){ // si il est vide 
      console.log("iciiiiii");
      res.status(401).json("Email ou mot de passe incorrect").send()
    }else { // si il y a un user 
      console.log("la");
      //create the access token with the shorter lifespan
      let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: process.env.ACCESS_TOKEN_LIFE
      })
      console.log("ici")
      user.token = accessToken
      //send the access token to the client inside a cookie
      res.json(user)
      res.send()
    } 
    
  }catch (e) {
    console.log(e)
  }
  
  
})

app.post('/ecole', jsonParser, async (request, response) => {
  await ecoleLBS.insertEcole(request.body)
  response.status(201).json("Created")
})

app.get('/ecole/filtre', async(request, response) => {
  const ecoles = await ecoleLBS.getEcoleFiltered(request.query)
  response.status(200).json(ecoles)
})

app.get('/entreprises/:id', async(request, response) => {
  const entreprise = await entrepriseLBS.getEntrepriseById(request.params.id)
  response.status(200).json(entreprise)
})

app.get('/connexionEntreprise', async (request, response) => {
  const params = request.headers.authorization.split(":")
  const entreprise = await entrepriseLBS.connexionEntreprise(params)
  response.status(200).json(entreprise)
})

app.post('/entreprises', jsonParser, async(request, response) => {
  entrepriseLBS.insertEntreprise(request.body)
  response.status(201).json("Created")
})

app.post('/experiences', jsonParser, async (request, response) => {
  await experienceLBS.insertExperience(request.body)
  response.status(201).json("Created")
})

app.post('/formations', jsonParser, async (request, response) => {
  await formationLBS.insertFormation(request.body)
  response.status(201).json("Created")
})

app.put('/etudiants/:id', jsonParser, async (request, response) => {
  await etudiantLBS.updateEtudiant(request.params.id, request.body)
  response.status(200).json('Updated')
})

app.listen(3000, () => {
    console.log("j'ecoute au port 3000 frr");
})