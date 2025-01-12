// Array to store all book objects
const myLibrary = [];

// Constructor function to create a Book object
function Book(title, author, pages, isRead) {
  this.title = title; // Title of the book
  this.author = author; // Author of the book
  this.pages = pages; // Number of pages in the book
  this.isRead = isRead; // Read status of the book (true/false)
}

// Method to toggle the read status of the book
Book.prototype.toggleReadStatus = function() {
  this.isRead = !this.isRead;
};

// Function to add a new book to the library array
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead); // Create a new book object
  myLibrary.push(newBook); // Add the book to the library array
}

// Function to display all books in the library on the page
function displayBooks() {
  const libraryContainer = document.getElementById('library'); // Get the library container
  libraryContainer.innerHTML = ''; // Clear the container to avoid duplicates

  myLibrary.forEach((book, index) => {
    // Create a card for each book
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card'); // Add a class for styling

    // Display book details
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.isRead ? 'Yes' : 'No'}</p>
      <button class="remove-btn" data-index="${index}">Remove</button>
      <button class="toggle-read-btn" data-index="${index}">Toggle Read</button>
    `;

    libraryContainer.appendChild(bookCard); // Add the card to the container
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
  const bookIndex = event.target.dataset.index; // Get the index from the data attribute
  myLibrary.splice(bookIndex, 1); // Remove the book from the array
  displayBooks(); // Refresh the display
}

// Function to toggle the read status of a book
function toggleReadStatus(event) {
  const bookIndex = event.target.dataset.index; // Get the index from the data attribute
  myLibrary[bookIndex].toggleReadStatus(); // Toggle the read status
  displayBooks(); // Refresh the display
}

// Function to handle the form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission

  // Get input values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('isRead').checked;

  // Add the new book to the library and refresh the display
  addBookToLibrary(title, author, pages, isRead);
  displayBooks();

  // Clear the form
  event.target.reset();
}

// Event listener for the form submission
const form = document.getElementById('book-form');
form.addEventListener('submit', handleFormSubmit);

// Initial books for testing
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
displayBooks();