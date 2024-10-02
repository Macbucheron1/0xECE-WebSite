const express = require('express');
const router = express.Router();

// Route /hello avec un paramètre de requête "name"
router.get('/', (req, res) => {
  const name = req.query.name;

  // Vérifier si un nom est passé en paramètre
  if (!name) {
    return res.send('Please provide a name as a query parameter.');
  }

  // Si c'est ton propre nom (par exemple Nathan)
  if (name === 'Nathan'){
    return res.send('Hello, I am Nathan, an engineering student interested in cybersecurity.');
  }
  else if (name === 'Ibrahim') {
    return res.send('Hello, I am Ibrahim, an engineering student interested in cybersecurity');
  }
  else{
    return res.send(`Hello, ${name}!`);
  }
});

module.exports = router;
