import React, { Fragment, useContext, useEffect, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function Form() {
  const INITIAL_STATE = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
    columnOptions: [
      { id: 0, columnValue: 'population' },
      { id: 1, columnValue: 'orbital_period' },
      { id: 2, columnValue: 'rotation_period' },
      { id: 3, columnValue: 'diameter' },
      { id: 4, columnValue: 'surface_water' },
    ],
    order: {
      column: 'population',
      sort: 'ASC',
    },
  };

  const { filters: { filterByNumericValues },
    setFilter, setOrder } = useContext(PlanetContext);
  const [formState, setFormState] = useState(INITIAL_STATE);

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      column: formState.columnOptions[0]?.columnValue,
    }));
  }, [formState.columnOptions]);

  function handleForm({ target: { name, value, id } }) {
    if (id === 'column-sort'
    || id === 'column-sort-input-asc'
    || id === 'column-sort-input-desc') {
      setFormState({
        ...formState,
        order: {
          ...formState.order,
          [name]: value,
        },
      });
    } else if (name) {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  }

  function setFilterByName({ target: { value } }) {
    setFilter('filterByName', value);
  }

  async function setFilterByNumericValues() {
    setFormState({
      ...formState,
      columnOptions: formState.columnOptions
        .filter((column) => column.columnValue !== formState.column),
    });
    if (formState.column) setFilter('filterByNumericValues', formState);
  }

  function setOrderByColumn() {
    setOrder(formState.order);
  }

  function handleRemove({ target: { name } }) {
    setFilter('removeNumericValueFilter', name.split('--')[1]);
  }

  function handleRemoveAll() {
    setFilter('removeAllFilters');
  }

  return (
    <>
      <form onChange={ handleForm }>
        <label htmlFor="name-filter">
          Planet Name:
          <input
            data-testid="name-filter"
            id="name-filter"
            type="text"
            placeholder="Tatooine"
            onChange={ setFilterByName }
          />
        </label>
        <label htmlFor="column-filter">
          Column:
          <select data-testid="column-filter" id="column-filter" name="column">
            {formState.columnOptions[0]
            && formState.columnOptions.map(({ id, columnValue }) => (
              <option key={ id } value={ columnValue }>{columnValue}</option>))}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Comparison:
          <select
            data-testid="comparison-filter"
            id="comparison-filter"
            name="comparison"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          Value:
          <input
            data-testid="value-filter"
            id="value-filter"
            name="value"
            type="number"
            defaultValue={ formState.value }
            onFocus={ ({ target }) => target.select() }
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ setFilterByNumericValues }
        >
          FILTER
        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ handleRemoveAll }
        >
          REMOVE FILTERS
        </button>
        <label htmlFor="column-sort">
          Sort:
          <select data-testid="column-sort" id="column-sort" name="column">
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <div id="sort-input-container">
          <label htmlFor="column-sort-input-asc">
            Ascending
            <input
              data-testid="column-sort-input-asc"
              type="radio"
              value="ASC"
              id="column-sort-input-asc"
              name="sort"
            />
          </label>
          <label htmlFor="column-sort-input-desc">
            Descending
            <input
              data-testid="column-sort-input-desc"
              type="radio"
              value="DESC"
              id="column-sort-input-desc"
              name="sort"
            />
          </label>
        </div>
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ setOrderByColumn }
        >
          ORDER
        </button>
      </form>
      {filterByNumericValues[0]
      && filterByNumericValues.map(({ column, comparison, value }) => (
        <Fragment key={ column }>
          <br />
          <span data-testid="filter">
            {`${column} ${comparison} ${value} `}
            <button
              type="button"
              name={ `btn-remove--${column}` }
              onClick={ handleRemove }
            >
              REMOVE FILTER
            </button>
          </span>
          <br />
        </Fragment>
      ))}
    </>
  );
}

export default Form;
