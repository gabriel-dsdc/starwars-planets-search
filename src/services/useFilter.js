function setFilter(setState, filterType, value) {
  switch (filterType) {
  case 'filterByName':
    setState((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        filterByName: {
          name: value,
        },
      },
    }));
    break;
  default:
    break;
  }
}

export default setFilter;
