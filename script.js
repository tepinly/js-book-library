let library = [];

function Book(name, author, description, pages, read) {
    this.name = name.toString();
    this.author = author.toString();
    this.description = description.toString();
    this.pages = pages;
    this.read = read;
}

function bookRead(i) {
    library.indexOf(i).read ? false : true;
    displayBooks();
}

function addBook(name, author, description, pages, read) {
    if (!name || !author || !description || !pages) {
        document.getElementById('error').innerHTML = "Fill out all the input fields";
    } else {
        document.getElementById('error').innerHTML = "";
        const newBook = new Book(name, author, description, pages, read);
        library.push(newBook);
        saveBook();

        if (document.getElementById('disp-btn').className != 'disp-on') {
            displayBooks();
        }

        alrt('Book has been inserted');
    }
}

function deleteBook(i) {
    library.splice(i, 1);
    displayBooks();
}

function toggleButton(val = 1) {
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
        '<br>Pages: ' + x.pages + '<br>Completion: ' + (x.read ? 'Read' : 'Not read yet') + '<button type="submit" class="btn-read" onclick="bookRead()">Toggle</button)' + '</p><button type=\"submit\" onclick=\"deleteBook(' + library.indexOf(x) + ')\">Delete</button></div>').join('');

    document.getElementById('display').innerHTML = books;

    var element = document.getElementById('disp-btn');
    if (element.className == "disp-on") {
        element.innerHTML = "Hide Books";
        element.classList.toggle('disp-off');
    }

    return 0;
}

function hideBooks() {
    var element = document.getElementById('disp-btn');
    if (element.className != "disp-on") {
        element.innerHTML = "Display Books";
        element.classList.toggle('disp-off');
    }

    document.getElementById('display').innerHTML = "";
}

function saveBooks() {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('library', JSON.stringify(library));
        alrt('Saved locally');
    } else {
        alrt('Error: Could not store library locally');
    }
}

function loadBooks() {
    library = JSON.parse(localStorage.getItem('library'));
    displayBooks();
    alrt('Local loaded');   
    console.log(library);
}

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
                e.code === 22 ||
                e.code === 1014 ||
                e.name === 'QuotaExceededError' ||
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            (storage && storage.length !== 0);
    }
}

function saveFB() {
    firebase.database().ref('/').set({
        library
    });
    alrt('Saved to cloud');
}

function alrt(message) {
    document.getElementById('alrt').innerHTML = message;
    setTimeout(() => document.getElementById('alrt').innerHTML = '', 2000);
}

function loadFB() {
    const dbRefObject = firebase.database().ref().child('library');
    dbRefObject.on('value', snap => library = snap.val());
    setTimeout(() => {
        displayBooks();
        alrt('Cloud loaded');
    }, 700);
}