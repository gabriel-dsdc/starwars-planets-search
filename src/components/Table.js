import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import setFilterByNumericValues from '../services/setFilterByNumericValues';
import { setOrderByColumn, sortAlphabetically } from '../services/setOrderByColumn';

function Table() {
  const {
    data,
    filters: { filterByName, filterByNumericValues, order },
  } = useContext(PlanetContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {data.reduce((acc) => {
          acc = acc.filter((accPlanet) => accPlanet.name.includes(filterByName.name));
          if (order.column) {
            setOrderByColumn(acc, order);
          } else {
            sortAlphabetically(acc);
          }
          acc = setFilterByNumericValues(acc, filterByNumericValues);
          return acc;
        }, [...data])
          .map(({
            name, rotation_period: rotationPeriod, orbital_period: orbitalPeriod,
            diameter, climate, gravity, terrain, surface_water: surfaceWater, population,
            films, created, edited, url,
          }) => (
            <tr key={ name }>
              <td data-testid="planet-name">{name}</td>
              <td>{rotationPeriod}</td>
              <td>{orbitalPeriod}</td>
              <td>{diameter}</td>
              <td>{climate}</td>
              <td>{gravity}</td>
              <td>{terrain}</td>
              <td>{surfaceWater}</td>
              <td>{population}</td>
              <td>{films.reduce((acc, film) => (acc + film), '')}</td>
              <td>{created}</td>
              <td>{edited}</td>
              <td>{url}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
