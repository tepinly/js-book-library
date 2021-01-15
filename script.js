let library = [];

function Book(name, author, description, pages, read) {
    this.name = name.toString();
    this.author = author.toString();
    this.description = description.toString();
    this.pages = pages;
    this.read = read;
}

function bookRead(i) {
    library[]
}

function addBook(name, author, description, pages, read) {
    if(!name || !author || !description || !pages) {
        document.getElementById('error').innerHTML = "Fill out all the input fields";
    }
    else {
        document.getElementById('error').innerHTML = "";
        const newBook = new Book(name, author, description, pages, read ? 'Read' : 'Not read yet');
        library.push(newBook);
        console.log(library.indexOf(newBook));
    }
}

function deleteBook(i) {
    library.splice(i, 1);
    displayBooks();
}

function displayBooks() {
    const books = library.map(x => '<div class=\"array\"><p>Book Name: ' +x.name+ '<br>Author: ' +x.author+ '<br>Description: ' +x.description+
        '<br>Pages: ' +x.pages+ '<br>Completion: ' +(x.read)+ '</p><button type=\"submit\" onclick=\"deleteBook(' +library.indexOf(x)+ ')\">Delete</button></div>').join('');

    document.getElementById('display').innerHTML = books;
}