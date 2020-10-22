const db = require('../database')
const requests = require('../Requests/requests')
module.exports = {
    getOffre: async () => {
        const res = await db.pool.query(requests.getOffres)
        return res.rows
    },
    getOffreByEcole: async (id) => {
        const res = await db.pool.query(requests.getOffresByEcole, [id])
        return res.rows
    },
    like: async (idOffre, idEtudiant) => {
        await db.pool.query(requests.like, [idOffre, idEtudiant])
    },
    getOffreLiked: async (idEtudiant) => {
        const res = await db.pool.query(requests.offresLiked, [idEtudiant])
        return res.rows
    }

}
