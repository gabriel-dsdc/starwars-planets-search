export function setFilter(setState, filterType, filter) {
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
  case 'removeNumericValueFilter':
    setState((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        filterByNumericValues: prevState.filters.filterByNumericValues
          .filter((numericValueFilter) => numericValueFilter.column !== filter),
      },
    }));
    break;
  case 'removeAllFilters':
    setState((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        filterByNumericValues: [],
      },
    }));
    break;
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

export function setOrder(setState, order) {
  setState((prevState) => ({
    ...prevState,
    filters: {
      ...prevState.filters,
      order,
    },
  }));
}
