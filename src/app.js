import axios from 'axios';
import debounce from 'lodash.debounce';
import { storeCityInLocalStorage } from './storeCityInLocalStorage';
import { removeCityFromLocalStorage } from './removeCityFromLocalStorage';
import { kelvinToCelsjus } from './kelvinToCelsjus';
import { capitalize } from './cityNameCapitalize'
// define UI vars
const apiKey = process.env.KEY;
const form = document.querySelector('#city-form');
const cityList = document.querySelector('.collection');
const citySearch = document.querySelector('#citySearch');

// load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getCities);
  form.addEventListener('submit', addCity);
  cityList.addEventListener('click', removeCity);
}


function getWeather(city, element) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;

  let temperature;
  let humidity;
  let pressure;

  const t = document.createElement('p');
  const h = document.createElement('p');
  const p = document.createElement('p');

  const procesRequest = debounce(() => {
    axios.get(url)
      .then((response) => {
        temperature = response.data.main.temp;
        humidity = response.data.main.humidity;
        pressure = response.data.main.pressure;
        t.innerHTML = `Temperature: ${kelvinToCelsjus(temperature.toString())} &degC`;
        h.innerHTML = `Humidity: ${humidity} %`;
        p.innerHTML = `Pressure: ${pressure} hPa`;
        // return element.appendChild(t);
        element.appendChild(t);
        element.appendChild(h);
        element.appendChild(p);
      })
      .catch((error) => {
        console.log(error);
      });
  }, 400);
  procesRequest();
}

// get cities from localStorage
function getCities() {
  let cities;
  if (localStorage.getItem('cities') === null) {
    cities = [];
  } else {
    cities = JSON.parse(localStorage.getItem('cities'));
  }
  cities.forEach((city) => {
    const li = document.createElement('li');
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(city));
    // create new link createElement
    const link = document.createElement('a');
    // create new p element
    getWeather(city, li);
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="material-icons">delete</i>';
    // append the link to li
    li.appendChild(link);
    // append li to ul
    cityList.appendChild(li);
  });
}

function removeCity(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
      removeCityFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function addCity(e) {
  if (citySearch.value === '') {
    // change this to toast
    alert('Enter city name');
  } else {
    const cityCapitalized = capitalize(citySearch.value);
    // create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(cityCapitalized));
    // create new link createElement
    getWeather(cityCapitalized, li);
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="material-icons">delete</i>';
    // append the link to li
    li.appendChild(link);
    // append li to ul
    cityList.appendChild(li);
    // store in localStorage
    storeCityInLocalStorage(cityCapitalized);
    // clear input
    citySearch.value = '';
  }
  e.preventDefault();
}

loadEventListeners();
