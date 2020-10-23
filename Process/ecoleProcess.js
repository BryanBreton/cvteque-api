const ecoleRequests = require("../Requests/ecoleRequests")
const db = require('../database')

module.exports = {
    getRequestFiltered: async (filtres) => {
        return !filtres.ville 
        ? !filtres.domaine // pas de ville
            ? await db.pool.query(ecoleRequests.getEcoles) // pas de filtre tout court : cas 00
            : await db.pool.query(ecoleRequests.getEcolesFromFiltre, [filtres.domaine]) // on a juste un domaine : cas 01
        : !filtres.domaine  // on a une ville
            ? await db.pool.query(ecoleRequests.getEcolesFromVille, [filtres.ville]) // on a juste une ville : cas 10
            : await db.pool.query(ecoleRequests.getEcolesFromVilleAndFiltre, [filtres.domaine, filtres.ville]) // on a les deux : cas 11
    }
}