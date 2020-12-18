let myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.info = function () {
  return `${this.title}, by ${this.author}, ${this.pages} pages, ${this.read}`;
};

function addBookToLibrary(title, author, pages, read) {
  // do stuff here
  let newBook = new Book(title, author, pages, read);
  newBook.prototype = Object.create(Book.prototype);
  myLibrary.push(newBook);
}

addBookToLibrary('Anything', 'Me', 'unlimited', 'read');

console.log(myLibrary);
console.log(myLibrary[0].info());
