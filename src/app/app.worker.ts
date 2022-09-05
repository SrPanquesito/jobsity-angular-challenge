/// <reference lib="webworker" />
import citiesJson from 'cities.json';

function filterCities(country: string) {
  let cities = JSON.parse(JSON.stringify(citiesJson));
  return cities.filter(el => el.country === country).map(el => { return { ...el, name: el.name.toLowerCase() }});
}

addEventListener('message', ({ data }) => {
  const response = { cities: filterCities(data.country) };
  postMessage(response);
});
