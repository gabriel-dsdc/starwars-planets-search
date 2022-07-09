const getPlanetsData = () => (
  fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((res) => (res.json()))
    .then((res) => (res))
    .catch((error) => (error))
);

export default getPlanetsData;
