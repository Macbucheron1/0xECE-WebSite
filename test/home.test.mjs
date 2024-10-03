// test/home.test.js
import * as chai from 'chai';
import supertest from 'supertest';
import express from 'express';
import homeRouter from '../home.js'; // Modifie le chemin vers ton fichier de route

const { expect } = chai;

// Créer une application Express pour les tests
const app = express();
app.use('/', homeRouter); // Utiliser le routeur

describe('Home Route', () => {
  it('should respond with welcome message', (done) => {
    supertest(app)
      .get('/') // Faire une requête GET sur la route principale
      .expect(200) // S'attendre à un code de statut 200
      .end((err, res) => {
        if (err) return done(err); // Gérer les erreurs
        // Vérifier le contenu de la réponse
        expect(res.text).to.include('Welcome to the Home Page');
        expect(res.text).to.include('Visit <a href="/hello?name=yourname">/hello</a>');
        done(); // Terminer le test
      });
  });
});

