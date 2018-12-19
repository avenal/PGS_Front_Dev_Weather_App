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
export { storeCityInLocalStorage };
