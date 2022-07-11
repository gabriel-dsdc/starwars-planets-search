import React from 'react';
import './App.css';
import Form from './components/Form';
import Table from './components/Table';
import PlanetProvider from './context/PlanetProvider';
import Logo from './logo.png';

function App() {
  return (
    <PlanetProvider>
      <img className="logo" src={ Logo } alt="Planets Search Logo" />
      <p className="logo--text">PLANETS SEARCH</p>
      <div>
        <Form />
        <Table />
      </div>
    </PlanetProvider>
  );
}

export default App;
