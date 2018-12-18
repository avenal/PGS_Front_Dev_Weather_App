import axios from 'axios';
import debounce from 'lodash.debounce';


// const apiKey = process.env.KEY;
// const city = document.querySelector("#searchInput").value;
// let cityTest = 'Warsaw'
// const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityTest}&APPID=${apiKey}`;
// let results;
// let getWeather =  debounce(function () {
//   axios.get(url)
//     .then((response) => {
//       // this.results = response;
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }, 500)
//
// let weatherApp = new function() {
//
// }
//define UI vars
const form = document.querySelector('#city-form');
const cityList = document.querySelector('.collection');
const citySearch = document.querySelector('#citySearch');

//load all event listeners


function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getCities);
  form.addEventListener('submit', addCity);
  cityList.addEventListener('click', removeCity);
}

//get cities from localStorage
function getCities(){
  let cities;
  if(localStorage.getItem('cities') === null){
    cities = [];
  } else {
    cities = JSON.parse(localStorage.getItem('cities'));
  }


  cities.forEach(function(city){
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(city));
    //create new link createElement
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="material-icons">delete</i>';
    //append the link to li
    li.appendChild(link);
    //append li to ul
    cityList.appendChild(li);
  });

}

function addCity(e) {
  if (citySearch.value === '') {
    //change this to toast
    alert("Enter city name");
  } else {
    //create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(citySearch.value));
    //create new link createElement
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="material-icons">delete</i>';
    //append the link to li
    li.appendChild(link);
    //append li to ul
    cityList.appendChild(li);
    // store in localStorage
    storeCityInLocalStorage(citySearch.value);
    //clear input
    citySearch.value = "";
  }
  e.preventDefault();
}

//store city
function storeCityInLocalStorage(city){
  let cities;
  if(localStorage.getItem('cities') === null){
    cities = [];
  } else {
    cities = JSON.parse(localStorage.getItem('cities'));
  }
  cities.push(city);
  localStorage.setItem('cities', JSON.stringify(cities));
}


function removeCityFromLocalStorage(cityItem){
  let cities;
  if(localStorage.getItem('cities') === null){
    cities = [];
  } else {
    cities = JSON.parse(localStorage.getItem('cities'));
  }

  cities.forEach(function(city, index){
    //delete is a name of an icon and idk why (recurrence?) but its appended to city name
    if(cityItem.textContent === city+"delete"){
      cities.splice(index,1);
    }
  });

  localStorage.setItem('cities', JSON.stringify(cities));
}

function removeCity(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
      removeCityFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}



//getWeather();
//console.log(results);
loadEventListeners();
