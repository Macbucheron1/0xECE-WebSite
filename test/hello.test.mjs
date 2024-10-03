// test/hello.test.js
import * as chai from 'chai';
import supertest from 'supertest';
import express from 'express';
import helloRouter from '../hello.js'; // Modifie le chemin vers ton fichier de route

const { expect } = chai;

// Créer une application Express pour les tests
const app = express();
app.use('/', helloRouter); // Utiliser le routeur

describe('Hello Route', () => {
  it('should respond with a message for Nathan', (done) => {
    supertest(app)
      .get('/?name=Nathan') // Faire une requête GET avec le paramètre name
      .expect(200) // S'attendre à un code de statut 200
      .end((err, res) => {
        if (err) return done(err); // Gérer les erreurs
        expect(res.text).to.equal('Hello, I am Nathan, an engineering student interested in cybersecurity.'); // Vérifier le contenu de la réponse
        done(); // Terminer le test
      });
  });

  it('should respond with a message for Ibrahim', (done) => {
    supertest(app)
      .get('/?name=Ibrahim') // Faire une requête GET avec le paramètre name
      .expect(200) // S'attendre à un code de statut 200
      .end((err, res) => {
        if (err) return done(err); // Gérer les erreurs
        expect(res.text).to.equal('Hello, I am Ibrahim, an engineering student interested in cybersecurity'); // Vérifier le contenu de la réponse
        done(); // Terminer le test
      });
  });

  it('should respond with a generic message for other names', (done) => {
    supertest(app)
      .get('/?name=John') // Faire une requête GET avec un nom différent
      .expect(200) // S'attendre à un code de statut 200
      .end((err, res) => {
        if (err) return done(err); // Gérer les erreurs
        expect(res.text).to.equal('Hello, John!'); // Vérifier le contenu de la réponse
        done(); // Terminer le test
      });
  });

  it('should respond with a message when no name is provided', (done) => {
    supertest(app)
      .get('/') // Faire une requête GET sans paramètre name
      .expect(200) // S'attendre à un code de statut 200
      .end((err, res) => {
        if (err) return done(err); // Gérer les erreurs
        expect(res.text).to.equal('Please provide a name as a query parameter.'); // Vérifier le contenu de la réponse
        done(); // Terminer le test
      });
  });
});
