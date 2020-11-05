let addContainer = document.querySelector(".container__add");
let modal = document.querySelector(".modal");
let form = document.querySelector("form");
let books = [];

function Book(id, title, author, pages, status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToDOM(id, title, author, pages, status) {
    let container = document.querySelector(".container");
    let section = document.createElement("section");
    let header = document.createElement("h3");
    let authorSpan = document.createElement("span");
    let pagesSpan = document.createElement("span");
    let buttonContainer = document.createElement("div");
    let removeButton = document.createElement("button");
    let statusButton = document.createElement("button");

    removeButton.addEventListener("click", (event) => {
        let id = removeButton.getAttribute("id");
        books = books.filter(book => book.id != id);
        localStorage.clear();
        addToLocalStorage(books);
        event.target.parentElement.parentElement.remove();
    })

    statusButton.addEventListener("click", (event) => {
        let id = statusButton.getAttribute("id");
        let book = books.find((book) => book.id == id);
        book.status = book.status == "true" ? "false" : "true";
        
        statusButton.classList.toggle("read");
        statusButton.classList.toggle("unread");

        statusButton.textContent = book.status == "true" ? "READ" : "NOT READ";

        localStorage.clear();
        addToLocalStorage(books);
    })


    section.classList.add("container__book");
    buttonContainer.classList.add("container__book__buttons")
    
    if ( status == "true") {
        statusButton.classList.add("read");
    } else {
        statusButton.classList.add("unread")
    }
    
    header.textContent = title.slice(0, 20) + "...";
    header.setAttribute("title", title);

    authorSpan.textContent = `Written by ${author}`;
    pagesSpan.textContent = `${pages} pages`;
    removeButton.textContent = "Remove";
    statusButton.textContent = status == "true" ? "READ" : "NOT READ";

    removeButton.setAttribute("id", id);
    statusButton.setAttribute("id", id);

    buttonContainer.appendChild(removeButton);
    buttonContainer.appendChild(statusButton);

    section.appendChild(header);
    section.appendChild(authorSpan);
    section.appendChild(pagesSpan);
    section.appendChild(buttonContainer);

    container.appendChild(section);
}

function addToLocalStorage(books) {
    window.localStorage.setItem("books", JSON.stringify(books));
}

function loadBooks() {

    if ( !window.localStorage.getItem("books") ) {
        books = [] 
    } else {
        books = JSON.parse(window.localStorage.getItem("books"));
    }
    
    books.forEach((book) => {
        addBookToDOM(
            book.id,
            book.title,
            book.author,
            book.pages,
            book.status
        )
    })
}

loadBooks();


addContainer.addEventListener("click", (event) => {
    modal.style.display = "block";
    event.stopPropagation();
})

window.addEventListener("click", (event) => {
    if ( event.target == modal) {
        modal.style.display = "none";
    }
})

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let id = books.length;
    let title = event.target.elements.title.value;
    let author = event.target.elements.author.value;
    let pages = event.target.elements.pages.value;
    let status = event.target.elements.status.value;
    
    addBookToDOM(id, title, author, pages, status);

    let book = new Book(id, title, author, pages, status);
    books.push(book);
    addToLocalStorage(books);
})