/// <reference lib="webworker" />

let cities = [
  { country: 'US', name: 'Austin' },
  { country: 'US', name: 'New York' },
]

function filterCities(country: string) {
  return cities.filter(el => el.country === country).map(el => { return { ...el, name: el.name.toLowerCase() }});
}

addEventListener('message', ({ data }) => {
  const response = { cities: filterCities(data.country) };
  postMessage(response);
});
