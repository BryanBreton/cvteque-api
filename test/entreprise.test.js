var assert = require('assert');
const entrepriseProcess = require('../Process/entrepriseProcess');
const entreprisesRequests = require('../Requests/entreprisesRequests');
const entrepriseLBS = require('../LBS/entrepriseLBS');
const database = require('../database');

describe('Tests Entreprises', function() {
  describe('test du process', function() {
    it('should return 1 if it is equal', async function() {
      const list = [{nom: "U IRIS"}, {nom: "U LOG"}]
      assert.equal(await entrepriseProcess.getFirstEntreprises(list), list[0]);
    });
  });
  describe('Verification des variables de requests', function(){
    it('should return true if it is correct', async function(){
      assert.equal(entreprisesRequests.getEntrepriseById, "SELECT nom, ville, adresse, code_postal from entreprise where id=$1")
      assert.equal(entreprisesRequests.connexionEntreprise, "select nom, ville, adresse, code_postal from entreprise where pseudo=$1 and password=$2")
      assert.equal(entreprisesRequests.insertEntreprise, "insert into entreprise (nom, ville, adresse, code_postal, pseudo, password) VALUES ($1, $2, $3, $4, $5, $6)")
    });
  });
  describe('test du LBS', function(){
    it('should return 1 if true', async function() {
      assert.deepEqual(await entrepriseLBS.getEntrepriseById(1), 
      {
        adresse: 'Place des pléïades',
        code_postal: 44470,
        nom: 'U GIE IRIS',
        ville: 'Carquefou'
      });
    });
    it('should return 1 if there is a user with this params', async function(){
      assert.deepEqual(await entrepriseLBS.connexionEntreprise(["ugieiris", "ouistiti"]), 
        {
          nom: 'U GIE IRIS',
          ville: 'Carquefou',
          adresse: 'Place des pléïades',
          code_postal: 44470
        }
      );
    });
    it('should insert a company', async function() {
      const testUser = {
        "nom": "test",
        "ville": "test",
        "adresse": "La",
        "codePostal": "45922",
        "pseudo": "fcn",
        "password": "ouistitoche"
      }
      await entrepriseLBS.insertEntreprise(testUser)
      database.pool.query("DELETE from entreprise where nom='test' and ville='test'")
    })
  });
});