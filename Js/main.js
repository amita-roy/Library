let myLibrary = [];
let addNewBookButton = document.querySelector('button');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.info = function () {
  return `${this.title}, by ${this.author}, ${this.pages} pages, ${this.read}`;
};

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

let content = '';

function bookCard(book) {
  return `
  <div id="book" class="col-md-4 mt-2">
      <div class="card" style="width: 18rem;">
          <div class="card-body">
              <h5 class="card-title" id="itemName">${book.title}</h5>
              <p class="card-text" id="itemDesc">${book.author}</p>
              <p class="card-text">${book.pages}</p>
              <p class="card-text">${book.read}</p>
              <a href="#" class="btn btn-primary" id="addCart">Delete</a>
          </div>
      </div>
    </div>
`;
}

function displayAllBooks(books) {
  books.forEach((book) => {
    content += bookCard(book);
  });
}

$('form').on('submit', function (event) {
  event.preventDefault();
  content = '';
  let test = $(this).serializeArray();
  // console.log(test[0].value);
  addBookToLibrary(test[0].value, test[1].value, test[2].value, test[3].value);
  displayAllBooks(myLibrary);
  document.querySelector('.books-grid').innerHTML = content;
  this.reset();

  if ($('.formContainer').hasClass('show')) {
    $('.formContainer').addClass('hide');
    $('.formContainer').removeClass('show');
  }
});

addNewBookButton.addEventListener('click', function () {
  if ($('.formContainer').hasClass('hide')) {
    $('.formContainer').addClass('show');
    $('.formContainer').removeClass('hide');
  }
});
