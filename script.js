let library = [];

function Book(name, author, description, pages, read) {
    this.name = name.toString();
    this.author = author.toString();
    this.description = description.toString();
    this.pages = pages;
    this.read = read;
}

function bookRead(i) {}

function addBook(name, author, description, pages, read) {
    if (!name || !author || !description || !pages) {
        document.getElementById('error').innerHTML = "Fill out all the input fields";
    } else {
        document.getElementById('error').innerHTML = "";
        const newBook = new Book(name, author, description, pages, read ? 'Read' : 'Not read yet');
        library.push(newBook);
        console.log(library.indexOf(newBook));
    }

    if (document.getElementById('disp-btn').className != 'disp-on') {
        displayBooks();
    }

    document.getElementById('alrt').innerHTML = 'Book has been inserted';
    setTimeout(function () {
        document.getElementById('alrt').innerHTML = '';
    }, 3000);
}

function deleteBook(i) {
    library.splice(i, 1);
    displayBooks();
}

function toggleButton() {
    var element = document.getElementById('disp-btn');
    if (element.className == "disp-on") {
        element.innerHTML = "Hide Books";
        element.classList.toggle('disp-off');
        displayBooks();
    } else {
        element.innerHTML = "Display Books";
        element.classList.toggle('disp-off');
        hideBooks();
    }
}

function displayBooks() {
    const books = library.map(x => '<div class=\"array\"><p>Book Name: ' + x.name + '<br>Author: ' + x.author + '<br>Description: ' + x.description +
        '<br>Pages: ' + x.pages + '<br>Completion: ' + (x.read) + '</p><button type=\"submit\" onclick=\"deleteBook(' + library.indexOf(x) + ')\">Delete</button></div>').join('');

    document.getElementById('display').innerHTML = books;
}

function hideBooks() {
    document.getElementById('display').innerHTML = "";
}