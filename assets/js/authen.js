export const auth = {
  key: '48sf0bSECqpNn3rw2663GZA7qME6Ui0E3EGgdHBe',
  url: 'https://api.api-ninjas.com/v1/quotes',
};

export const options = {
  method: 'GET',
  headers: { 'X-Api-Key': auth.key },
  url: auth.url,
  contentType: 'application/json',
};
