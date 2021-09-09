module.exports = {
    getFormationsByEtudiantId: "select id, diplome, ecole, ville, date_debut, date_fin from formation where id_etudiant=$1",
    insertFormation: "insert into formation VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)"
}