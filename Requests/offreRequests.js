module.exports = {
    getOffres: "SELECT * FROM offre ORDER BY id ASC",
    getOffresByEcole: "select o.id, o.titre, o.description, o.date_offre, o.type_offre, o.id_entreprise, e.nom, e.nom from offre_ecole oe join offre o on oe.id_offre=o.id join entreprise e on o.id_entreprise = e.id where oe.id_ecole=$1 and o.id NOT IN (select o.id from offre o left outer join liked l on l.id_offre = o.id where id_etudiant = $2)",
    getOffresByEntreprise: "select o.id, o.titre, o.description, o.date_offre, o.type_offre, o.id_entreprise from offre o where o.id_entreprise =$1",
    like: "INSERT INTO liked (id_offre, id_etudiant) VALUES ($1, $2)",
    offresLiked: "select o.id, o.titre, o.description, o.date_offre, o.type_offre, e.id, e.nom from liked join offre o on liked.id_offre=o.id join entreprise e on o.id_entreprise=e.id where liked.id_etudiant=$1"
}