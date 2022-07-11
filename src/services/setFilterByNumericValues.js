function setFilterByNumericValues(acc, filterByNumericValues) {
  for (let i = 0; i < filterByNumericValues.length; i += 1) {
    const planetKey = filterByNumericValues[i].column;
    const filterValue = Number(filterByNumericValues[i].value);

    switch (filterByNumericValues[i].comparison) {
    case 'maior que':
      acc = acc.filter((accPlanet) => Number(accPlanet[planetKey]) > filterValue);
      break;
    case 'menor que':
      acc = acc.filter((accPlanet) => Number(accPlanet[planetKey]) < filterValue);
      break;
    default:
      acc = acc
        .filter((accPlanet) => Number(accPlanet[planetKey]) === filterValue);
      break;
    }
  }
  return acc;
}

export default setFilterByNumericValues;
