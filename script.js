// Class representing a Book
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  // Method to toggle the read status
  toggleReadStatus() {
    this.isRead = !this.isRead;
  }
}

// Class representing the Library
class Library {
  #books; // Private field to store the books

  constructor() {
    this.#books = [];
  }

  // Getter to retrieve all books
  get books() {
    return this.#books;
  }

  // Method to add a book to the library
  addBook(book) {
    this.#books.push(book);
  }

  // Method to remove a book from the library
  removeBook(index) {
    this.#books.splice(index, 1);
  }

  // Method to get a book by index
  getBook(index) {
    return this.#books[index];
  }
}

// Instance of the Library class
const myLibrary = new Library();

// Function to display all books in the library on the page
function displayBooks() {
  const libraryContainer = document.getElementById('library');
  libraryContainer.innerHTML = ''; // Clear the container to avoid duplicates

  myLibrary.books.forEach((book, index) => {
    // Create a card for each book
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    // Display book details
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.isRead ? 'Yes' : 'No'}</p>
      <button class="remove-btn" data-index="${index}">Remove</button>
      <button class="toggle-read-btn" data-index="${index}">Toggle Read</button>
    `;

    libraryContainer.appendChild(bookCard);
  });

  // Add event listeners for remove and toggle buttons
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', removeBook);
  });

  document.querySelectorAll('.toggle-read-btn').forEach(button => {
    button.addEventListener('click', toggleReadStatus);
  });
}

// Function to remove a book from the library
function removeBook(event) {
  const bookIndex = event.target.dataset.index;
  myLibrary.removeBook(bookIndex);
  displayBooks();
}

// Function to toggle the read status of a book
function toggleReadStatus(event) {
  const bookIndex = event.target.dataset.index;
  const book = myLibrary.getBook(bookIndex);
  book.toggleReadStatus();
  displayBooks();
}

// Function to handle the form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('isRead').checked;

  const newBook = new Book(title, author, pages, isRead);
  myLibrary.addBook(newBook);
  displayBooks();

  event.target.reset();
}

// Event listener for the form submission
const form = document.getElementById('book-form');
form.addEventListener('submit', handleFormSubmit);

// Initial books for testing
myLibrary.addBook(new Book('The Hobbit', 'J.R.R. Tolkien', 310, true));
myLibrary.addBook(new Book('1984', 'George Orwell', 328, false));
displayBooks();
