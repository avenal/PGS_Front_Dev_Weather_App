function capitalize(cityName) {
  const x = cityName.toLowerCase().replace(/\b[a-z](?=[a-z]{2})/g, letter => letter.toUpperCase());
  return x;
}
export { capitalize };
