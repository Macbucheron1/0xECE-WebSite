const db = {
    articles: [
      {
        id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        title: 'My article',
        content: 'Content of the article.',
        date: '04/10/2022',
        author: 'Liz Gringer'
      },
    ],
    comments: [
      {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        timestamp: 1664835049,
        content: 'Content of the comment.',
        articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        author: 'Bob McLaren'
      },
    ]
  }


import express from 'express';
const router = express.Router();

// Route /articles

//List all of the article in the database in a nice html format
router.get('/', (req, res) => {
    const articles = db.articles;
    let html = '<h1>Articles</h1>';
    html += '<ul>';
    articles.forEach(article => {
        html += `<li><a href="/articles/${article.id}">${article.title}</a></li>`;
    });
    html += '</ul>';
    return res.send(html);
});

// Create a new article
router.post('/', (req, res) => {

    // Get the parameters from the request body
    const id = req.body.id;
    const title = req.body.title;
    const content = req.body.content;
    const date = new Date().toLocaleDateString();
    const author = req.body.author;
    const newArticle = { id, title, content, date, author };

    // Check if all parameters are provided
    if (!id || !title || !content || !author) {
        return res.status(400).send('Missing parameters');
    }

    // Check if the article already exists
    const existingArticle = db.articles.find(a => a.id === newArticle.id);
    if (existingArticle) {
        return res.status(400).send('Article already exists');
    }else{
        db.articles.push(newArticle);
        return res.send("Article added successfully");
    }
    
    
});

// Route /articles/:articleId with the parameter "articleId" in the request
// Display the article with the id "articleId"
router.get('/:articleId', (req, res) => {
    const articleId = req.params.articleId;
    const article = db.articles.find(a => a.id === articleId);
    if (!article) {
        return res.status(404).send('Article not found');
    }
    let html = `<h1>${article.title}</h1>`;
    html += `<p>${article.content}</p>`;
    html += `<p>Author: ${article.author}</p>`;
    html += `<p>Date: ${article.date}</p>`;

    // Add a link to the comments of the article
    html += `<a href="/articles/${article.id}/comments">Comments</a>`;
    return res.send(html);
});

// Route /articles/:articleId/comments with the parameter "articleId" in the request
// Display a list of all the comments using the author and the timestamp for the article with the id "articleId" with a link to the comments wich will display the content of the comment
router.get('/:articleId/comments', (req, res) => {
    const articleId = req.params.articleId;
    const article = db.articles.find(a => a.id === articleId);
    if (!article) {
        return res.status(404).send('Article not found');
    }
    const comments = db.comments.filter(c => c.articleId === articleId);
    let html = '<h1>Comments</h1>';
    html += '<ul>';
    comments.forEach(comment => {
        html += `<li><a href="/articles/${article.id}/comments/${comment.id}">${comment.author} - ${new Date(comment.timestamp).toLocaleString()}</a></li>`;
    });
    html += '</ul>';
    return res.send(html);
});

// Route /articles/:articleId/comments/:commentId with the parameters "articleId" and "commentId" in the request
// Display the content of the comment with the id "commentId" for the article with the id "articleId"
router.get('/:articleId/comments/:commentId', (req, res) => {
    const articleId = req.params.articleId;
    const commentId = req.params.commentId;
    const article = db.articles.find(a => a.id === articleId);
    if (!article) {
        return res.status(404).send('Article not found');
    }
    const comment = db.comments.find(c => c.id === commentId);
    if (!comment) {
        return res.status(404).send('Comment not found');
    }
    let html = `<h1>${comment.author} - ${new Date(comment.timestamp).toLocaleString()}</h1>`;
    html += `<p>${comment.content}</p>`;
    return res.send(html);
});

// Route /articles/:articleId/comments with the parameter "articleId" in the request
// Add a new comment to the article with the id "articleId"
router.post('/:articleId/comments', (req, res) => {
    const articleId = req.params.articleId;
    const article = db.articles.find(a => a.id === articleId);
    if (!article) {
        return res.status(404).send('Article not found');
    }

    // Get the parameters from the request body
    const id = req.body.id;
    const timestamp =  new Date().toDateString();
    const content = req.body.content;
    const author = req.body.author;
    const newComment = { id, timestamp, content, articleId, author };

    // Check if all parameters are provided
    if (!id || !content || !author) {
        return res.status(400).send('Missing parameters');
    }

    // Check if the comment already exists
    const existingComment = db.comments.find(c => c.id === newComment.id);
    if (existingComment) {
        return res.status(400).send('Comment already exists');
    }else{
        db.comments.push(newComment);
        return res.send("Comment added successfully");
    }
});



export default router;
