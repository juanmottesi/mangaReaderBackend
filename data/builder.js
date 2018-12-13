const MangaReader = require('../src/MangaReader');
const md5 = require('md5');
const mangas = require('./data.json');
const users = [
  {
    id: '1',
    username: 'pepe',
    password: md5('pepe'),
    readMangas: [
      {
        id: '74d824c1-85ba-4544-8fb2-aa4ccecd9eea',
        currentChapter: 130,
      },
      {
        id: '92ef1c08-d79b-4485-ba5c-2588a7fd25b4',
        currentChapter: 55,
      }
    ]
  },
  {
    id: '2',
    username: 'asd',
    password: md5('asd'),
    readMangas: [
      {
        id: 'd39c9e78-2d59-422a-b888-cdf6e7d72cbc',
        currentChapter: 460,
      }
    ]
  }
];

module.exports = new MangaReader(users, mangas);
