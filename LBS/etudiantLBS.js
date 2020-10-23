const db = require('../database')
const requests = require('../Requests/etudiantRequests')
const etudiantProcess = require('../Process/etudiantProcess')

module.exports = {
    getEtudiants: async () => {
        const res = await db.pool.query(requests.getEtudiants)
        return res.rows
    },
    getEtudiantById: async (id) => {
        const res = await db.pool.query(requests.getEtudiantById, [id])
        return etudiantProcess.getFirstEtudiant(res.rows)
    },
    insertEtudiant: async (etudiant) => {
        await db.pool.query(requests.insertEtudiant, [etudiant.nom, etudiant.prenom, etudiant.email, etudiant.password, etudiant.dateNaissance, etudiant.idEcole])
    },
    connexionEtudiant: async (params) => {
        const res = await db.pool.query(requests.connexionEtudiant, [params[0], params[1]])
        const user = await etudiantProcess.getFirstEtudiant(res.rows)
        return user
    }

}
