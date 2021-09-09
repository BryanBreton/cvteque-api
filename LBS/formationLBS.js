const { request } = require('express')
const db = require('../database')
const requests = require('../Requests/formationRequests')

module.exports = {
    getFormationsByEtudiantId: async (idEtudiant) => {
        const formations = await db.pool.query(requests.getFormationsByEtudiantId, [idEtudiant]) // liste d'experiences d'un etudiant
        return formations.rows
    },
    insertFormation: async (formation) => {
        db.pool.query(requests.insertFormation, [formation.diplome, formation.ecole, formation.ville, formation.dateDebut, formation.dateFin, formation.idEtudiant])
    }
}