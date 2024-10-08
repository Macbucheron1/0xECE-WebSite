import express from 'express';
const app = express();
const port = 8080;

// Import des routes
import homeRoutes from './home.js';
import helloRoutes from './hello.js';
import articlesRoutes from './articles.js';

// Middleware to parse request body
app.use(express.json());

// Middleware for the routes
app.use('/', homeRoutes);
app.use('/hello', helloRoutes);
app.use('/articles', articlesRoutes);

// 404 error handling
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
