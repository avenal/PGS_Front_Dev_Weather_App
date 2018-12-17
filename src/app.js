
import axios from 'axios';
import debounce from 'lodash.debounce';


const apiKey = process.env.KEY;
const city = document.querySelector("#searchInput").value;
let cityTest = 'Warsaw'
const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityTest}&APPID=${apiKey}`;
let results;
let getWeather =  debounce(function () {
  axios.get(url)
    .then((response) => {
      // this.results = response;
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, 500)
getWeather();
//console.log(results);
