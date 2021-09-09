module.exports = {
    getEntrepriseById: "SELECT nom, ville, adresse, code_postal from entreprise where id=$1",
    connexionEntreprise: "select id, nom, ville, adresse, code_postal from entreprise where pseudo=$1 and password=$2",
    insertEntreprise: "insert into entreprise (nom, ville, adresse, code_postal, pseudo, password) VALUES ($1, $2, $3, $4, $5, $6)"
}