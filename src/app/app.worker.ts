/// <reference lib="webworker" />

let cities = [
  { country: 'US', name: 'New York', state: 'New York' },
  { country: 'US', name: 'Los Angeles', state: 'California' },
  { country: 'US', name: 'Chicago', state: 'Illinois' },
  { country: 'US', name: 'Houston', state: 'Texas' },
  { country: 'US', name: 'Phoenix', state: 'Arizona' },
  { country: 'US', name: 'Philadelphia', state: 'Pennsylvania' },
  { country: 'US', name: 'San Antonio', state: 'Texas' },
  { country: 'US', name: 'San Diego', state: 'California' },
  { country: 'US', name: 'Dallas', state: 'Texas' },
  { country: 'US', name: 'San Jose', state: 'California' },
  { country: 'US', name: 'Austin', state: 'Texas' },
  { country: 'US', name: 'Jacksonville', state: 'Florida' },
  { country: 'US', name: 'Fort Worth', state: 'Texas' },
  { country: 'US', name: 'Columbus', state: 'Ohio' },
  { country: 'US', name: 'Indianapolis', state: 'Indiana' },
  { country: 'US', name: 'Charlotte', state: 'North Carolina' },
  { country: 'US', name: 'San Francisco', state: 'California' },
  { country: 'US', name: 'Seattle', state: 'Washington' },
  { country: 'US', name: 'Denver', state: 'Colorado' },
  { country: 'US', name: 'Oklahoma City', state: 'Oklahoma' },
]

function filterCities(country: string) {
  return cities.filter(el => el.country === country).map(el => { return { ...el, name: el.name.toLowerCase() }});
}

addEventListener('message', ({ data }) => {
  const response = { cities: filterCities(data.country) };
  postMessage(response);
});
