const express = require('express');
const app = express();
const port = 8080;

// Import des routes
const homeRoutes = require('./home');
const helloRoutes = require('./hello');

// Middleware pour les routes
app.use('/', homeRoutes);
app.use('/hello', helloRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
