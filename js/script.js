// BOOK CONSTUCTOR

function Book(title, author, pages, read){
    this.id= crypto.randomUUID()// creates unique id
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

}

//Empty array to store library

const myLibrary = [];

//DOM ELEMENTS
const newBookBtn = document.getElementById('new-book-id')
const bookContainer = document.getElementById('book--container')
const bookFormModal = document.getElementById('book-form-modal')
const  bookForm = document.getElementById('book--form')
const cancelBtn = document.getElementById('cancel--btn')

//Create sample book objects

function addSampleBooks(){
    const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
    const book2 = new Book('Dune', 'Frank Herbert', 412, false);
    myLibrary.push(book1,book2);
    displayBooks();
}

//Add book to library function

function addBookToLibrary(title,author,pages,read){
    const newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
    displayBooks();
}

//Display all BOoks

function displayBooks(){

    bookContainer.innerHTML = '' ;

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div')
        bookCard.className = 'book--card'
        bookCard.id = book.id

        bookCard.innerHTML =`
        <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <div class="book--actions">
                <button class="toggle--read ${book.read ? '' : 'not-read'}">
                    ${book.read ? 'Read' : 'Not Read'} 
                </button>
                <button class="remove--book">Remove</button>
            </div>
        `;
        //tenary conditional if true show read, if false show not read
        bookContainer.appendChild(bookCard);
        
    });
    addBookEventListeners()
}

//Add Event Listeners for book btns

function addBookEventListeners() {
    document.querySelectorAll('.toggle--read').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.closest('.book--card').dataset.id;
            const book = myLibrary.find(book => book.id === bookId);
            book.read = !book.read//Toggle read have to debug not sure it works
            displayBooks(); // Refresh display
        });
    });
    
    document.querySelectorAll('.remove--book').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.closest('.book--card').dataset.id;
            const bookIndex = myLibrary.findIndex(book => book.id === bookId);
            myLibrary.splice(bookIndex, 1); // Remove book
            displayBooks(); // Refresh display
        });
    });
}

///

newBookBtn.addEventListener('click', () => {
    bookFormModal.showModal()
});

cancelBtn.addEventListener('click', () => {
    bookFormModal.close()
});

bookForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value === 'true';
    
    // Add book to library
    addBookToLibrary(title, author, pages, read);
    
    // Reset and close form
    bookForm.reset();
    bookFormModal.close();
});

addSampleBooks();