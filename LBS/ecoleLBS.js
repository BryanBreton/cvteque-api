const db = require('../database')
const requests = require('../Requests/ecoleRequests')
const ecoleProcess = require('../Process/ecoleProcess')

module.exports = {
    insertEcole: async (ecole) => {
        await db.pool.query(requests.insertEcole, [ecole.nom, ecole.ville, ecole.adresse, ecole.codePostal, ecole.nomDomaine])
    },
    getEcoleFiltered: async (filtres) => {
        const ecoles = await ecoleProcess.getRequestFiltered(filtres)
        return ecoles.rows
    }
}