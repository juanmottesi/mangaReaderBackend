const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mangaReader = require('./data/builder');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/auth', (req, res) => {
  res.send(mangaReader.loginUser(req.body.username, req.body.password));
});

app.get('/search', (req, res) => {
  res.send(mangaReader.searchManga(req.query.text));
});

app.get('/:getChapter', (req, res) => {
  res.send(mangaReader.getChapter(req.query.mangaId, req.query.chapterId));
});

app.listen(3004, () => {
  console.log('Example app listening on port 3004!');
});