import { auth, options } from "./authen.js";
import { categoryList } from "./category.js";

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
const submit = document.getElementById('submit');

async function quotesApi() {
  const quotes = await fetchApiQuotes(selectCategory.value);
  quotesDom.innerText = quotes[0].quote;
  authorDom.innerHTML = `&mdash; ${quotes[0].author}`;
}

quotesApi();

categoryList.map((cat) => {
  const option = document.createElement('option');
  option.classList.add('quote-category');
  option.value = cat;
  option.text = cat;
  selectCategory.appendChild(option);
});

selectCategory.addEventListener('change', quotesApi);
submit.addEventListener('click', (e) => {
  e.preventDefault();
  quotesApi();
});
