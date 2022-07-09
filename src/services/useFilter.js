function setFilter(setState, filterType, filter) {
  switch (filterType) {
  case 'filterByName':
    setState((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        filterByName: {
          name: filter,
        },
      },
    }));
    break;
  case 'filterByNumericValues': {
    const { column, comparison, value } = filter;

    setState((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        filterByNumericValues: [
          ...prevState.filters.filterByNumericValues,
          {
            column,
            comparison,
            value,
          }],
      },
    }));
    break; }
  default:
    break;
  }
}

export default setFilter;
