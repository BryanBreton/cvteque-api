const { request } = require('express')
const db = require('../database')
const requests = require('../Requests/experienceRequests')

module.exports = {
    getExperiencesByEtudiantId: async (idEtudiant) => {
        const experiences = await db.pool.query(requests.getExperiencesByEtdudiantId, [idEtudiant]) // liste d'experiences d'un etudiant
        return experiences.rows
    },
    insertExperience: async (experience) => {
        db.pool.query(requests.insertExperience, [experience.poste, experience.entreprise, experience.dateDebut, experience.dateFin, experience.idEtudiant])
    }

}