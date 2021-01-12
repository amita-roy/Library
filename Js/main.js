let myLibrary = [];
let addNewBookButton = document.querySelector("button.newBook");

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}
Book.prototype.info = function () {
  return `${this.title}, by ${this.author}, ${this.pages} pages`;
};

Book.prototype.read = "Not Read";

function addBookToLibrary(title, author, pages) {
  const newBook = new Book(title, author, pages);
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
              <button class="card-text status">${book.read}</button>
              <button onclick="deleteBook(${index})" class="delete" data-id=${index}>Delete</button>
          </div>
      </div>
    </div>
`;
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  render();
}

function displayAllBooks(books) {
  books.forEach((book, index) => {
    content += bookCard(book, index);
  });
}

function render() {
  event.preventDefault();
  content = "";
  displayAllBooks(myLibrary);
  document.querySelector(".books-grid").innerHTML = content;
}

$("form").on("submit", function (event) {
  event.preventDefault();
  content = "";
  let test = $(this).serializeArray();
  addBookToLibrary(test[0].value, test[1].value, test[2].value);
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

  let statusButton = document.querySelector("button.status");


  statusButton.addEventListener("click", function () {
    $(this).html() === "Read" ? $(this).html("Not Read") : $(this).html("Read");
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
