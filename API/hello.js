import express from 'express';
const router = express.Router();

// Route /hello with the parameter "name" in the request
router.get('/', (req, res) => {
  const name = req.query.name;

  // Verifiy if a name is provided
  if (!name) {
    return res.status(200).send('Please provide a name as a query parameter.');
  }

  // Verifiy if it is our names
  if (name === 'Nathan'){
    return res.send('Hello, I am Nathan, an engineering student interested in cybersecurity.');
  }
  else if (name === 'Ibrahim') {
    return res.send('Hello, I am Ibrahim, an engineering student interested in cybersecurity');
  }

  // If it is not our names
  else{
    return res.send(`Hello, ${name}!`);
  }
});

export default router;
