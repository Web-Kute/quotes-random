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

async function quotesApi(cat, e) {
  try {
    const quotes = await fetchApiQuotes(e.target.dataset.category);
    console.log('quotes', quotes);

    quotesDom.innerText = quotes[0].quote;
    authorDom.textContent = `-- ${quotes[0].author}`;
    catDom.innerText = `${quotes[0].category}`;
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
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
});

// dropdown.addEventListener('click', quotesApi);

document.querySelector('.dropdown').addEventListener('click', (e) => {
  if (e.target.classList.contains('dropdown-item')) {
    quotesApi(e);
  }
});
