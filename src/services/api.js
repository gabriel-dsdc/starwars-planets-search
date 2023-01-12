const getPlanetsData = () => (
  fetch('https://swapi.dev/api/planets/')
    .then((res) => (res.json()))
    .then((res) => (res))
);

export default getPlanetsData;
