import { auth, options } from './authen.js';
import { categoryList } from './category.js';
import { showSpinner, hideSpinner } from './utils.js';

const quotesDom = document.querySelector('blockquote');
const authorDom = document.querySelector('figcaption');
const catDom = document.querySelector('.category-label');
let catIndex = Math.floor(Math.random() * 66);
const dropdown = document.querySelector('.dropdown-menu');
// const dropdownItem = document.querySelectorAll('.dropdown-item');
const submit = document.getElementById('submit');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const userError = document.querySelector('.user-error');
const MESSAGE_TEXT_ERROR =
  "L'ignorance est une feuille blanche sur laquelle on peut écrire, mais l'erreur est une feuille griffonnée qu'il faut d'abord effacer. Nous finissons par apprendre qu'il ne sert à rien de trop s'affliger de nos erreurs.";

// const nextBtn = document.querySelector('.next-btn');
// const prevBtn = document.querySelector('.prev-btn');

const capitalizedList = categoryList.map(
  (word) => word.charAt(0).toUpperCase() + word.slice(1),
);

async function fetchApiQuotes(category = capitalizedList[catIndex]) {
  showSpinner();
  const response = await fetch(`${auth.url}?category=${category}`, options);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    console.log(message);
    throw new Error(message);
  }
  hideSpinner();
  const data = await response.json();
  return data;
}

async function fetchAndDisplayQuote(targetCategory) {
  try {
    const quotes = await fetchApiQuotes(targetCategory);
    quotesDom.textContent = quotes[0].quote;
    authorDom.textContent = `-- ${quotes[0].author}`;
    catDom.classList.remove('hide');
    catDom.innerText = `${quotes[0].category}`;
  } catch (error) {
    userError.textContent = `${MESSAGE_TEXT_ERROR} ${error}`;
    console.error('Error fetching quotes:', error);
  }
}

fetchAndDisplayQuote();

capitalizedList.forEach((item) => {
  const li = document.createElement('li');
  const link = document.createElement('a');
  link.dataset.category = item;
  link.href = '#';
  link.classList.add('dropdown-item');
  link.innerText = item;
  li.appendChild(link);
  dropdown.appendChild(li);
});

document.querySelector('.dropdown').addEventListener('click', (e) => {
  if (e.target.classList.contains('dropdown-item')) {
    fetchAndDisplayQuote(e.target.dataset.category);
    dropdownToggle.textContent = e.target.dataset.category;
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach((item) => {
      item.classList.remove('selected');
    });
    e.target.classList.add('selected');
  }
});

submit.addEventListener('click', (e) => {
  e.preventDefault();
  catIndex = Math.floor(Math.random() * 66);

  const category = dropdownToggle.textContent.includes('Choose')
    ? capitalizedList[catIndex]
    : dropdownToggle.textContent;

  fetchAndDisplayQuote(category);
});

// nextBtn.addEventListener('click', () => {
//   catIndex = (catIndex + 1) % categoryList.length;
//   fetchAndDisplayQuote(categoryList[catIndex]);
// });

// prevBtn.addEventListener('click', () => {
//   catIndex = (catIndex - 1 + categoryList.length) % categoryList.length;
//   fetchAndDisplayQuote(categoryList[catIndex]);
// });
