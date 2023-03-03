const link = 'https://restcountries.com/v3.1/name/';
// const peru = 'https://restcountries.com/v3.1/name/peru';
function fetchCountries(name) {
  return fetch(link)
    .then(response => response.json)
    .catch(error => console.error(error));
}
