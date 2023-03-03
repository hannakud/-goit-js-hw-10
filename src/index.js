import './css/styles.css';
import debounce from 'lodash';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce);

// fetch('https://restcountries.com/v3.1/name/peru')
//   .then(response => response.json())
//   .then(data => {
//     const { flag, capital } = data[0];
//     console.log(data[0]);
//     console.log(flag);
//     console.log(capital);
//   });
