export const auth = {
  key: '8iHRD+rzhRCj7AogfqMR9A==8S6IYSQgL5lALbtU',
  url: 'https://api.api-ninjas.com/v1/quotes',
};

export const options = {
  method: 'GET',
  headers: { 'x-api-key': auth.key },
  url: auth.url,
  accept: 'application/json',
};
