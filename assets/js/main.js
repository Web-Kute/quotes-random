import { auth, options } from './authen.js';
import { categoryList } from './category.js';

async function fetchApiQuotes(category) {
  const response = await fetch(`${auth.url}?category=${category}`, options);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    console.log(message);
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}

const quotesDom = document.querySelector('blockquote');
const authorDom = document.querySelector('figcaption');
const catDom = document.querySelector('.caty');
  const catIndex = Math.floor(Math.random() * 66);
const dropdown = document.querySelector('.dropdown-menu');

async function quotesApi() {
  const quotes = await fetchApiQuotes((categoryList[catIndex]));
  console.log('quotes', quotes);
  quotesDom.innerText = quotes[0].quote;
  authorDom.innerHTML = `&mdash; ${quotes[0].author}`;
  catDom.innerText = `${quotes[0].category}`;
}

quotesApi();

categoryList.forEach((item) => {
  const li = document.createElement('li');
  const link = document.createElement('a');
  link.dataset.category = item;
  link.href = '#';
  link.classList.add('dropdown-item');
  link.innerText = item;
  li.appendChild(link);
  dropdown.appendChild(li);
  const catItem = document.querySelectorAll('.dropdown-item');
  console.log(catItem);
});

dropdown.addEventListener('click', (e) => {
  const category = e.target.dataset.category;
  console.log('category', category);
  quotesApi(category);
});
