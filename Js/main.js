/* eslint func-names: ["error", "never"] */
/* eslint-env jquery */

let myLibrary = [];
const addNewBookButton = document.querySelector('button.newBook');

function Book(title, author, pages, id) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
}
Book.prototype.info = function () {
  return `${this.title}, by ${this.author}, ${this.pages} pages`;
};

Book.prototype.read = 'Not Read';

function addBookToLibrary(title, author, pages, id) {
  const newBook = new Book(title, author, pages, id);
  myLibrary.push(newBook);
}

let content = '';

function bookCard(book, index) {
  return `
  <div id="book-${index}" class="col-md-4 mt-2">
      <div class="card" style="width: 18rem;">
          <div class="card-body">
              <h5 class="card-title" id="itemName">${book.title}</h5>
              <p class="card-text" id="itemDesc">${book.author}</p>
              <p class="card-text">${book.pages}</p>
              <button class="card-text status">${book.read}</button>
              <button class="delete" id=${index} data-id=${index}>Delete</button>
          </div>
      </div>
    </div>
`;
}

function displayAllBooks(books) {
  books.forEach((book, index) => {
    content += bookCard(book, index);
  });
}

$('form').on('submit', function (event) {
  event.preventDefault();
  content = '';
  const test = $(this).serializeArray();
  const index = myLibrary.length;
  addBookToLibrary(test[0].value, test[1].value, test[2].value, index);
  displayAllBooks(myLibrary);
  document.querySelector('.books-grid').innerHTML = content;
  this.reset();

  myLibrary.forEach((book, index) => {
    const deleteButton = document.querySelector(`#book-${index} button.delete`);
    const statusButton = document.querySelector(`#book-${index} button.status`);

    deleteButton.addEventListener('click', () => {
      myLibrary = myLibrary.filter((book) => book.id !== index);
      const card = document.getElementById(`book-${index}`);
      if (card) {
        card.remove();
      }
    });
    statusButton.addEventListener('click', function () {
      return $(this).html() === 'Read'
        ? $(this).html('Not Read')
        : $(this).html('Read');
    });
  });

  if ($('.form').hasClass('show')) {
    $('.form').addClass('hide');
    $('.form').removeClass('show');
  }
});

addNewBookButton.addEventListener('click', () => {
  $('.form').toggleClass('hide show');
});
