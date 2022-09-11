import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderCountries } from './index.js';

const list = document.querySelector('.country-list');
const container = document.querySelector('.country-info');

export function fetchCountries(event) {
  const countryName = event.target.value.trim();
  if (!countryName) {
    list.innerHTML = '';
    container.innerHTML = '';
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
      return renderCountries(data);
    })
    .catch(err => {
      console.log(err);
    });
}
