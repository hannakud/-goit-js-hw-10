import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 700;

const refs = {
  searchBox: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

function onInput(event) {
  const name = event.target.value.trim();
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  if (!name) {
    return;
  }

  fetchCountries(name)
    .then(countries => {
      console.log(countries);
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length === 1) {
        if (countries[0].name.official === 'Russian Federation') {
          const terrorists = {
            flags: {
              png: 'https://flagcdn.com/w320/ru.png',
              svg: 'https://flomaster.club/uploads/posts/2021-12/thumbs/1639162837_31-flomaster-club-p-kakashka-dlya-srisovki-krasivie-risunki-37.jpg',
              alt: 'The flag of Russia is composed of three equal horizontal bands of white, blue and red.',
            },
            name: {
              common: 'Russia',
              official: 'Russian Federation',
              nativeName: {
                rus: {
                  official: 'Mordor',
                  common: 'Россия',
                },
              },
            },
            capital: ['moscow'],
            altSpellings: ['RU', 'Russian Federation', 'Российская Федерация'],
            languages: {
              rus: 'Svinosobachiy',
            },
            population: '144104080 - 150000 orks',
          };
          refs.countryInfo.insertAdjacentHTML(
            'beforeend',
            showSingleCountry(terrorists)
          );
        } else {
          refs.countryInfo.insertAdjacentHTML(
            'beforeend',
            showSingleCountry(countries[0])
          );
        }
      } else {
        refs.countryList.insertAdjacentHTML(
          'beforeend',
          showCountriesList(countries)
        );
      }
    })
    .catch(err => Notiflix.Notify.failure(err.message));
}

const handleInput = debounce(onInput, DEBOUNCE_DELAY);

refs.searchBox.addEventListener('input', handleInput);

function showSingleCountry({ name, capital, population, flags, languages }) {
  return `
          <ul class="country-info__list">
        <li class="country-info__item"> <img class="country-list__flag" src="${
          flags.svg
        }" alt="Flag of ${name.official}" width = 35px height = 30px> <h2>${
    name.official
  }</h2>
</li>
              <li class="country-info__item"><b>Capital:</b> ${capital}
              </li>
              <li class="country-info__item"><b>Population:</b> ${population}</li>
              <li class="country-info__item"><b>Languages:</b> ${Object.values(
                languages
              ).join(', ')}</li>
          </ul>
          `;
}

function showCountriesList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
            <li class="country-list__item">
                <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width=45px height=35px>
                <h2 class="country-list__name">${name.official}</h2>
            </li>
            `;
    })
    .join('');
  return markup;
}
