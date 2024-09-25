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
const selectCategory = document.getElementById('category');
const quotesDom = document.querySelector('blockquote');
const authorDom = document.querySelector('figcaption');
const catDom = document.querySelector('.caty');
const submit = document.getElementById('submit');
const dropdown = document.querySelector('.dropdown-menu');

async function quotesApi() {
  const quotes = await fetchApiQuotes(selectCategory.value);
  quotesDom.innerText = quotes[0].quote;
  authorDom.innerHTML = `&mdash; ${quotes[0].author}`;
  catDom.innerText = `${quotes[0].category}`;
}

quotesApi();

categoryList.forEach((cat) => {
  const option = document.createElement('option');
  option.classList.add('quote-category');
  option.value = cat;
  option.text = cat;
  selectCategory.appendChild(option);
});

categoryList.forEach((item) => {
  const li = document.createElement('li');
  const link = document.createElement('a');
  li.appendChild(link);
  link.href = '#';
  link.classList.add('dropdown-item');
  link.innerText = item;
  link.dataset.value = item;
  dropdown.appendChild(li);
});

selectCategory.addEventListener('change', quotesApi);
submit.addEventListener('click', (e) => {
  e.preventDefault();
  quotesApi();
});
