import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const container = document.querySelector('.country-info');

input.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

export function renderCountries(arr) {
  container.innerHTML = '';

  if (arr.length > 1 && arr.length < 11) {
    list.innerHTML = arr.reduce(
      (acc, { name, flags }) =>
        `${acc}<li class="country_item"><img src=${flags.svg} width='15' alt='${name.official}'>  ${name.official}</li>`,
      ''
    );
  } else if (arr.length === 1) {
    list.innerHTML = arr.reduce(
      (acc, { name, flags }) =>
        `${acc}<li class="country_specified"><img src=${flags.svg} width='30' alt='${name.official}'>  <b>${name.official}</b></li>`,
      ''
    );
    container.innerHTML = arr.reduce(
      (acc, { capital, population, languages }) =>
        `${acc}<ul class="properties"><li><b>Capital:</b> ${capital}</li><li><b>Population:</b> ${population}</li><li><b>Languages:</b> ${Object.values(
          languages
        )}</li>`,
      ''
    );
  }
}
