module.exports = {
    insertEcole: "insert into ecole (nom, ville, adresse, code_postal, nom_domaine) VALUES ($1, $2, $3, $4, $5)",
    getEcoles: "select distinct ecole.nom, ecole.ville, ecole.adresse, ecole.code_postal, ecole.nom_domaine from filtre_ecole fe join ecole on fe.id_ecole = ecole.id join filtre on fe.id_filtre = filtre.id",
    getEcolesFromVille: "select distinct ecole.nom, ecole.ville, ecole.adresse, ecole.code_postal, ecole.nom_domaine from filtre_ecole fe join ecole on fe.id_ecole = ecole.id join filtre on fe.id_filtre = filtre.id where ecole.ville=$1",
    getEcolesFromFiltre: "select distinct ecole.nom, ecole.ville, ecole.adresse, ecole.code_postal, ecole.nom_domaine from filtre_ecole fe join ecole on fe.id_ecole = ecole.id join filtre on fe.id_filtre = filtre.id where filtre.nom = $1",
    getEcolesFromVilleAndFiltre: "select distinct ecole.nom, ecole.ville, ecole.adresse, ecole.code_postal, ecole.nom_domaine from filtre_ecole fe join ecole on fe.id_ecole = ecole.id join filtre on fe.id_filtre = filtre.id where filtre.nom = $1 and ecole.ville = $2"
}