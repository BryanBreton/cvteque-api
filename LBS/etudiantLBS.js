const db = require('../database')
const requests = require('../Requests/etudiantRequests')
const etudiantProcess = require('../Process/etudiantProcess')

module.exports = {
    getEtudiants: async () => {
        const res = await db.pool.query(requests.getEtudiants)
        return res.rows
    },
    getEtudiantById: async (id) => { //ici on va ajouter ses exp et formations
        const res = await db.pool.query(requests.getEtudiantById, [id])
        let etudiant = await etudiantProcess.getFirstEtudiant(res.rows)
        etudiant = await etudiantProcess.completeEtudiants(etudiant)
        return etudiant
    },
    insertEtudiant: async (etudiant) => {
        await db.pool.query(requests.insertEtudiant, [etudiant.nom, etudiant.prenom, etudiant.email, etudiant.password, etudiant.dateNaissance, etudiant.idEcole])
    },
    connexionEtudiant: async (email, pwd) => {
        const res = await db.pool.query(requests.connexionEtudiant, [email, pwd])
        const user = await etudiantProcess.getFirstEtudiant(res.rows)
        return user
    },
    updateEtudiant: async (id, etudiant) => {
        db.pool.query(requests.updateEtudiant, [etudiant.password, id])
    }

}
