let myLibrary = []

// zmienne globalne
let title = "";
let author = "";
let pages = "";
let read = "";
let bookToAdd = "";
let buttonsDel;
let table = document.getElementById("table");

//user's inputs i dopasowanie ich do zmiennych
function getTitle() {
    title = document.getElementById("titleInput").value;
}
function getAuthor() {
    author = document.getElementById("authorInput").value;
}
function getPages() {
    pages = document.getElementById("pagesInput").value;
}
document.getElementById("readit").addEventListener("click", function(){
    read = "Yes";
});
document.getElementById("notread").addEventListener("click", function(){
    read = "No";
});
document.getElementById("addbook").addEventListener("click", addBookToLibrary);

//Konstruktor obiektu
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary() {
  bookToAdd = new Book(title, author, pages, read);
  myLibrary.push(bookToAdd);
  console.log(myLibrary);
  render();
}

let deleteButtons = function() {
  buttonsDel = document.querySelectorAll("#table button");
  buttonsDel.forEach(function(button) {
    button.addEventListener("click", function() {
      let index = button.dataset.bookindex;
      let child = document.querySelector(`tr[data-bookindex='${index}']`);
      child.parentNode.removeChild(child);
      myLibrary.splice(index, 1);
      render();
    })
  });
}

let render = function() {
  table.innerHTML = "";
  let i = 0;
  myLibrary.forEach((book) => {
    const tableRow = document.createElement("tr");
    table.appendChild(tableRow);
    tableRow.setAttribute("data-bookindex", i);
    const tableTitle = document.createElement("td");
    tableRow.appendChild(tableTitle);
    tableTitle.textContent = book.title;
    const tableAuthor = document.createElement("td");
    tableRow.appendChild(tableAuthor);
    tableAuthor.textContent = book.author;
    const tablePages = document.createElement("td");
    tableRow.appendChild(tablePages);
    tablePages.textContent = book.pages;
    const tableRead = document.createElement("td");
    tableRow.appendChild(tableRead);
    tableRead.textContent = book.read;
    tableRead.setAttribute("class", "readstat");
    const tableButton = document.createElement("button");
    tableRow.appendChild(tableButton);
    tableButton.textContent = "x";
    tableButton.setAttribute("data-bookindex", i);
    i++;
  })
  deleteButtons();
  changeReadStatus();
}

let changeReadStatus = function() {
  let readStatus = document.querySelectorAll(".readstat");
  readStatus.forEach(function(td) {
    td.addEventListener("click", function() {
      if (td.textContent === "Yes") {
        td.textContent = "No";
      }
      else {
        td.textContent = "Yes";
      }
    })
  })
}
