const experienceLBS = require('../LBS/experienceLBS')
const formationLBS = require('../LBS/formationLBS')

module.exports = {
    getFirstEtudiant: async (etudiants) => {
        const etudiant = etudiants[0]
        return etudiant
    },
    completeEtudiants: async(etudiant) => {
        etudiant.experiences = await experienceLBS.getExperiencesByEtudiantId(etudiant.id)
        etudiant.formations = await formationLBS.getFormationsByEtudiantId(etudiant.id)

        return etudiant
    }
}