import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';
import { act } from 'react-dom/test-utils';

const promise = Promise.resolve(testData);

let logoEl;
let inputPlanetNameEl;
let selectColumnEl;
let selectComparisonEl;
let inputValueEl;
let filterBtnEl;
let orderBtnEl;

let allTableColumns;

let firstPlanetName;
let lastPlanetName;

const PLANET_NAME = 'oo';
const PLANET_COLUMN_DIAMETER = 'diameter';
const PLANET_COLUMN_SURFACE_WATER = 'surface_water';
const PLANET_COMPARISON_MAIOR = 'maior que';
const PLANET_COMPARISON_MENOR = 'menor que';
const PLANET_COMPARISON_IGUAL = 'igual a';
const PLANET_POPULATION_VALUE = "300000";
const PLANET_DIAMETER_VALUE = "11000";
const PLANET_SURFACE_WATER_VALUE = "8";

describe('Teste de formulário', () => {
  beforeEach( async () => {    
    jest.spyOn(global, 'fetch').mockResolvedValue({json: () => promise});
    render(<App />);
    await act(async () => {await promise});

    logoEl = screen.getByRole('img', {  name: /planets search logo/i});
    inputPlanetNameEl = screen.getByRole('textbox', {name: /planet name:/i});
    selectColumnEl = screen.getByRole('combobox', {  name: /column:/i});
    selectComparisonEl = screen.getByRole('combobox', {  name: /comparison:/i});
    inputValueEl = screen.getByRole('spinbutton', {  name: /value:/i});
    filterBtnEl = screen.getByRole('button', {  name: /^filter$/i});
    orderBtnEl = screen.getByRole('button', {  name: /order/i});

    allTableColumns = screen.getAllByRole('columnheader');

    firstPlanetName = screen.getAllByRole('cell')[0];
    lastPlanetName = screen.getAllByRole('cell')[117];
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Verifica se tudo está na tela', () => {
    expect(logoEl).toBeInTheDocument();
    expect(inputPlanetNameEl).toBeInTheDocument();
    expect(selectColumnEl).toBeInTheDocument();
    expect(selectComparisonEl).toBeInTheDocument();
    expect(inputValueEl).toBeInTheDocument();
    expect(filterBtnEl).toBeInTheDocument();

    let allTableRows = screen.getAllByRole('row');
    expect(allTableColumns).toHaveLength(13);
    expect(allTableRows).toHaveLength(11);

    expect(inputPlanetNameEl).toHaveValue("");
    expect(selectColumnEl).toHaveValue("population");
    expect(selectComparisonEl).toHaveValue("maior que");
    expect(inputValueEl).toHaveValue(0);
  });

  test('Testa o filtro por nome', () => {
    userEvent.type(inputPlanetNameEl, PLANET_NAME);
    expect(inputPlanetNameEl).toHaveValue(PLANET_NAME);

    let allTableRows = screen.getAllByRole('row');
    expect(allTableRows).toHaveLength(3);
  });

  test('Teste o filtro de população maior que 300000', async () => {
    userEvent.selectOptions(selectComparisonEl, PLANET_COMPARISON_MAIOR);
    userEvent.clear(inputValueEl);
    userEvent.type(inputValueEl, PLANET_POPULATION_VALUE);
    userEvent.click(filterBtnEl);

    let allTableRows = screen.getAllByRole('row');
    expect(allTableRows).toHaveLength(7);
  });

  test('Teste o filtro de águas superficiais igual a 8', async () => {
    userEvent.selectOptions(selectColumnEl, PLANET_COLUMN_SURFACE_WATER);
    userEvent.selectOptions(selectComparisonEl, PLANET_COMPARISON_IGUAL);
    userEvent.clear(inputValueEl);
    userEvent.type(inputValueEl, PLANET_SURFACE_WATER_VALUE);
    userEvent.click(filterBtnEl);

    let allTableRows = screen.getAllByRole('row');
    expect(allTableRows).toHaveLength(4);
  });
  
  test('Testa o formulário e filtro', () => {
    userEvent.type(inputPlanetNameEl, PLANET_NAME);
    let allTableRows = screen.getAllByRole('row');
    expect(allTableRows).toHaveLength(3);
    
    userEvent.selectOptions(selectColumnEl, PLANET_COLUMN_DIAMETER);
    userEvent.selectOptions(selectComparisonEl, PLANET_COMPARISON_MENOR);
    userEvent.clear(inputValueEl);
    userEvent.type(inputValueEl, PLANET_DIAMETER_VALUE);

    expect(inputPlanetNameEl).toHaveValue(PLANET_NAME);
    expect(selectColumnEl).toHaveValue(PLANET_COLUMN_DIAMETER);
    expect(selectComparisonEl).toHaveValue(PLANET_COMPARISON_MENOR);
    expect(inputValueEl).toHaveValue(Number(PLANET_DIAMETER_VALUE));

    userEvent.click(filterBtnEl);
    allTableRows = screen.getAllByRole('row');
    expect(allTableRows).toHaveLength(2);
  });

  test('Testa o botão de remover um filtro adicionado', () => {
    userEvent.click(filterBtnEl);
    const populationFilterEl = screen.getByText(/population maior que 0/i);
    const removePopulationFilterBtnEl = within(populationFilterEl).getByRole('button', {  name: /remove filter/i});
    expect(populationFilterEl).toBeInTheDocument();
    expect(removePopulationFilterBtnEl).toBeInTheDocument();

    userEvent.click(removePopulationFilterBtnEl);

    expect(populationFilterEl).not.toBeInTheDocument();
  });

  test('Testa o botão de remover todos os filtros', () => {
    userEvent.click(filterBtnEl);
    userEvent.click(filterBtnEl);
    userEvent.click(filterBtnEl);
    userEvent.click(filterBtnEl);
    userEvent.click(filterBtnEl);
    
    expect(screen.getAllByRole('button', {name: /^remove filter$/i})).toHaveLength(5);
    userEvent.click(filterBtnEl);
    expect(screen.getAllByRole('button', {name: /^remove filter$/i})).toHaveLength(5);

    const orbitalPeriodFilterEl = screen.getByText(/orbital_period maior que 0/i);
    expect(orbitalPeriodFilterEl).toBeInTheDocument();

    const removeAllFiltersBtnEl = screen.getByRole('button', {  name: /remove filters/i});
    userEvent.click(removeAllFiltersBtnEl);

    expect(orbitalPeriodFilterEl).not.toBeInTheDocument();
  });

  test('Verifica se começa ordenado alfabeticamente e depois testa a ordenação de população ascendente', () => {
    expect(firstPlanetName).toHaveAccessibleName(/Alderaan/i);
    expect(lastPlanetName).toHaveAccessibleName(/Yavin IV/i);
    userEvent.click(orderBtnEl);

    firstPlanetName = screen.getAllByRole('cell')[0];
    lastPlanetName = screen.getAllByRole('cell')[117];
    expect(firstPlanetName).toHaveAccessibleName(/Yavin IV/i);
    expect(lastPlanetName).toHaveAccessibleName(/Dagobah/i);
  });

  test('Testa a ordenação de população descendente', () => {
    const selectSortEl = screen.getByRole('combobox', {  name: /sort:/i});
    const descRadioBtnEl = screen.getByRole('radio', {  name: /descending/i});

    expect(selectSortEl).toHaveValue('population');
    userEvent.selectOptions(selectSortEl, 'surface_water');
    userEvent.click(descRadioBtnEl);
    expect(descRadioBtnEl).toBeChecked();
    userEvent.click(orderBtnEl);

    firstPlanetName = screen.getAllByRole('cell')[0];
    lastPlanetName = screen.getAllByRole('cell')[117]
    expect(firstPlanetName).toHaveAccessibleName(/Hoth/i);
    expect(lastPlanetName).toHaveAccessibleName(/Coruscant/i);
  });
});
