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
  };

  const { filters: { filterByNumericValues }, setFilter } = useContext(PlanetContext);
  const [formState, setFormState] = useState(INITIAL_STATE);

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      column: formState.columnOptions[0]?.columnValue,
    }));
  }, [formState.columnOptions]);

  function handleForm({ target: { name, value } }) {
    if (name) {
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
          Coluna:
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
          FILTRAR
        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ handleRemoveAll }
        >
          REMOVER FILTROS
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
              REMOVER FILTRO
            </button>
          </span>
          <br />
        </Fragment>
      ))}
    </>
  );
}

export default Form;
