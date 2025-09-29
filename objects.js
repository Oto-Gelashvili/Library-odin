const myLibrary = [];

function Book(title, author, pages, readState) {
  if (!new.target) {
    throw Error("you must use 'new' operator when calling object constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readState = readState;
}

function addBookToLibrary(title, author, pages, readState) {
  const newBook = new Book(title, author, pages, readState);
  myLibrary.push(newBook);
  return newBook;
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, false);

console.log(myLibrary);
