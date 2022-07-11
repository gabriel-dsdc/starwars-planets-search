const getPlanetsData = () => (
  fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((res) => (res.json()))
    .then((res) => (res))
);

export default getPlanetsData;
