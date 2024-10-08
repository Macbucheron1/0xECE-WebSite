import express from 'express';
const router = express.Router();

// Main route wich is the home page
router.get('/', (req, res) => {
  res.status(200).send(`
    <h1>Welcome to the Home Page</h1>
    <p>Visit <a href="/hello?name=yourname">/hello</a> and add a name query parameter to get a response.</p>
    <p>Visit <a href="/articles">/articles</a> to get a list of articles.</p>
  `);
});

export default router;
