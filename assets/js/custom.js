const auth = {
  key: '8iHRD+rzhRCj7AogfqMR9A==8S6IYSQgL5lALbtU',
  url: 'https://api.api-ninjas.com/v1/quotes',
};

const options = {
  method: 'GET',
  headers: { 'x-api-key': auth.key },
  url: auth.url,
  accept: 'application/json',
};
const categoryList = [
  'age',
  'alone',
  'amazing',
  'anger',
  'architecture',
  'art',
  'attitude',
  'beauty',
  'best',
  'birthday',
  'business',
  'car',
  'change',
  'communication',
  'computers',
  'cool',
  'courage',
  'dad',
  'dating',
  'death',
  'design',
  'dreams',
  'education',
  'environmental',
  'equality',
  'experience',
  'failure',
  'faith',
  'family',
  'famous',
  'fear',
  'fitness',
  'food',
  'forgiveness',
  'freedom',
  'friendship',
  'funny',
  'future',
  'god',
  'good',
  'government',
  'graduation',
  'great',
  'happiness',
  'health',
  'history',
  'home',
  'hope',
  'humor',
  'imagination',
  'inspirational',
  'intelligence',
  'jealousy',
  'knowledge',
  'leadership',
  'learning',
  'legal',
  'life',
  'love',
  'marriage',
  'medical',
  'men',
  'mom',
  'money',
  'morning',
  'movies',
  'success',
];

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
