const express = require('express');
const router = express.Router();

// Route principale expliquant le fonctionnement de /hello
router.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Home Page</h1>
    <p>Visit <a href="/hello?name=yourname">/hello</a> and add a name query parameter to get a response.</p>
  `);
});

module.exports = router;