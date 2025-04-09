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
                <button class="toggle-read ${book.read ? '' : 'not-read'}">
                    ${book.read ? 'Read' : 'Not Read'} 
                </button>
                <button class="remove-book">Remove</button>
            </div>
        `;
      //used ternary opperator if true show read if false show not-read  
        bookContainer.appendChild(bookCard);
        
    });
    addBookEventListeners()
}

addSampleBooks()