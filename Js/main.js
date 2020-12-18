let myLibrary = [];
let addNewBookButton = document.querySelector("button.newBook");

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

let content = "";

function bookCard(book, index) {
  return `
  <div id="book" class="col-md-4 mt-2">
      <div class="card" style="width: 18rem;">
          <div class="card-body">
              <h5 class="card-title" id="itemName">${book.title}</h5>
              <p class="card-text" id="itemDesc">${book.author}</p>
              <p class="card-text">${book.pages}</p>
              <p class="card-text">${book.read}</p>
              <button class="delete" data-id=${index}>Delete</button>
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

$("form").on("submit", function (event) {
  event.preventDefault();
  content = "";
  let test = $(this).serializeArray();
  addBookToLibrary(test[0].value, test[1].value, test[2].value, test[3].value);
  displayAllBooks(myLibrary);
  document.querySelector(".books-grid").innerHTML = content;
  this.reset();
  let deleteButton = document.querySelector("button.delete");
  console.log(deleteButton.dataset.id);

  deleteButton.addEventListener("click", function () {
    content = "";
    console.log("BEFORE", myLibrary);
    myLibrary = myLibrary.filter((_, index) => index != this.dataset.id);
    console.log("AFTER", myLibrary);
    displayAllBooks(myLibrary);
    document.querySelector(".books-grid").innerHTML = content;
  });

  if ($(".formContainer").hasClass("show")) {
    $(".formContainer").addClass("hide");
    $(".formContainer").removeClass("show");
  }
});

addNewBookButton.addEventListener("click", function () {
  if ($(".formContainer").hasClass("hide")) {
    $(".formContainer").addClass("show");
    $(".formContainer").removeClass("hide");
  }
});
