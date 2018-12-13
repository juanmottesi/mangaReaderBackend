const md5 = require('md5');

const findById = (list, id) => {
  const found = list.find(element => element.id === id);
  if(!found) new Error('NotFound');
  return found;
}

class MangaReader {
  constructor(users, mangas) {
    this.users = users;
    this.mangas = mangas;
  }

  loginUser(username, password) {
    const user = this.users.find(user => user.username === username && user.password === md5(password));
    if(!user) return false;
    const userReturn = { ...user };
    delete userReturn.password;
    return { ...userReturn, readMangas: userReturn.readMangas.map(readManga => this.transformReadManga(userReturn, readManga)) };
  }

  transformReadManga(user, readManga) {
    const manga = findById(this.mangas, readManga.id);
    return this.mangaForUser(user, manga);
  }

  mangaForUser(user, manga) {
    const readManga = user.readMangas.find(readManga => readManga.id === manga.id);
    return {
      id: manga.id,
      name: manga.mangaName,
      displayName: manga.displayName,
      description: manga.description,
      image: manga.image,
      state: manga.state,
      amountOfChapters: manga.amountOfChapters,
      currentChapter: readManga.currentChapter,
      chapters: manga.chapters.map(chapter => Object.assign({}, chapter, {images: undefined})),
    }
  }

  getChapter(mangaId, chapterId) {
    const manga = findById(this.mangas, mangaId);
    return manga.chapters.find(chapter => chapter.id === chapterId);
  }

  searchManga(text) {
    return this.mangas.filter(manga => manga.displayName.toLowerCase().includes(text.toLowerCase()));
  }

}

module.exports = MangaReader;
