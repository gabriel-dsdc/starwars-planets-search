import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function Form() {
  const INITIAL_STATE = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
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
    setFilter('filterByNumericValues', formState);
  }

  return (
    <form onChange={ handleForm }>
      <label htmlFor="name-filter">
        Planet Name:&nbsp;
        <input
          data-testid="name-filter"
          id="name-filter"
          type="text"
          placeholder="Tatooine"
          onChange={ setFilterByName }
        />
      </label>
      <label htmlFor="column-filter">
        Coluna:&nbsp;
        <select data-testid="column-filter" id="column-filter" name="column">
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="rotation_period">rotation_period</option>
          <option value="diameter">diameter</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparison:&nbsp;
        <select data-testid="comparison-filter" id="comparison-filter" name="comparison">
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Value:&nbsp;
        <input
          data-testid="value-filter"
          id="value-filter"
          name="value"
          type="number"
          defaultValue={ formState.value }
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
