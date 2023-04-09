/* eslint-disable no-unused-vars */

const button = document.querySelector('.Button');
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const booksList = document.querySelector('.books');
const listNav = document.querySelector('.listNav');
const addNav = document.querySelector('.addNav');
const contactNav = document.querySelector('.contactNav');
const listSec = document.querySelector('.for-list');
const addSec = document.querySelector('.for-add');
const contactSec = document.querySelector('.for-contact');

const books = JSON.parse(localStorage.getItem('books-list')) || [{
  title: 'The Great Gatsby', author: 'F. Scott Fitzgerald',
}, {
  title: 'Jane Eyre', author: 'Charlotte Bronte',
}];

const tbody = document.createElement('tbody');
booksList.appendChild(tbody);
const date = new Date();
const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

document.querySelector('.date').innerHTML = `${date.toDateString()}, ${time}`;

listSec.style.display = 'block';
addSec.style.display = 'none';
contactSec.style.display = 'none';

listNav.addEventListener('click', () => {
  listSec.style.display = 'block';
  addSec.style.display = 'none';
  contactSec.style.display = 'none';
  listNav.classList.add('nav-links');
  addNav.classList.remove('nav-links');
  contactNav.classList.remove('nav-links');
});
addNav.addEventListener('click', () => {
  addSec.style.display = 'block';
  listSec.style.display = 'none';
  contactSec.style.display = 'none';
  listNav.classList.remove('nav-links');
  addNav.classList.add('nav-links');
  contactNav.classList.remove('nav-links');
});
contactNav.addEventListener('click', () => {
  contactSec.style.display = 'block';
  listSec.style.display = 'none';
  addSec.style.display = 'none';
  listNav.classList.remove('nav-links');
  addNav.classList.remove('nav-links');
  contactNav.classList.add('nav-links');
});

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBook(e) {
    e.preventDefault();

    const book = new Books(title.value, author.value);

    books.push(book);
    localStorage.setItem('books-list', JSON.stringify(books));

    Books.display();
    document.querySelector('form').reset();
    title.focus();
  }

  static display() {
    let i = 0;
    tbody.innerHTML = '';
    if (books.length !== 0) {
      books.forEach((book) => {
        tbody.innerHTML += `
      <tr class='book'>
        <td><strong>"${book.title}"</strong> by <em>${book.author}</em></td>
        <td><button onclick="Books.remove(${i})" class='btn btn-outline-primary'> Remove </button> </td> 
      </tr>
      `;
        i += 1;
      });
    }
    return 0;
  }

  static remove(i) {
    const x = document.querySelectorAll('.book')[i];
    tbody.removeChild(x);
    books.splice(i, 1);
    localStorage.setItem('books-list', JSON.stringify(books));
    Books.display();
  }
}

Books.display();
button.addEventListener('click', Books.addBook);
