function removeCityFromLocalStorage(cityItem) {
  let cities;
  if (localStorage.getItem('cities') === null) {
    cities = [];
  } else {
    cities = JSON.parse(localStorage.getItem('cities'));
  }
  cities.forEach((city, index) => {
    // delete is a name of an icon and idk why (recurrence?) but its appended to city name
    if (cityItem.firstChild.textContent === city) {
      cities.splice(index, 1);
    }
  });
  localStorage.setItem('cities', JSON.stringify(cities));
}
export {
  removeCityFromLocalStorage,
};
