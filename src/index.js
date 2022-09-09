import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 3000;

const input = document.querySelector('#search-box');

input.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

function fetchCountries(event) {
  const countryName = event.target.value.trim();
  if (!countryName) {
    return;
  }
  console.log(countryName);
  const baseUrl = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;
  fetch(baseUrl)
    .then(response => {
      if (!response.ok) {
        Notify.failure('Oops, there is no country with that name');
        throw new Error();
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
}
