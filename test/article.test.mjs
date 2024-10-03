import * as chai from 'chai';
import supertest from 'supertest';
import express from 'express';
import router from '../articles.js'; // Assurez-vous que l'extension .js est incluse

const { expect } = chai;

const app = express();
app.use(express.json()); // Pour gérer les requêtes POST en JSON
app.use('/articles', router);

describe('API Articles', () => {
  // Test de la route GET /articles
  it('should list all articles', (done) => {
    supertest(app)
      .get('/articles')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('<h1>Articles</h1>');
        expect(res.text).to.include('My article');
        done();
      });
  });

  // Test de la route GET /articles/:articleId
  it('should return a specific article', (done) => {
    supertest(app)
      .get('/articles/6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('<h1>My article</h1>');
        expect(res.text).to.include('Content of the article.');
        done();
      });
  });

  // Test de la route POST /articles
  it('should create a new article', (done) => {
    const newArticle = {
      id: '12345',
      title: 'New Article',
      content: 'This is the content of the new article.',
      author: 'John Doe'
    };

    supertest(app)
      .post('/articles')
      .send(newArticle)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('Article added successfully');
        done();
      });
  });

  // Test de la route GET /articles/:articleId/comments
  it('should list comments for a specific article', (done) => {
    supertest(app)
      .get('/articles/6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b/comments')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('<h1>Comments</h1>');
        expect(res.text).to.include('Bob McLaren');
        done();
      });
  });

  // Test de la route POST /articles/:articleId/comments
  it('should add a new comment to an article', (done) => {
    const newComment = {
      id: '67890',
      content: 'This is a new comment.',
      author: 'Jane Doe'
    };

    supertest(app)
      .post('/articles/6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b/comments')
      .send(newComment)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('Comment added successfully');
        done();
      });
  });
});