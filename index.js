const express = require('express')
const app = express()
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'CVTeque',
  password: 'admin',
  port: 5432,
})


app.get('/offres', (request, response) => {
    pool.query('SELECT * FROM etudiant ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
})

app.listen(3000, () => {
    console.log("j'ecoute au port 3000 frr");
})