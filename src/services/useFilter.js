function setFilter(setState, filterType, filter) {
  switch (filterType) {
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
  }
}

export default setFilter;
