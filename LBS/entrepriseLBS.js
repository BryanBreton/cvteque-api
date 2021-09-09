const db = require('../database')
const entreprisesRequests = require('../Requests/entreprisesRequests')
const entrepriseProcess = require('../Process/entrepriseProcess')
module.exports = {
    getEntrepriseById: async (id) => {
        const entrepriseList = await db.pool.query(entreprisesRequests.getEntrepriseById, [id])
        const entreprise = await entrepriseProcess.getFirstEntreprises(entrepriseList.rows)
        return entreprise
    },
    connexionEntreprise: async (params) => {
        const entrepriseList = await db.pool.query(entreprisesRequests.connexionEntreprise, [params[0], params[1]])
        const entreprise = await entrepriseProcess.getFirstEntreprises(entrepriseList.rows)
        return entreprise
    },
    insertEntreprise: async (entreprise) => {
        await db.pool.query(entreprisesRequests.insertEntreprise, [entreprise.nom, entreprise.ville, entreprise.adresse, entreprise.codePostal, entreprise.pseudo, entreprise.password])
    },
}