import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import getPlanetsData from '../services/api';
import setFilter from '../services/useFilter';

const INITIAL_STATE = {
  data: [{
    name: '',
    rotationPeriod: '',
    orbital_period: '',
    diameter: '',
    climate: '',
    gravity: '',
    terrain: '',
    surface_water: '',
    population: '',
    films: [],
    created: '',
    edited: '',
    url: '',
  }],
  filters: {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  },
  setFilter: undefined,
};

function PlanetProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);
  useEffect(() => {
    getPlanetsData().then((api) => {
      const planets = api.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setState((prevState) => (
        {
          ...prevState,
          data: planets,
          setFilter: (filterType, value) => { setFilter(setState, filterType, value); },
        }));
    });
  }, []);

  return (
    <PlanetContext.Provider value={ state }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
