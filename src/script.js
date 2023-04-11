/* eslint-disable no-unused-vars */
import Date from './modules/date.js';

const button = document.querySelector('.Button');
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const listNav = document.querySelector('.listNav');
const addNav = document.querySelector('.addNav');
const contactNav = document.querySelector('.contactNav');
const listSec = document.querySelector('.for-list');
const addSec = document.querySelector('.for-add');
const contactSec = document.querySelector('.for-contact');
const table = document.querySelector('.table')

const tbody = document.createElement('tbody');
const booksList = document.querySelector('.books');
booksList.appendChild(tbody);

const books = JSON.parse(localStorage.getItem('books-list')) || [{
  title: 'The Great Gatsby', author: 'F. Scott Fitzgerald',
}, {
  title: 'Jane Eyre', author: 'Charlotte Bronte',
}];

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
  title.focus();
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
    Books.display();
    document.querySelector('form').reset();
    title.focus();
  }

  static setEventListener() {
    const y = document.querySelectorAll('.remove');
    y.forEach((button) => {
      button.addEventListener('click', Books.remove);
    });
  }

  static display() {
    localStorage.setItem('books-list', JSON.stringify(books));
    let i = 0;
    tbody.innerHTML = '';

    if (books.length === 0) {
      tbody.innerHTML = '<p class=\'btn btn-outlin-primary\'> Please add books in the next tab </p>';
      table.classList.replace('table','center');
    } else {
      table.classList.replace('center','table');
      books.forEach((book) => {
        tbody.innerHTML += `
      <tr class='book'>
        <td><strong>"${book.title}"</strong> by <em>${book.author}</em></td>
        <td><button id=${i} class='remove btn btn-outline-primary'> Remove </button> </td> 
      </tr>
      `;
        i += 1;
      });
      Books.setEventListener();
    }
    return 0;
  }

  static remove(e) {
    const toBeRemoved = e.target.parentElement.parentElement;
    tbody.removeChild(toBeRemoved);
    const i = e.target.id;
    books.splice(i, 1);
    Books.display();
  }
}

Books.display();
button.addEventListener('click', Books.addBook);
window.addEventListener('load', Date());