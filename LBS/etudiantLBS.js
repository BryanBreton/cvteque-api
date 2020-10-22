const db = require('../database')
const requests = require('../Requests/etudiantRequests')
module.exports = {
    getEtudiants: async () => {
        const res = await db.pool.query(requests.getEtudiants)
        return res.rows
    },
    getEtudiantById: async (id) => {
        const res = await db.pool.query(requests.getEtudiantById, [id])
        return res.rows
    },
    insertEtudiant: async (etudiant) => {
        console.log(etudiant);
        await db.pool.query(requests.insertEtudiant, [etudiant.nom, etudiant.prenom, etudiant.email, etudiant.password, etudiant.dateNaissance, etudiant.idEcole])
    }
}
