module.exports = {
    getEtudiants: "SELECT id, nom, prenom, email, date_naissance, id_ecole from etudiant",
    getEtudiantById: "SELECT id, nom, prenom, email, date_naissance, id_ecole from etudiant where id=$1",
    connexionEtudiant: "SELECT id, nom, prenom, email, date_naissance, id_ecole from etudiant where email=$1 and password=$2",
    insertEtudiant: "INSERT INTO etudiant (nom, prenom, email, password, date_naissance, id_ecole) VALUES ($1, $2, $3, $4, $5, $6)",
    updateEtudiant: "UPDATE etudiant set password=$1 where id=$2"
}