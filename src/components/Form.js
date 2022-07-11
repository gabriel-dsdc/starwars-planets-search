import React, { useContext, useState } from 'react';
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

  const { setFilter } = useContext(PlanetContext);
  const [formState, setFormState] = useState(INITIAL_STATE);

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

  function setFilterByNumericValues() {
    setFormState({
      ...formState,
      column: formState.columnOptions[0].columnValue,
      columnOptions: formState.columnOptions
        .filter((column) => column.columnValue !== formState.column),
    });
    setFilter('filterByNumericValues', formState);
  }

  return (
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
          {formState.columnOptions.map(({ id, columnValue }) => (
            <option key={ id } value={ columnValue }>{columnValue}</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparison:
        <select data-testid="comparison-filter" id="comparison-filter" name="comparison">
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
    </form>
  );
}

export default Form;
