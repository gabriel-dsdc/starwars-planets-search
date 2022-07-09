import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Form() {
  const { setFilter } = useContext(PlanetContext);

  function setFilterByName({ target: { value } }) {
    setFilter('filterByName', value);
  }

  return (
    <form>
      <label htmlFor="name-filter">
        Planet Name:&nbsp;
        <input
          data-testid="name-filter"
          id="name-filter"
          placeholder="Tatooine"
          onChange={ setFilterByName }
        />
      </label>
    </form>
  );
}

export default Form;
