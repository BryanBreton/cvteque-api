module.exports = {
    getExperiencesByEtdudiantId: "select id, poste, entreprise, date_debut, date_fin from experience where id_etudiant = $1",
    insertExperience: "insert into experience VALUES (DEFAULT, $1, $2, $3, $4, $5)"
}