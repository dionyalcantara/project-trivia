import { fireEvent } from "@testing-library/react";
import { fetchTrivia } from '../redux/actions';
import { createMemoryHistory } from 'history';
import Login from "../pages/Login";
import store from '../redux/store';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Aqui sera testada a tela de login', () => {
  test('testa se existe um input para nome e email', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Login />)

    const InputName = getByTestId('input-player-name');
    expect(InputName).toBeInTheDocument();

    const InputEmail = getByTestId('input-gravatar-email');
    expect(InputEmail).toBeInTheDocument();
  });

  test('testa se todos os botões existem', () => {
    const history = createMemoryHistory();

    const { getByTestId } = renderWithRouterAndRedux(<Login dispatch={ store.dispatch } history={ history } />)
    const handleClick = jest.fn()

    const configBTN = getByTestId('btn-settings');
    configBTN.addEventListener('click', handleClick);
    fireEvent.click(configBTN);
    expect(handleClick).toHaveBeenCalled();
  })

  test('aqui seram executados testes para checar o funcionamento da função handleChange', () => {
    const { getByLabelText } = renderWithRouterAndRedux(<Login />)
    const initalValue = 'Valor inicial';
    const finalValue = 'Valor final';
    const InputName = getByLabelText('Nome');

    fireEvent.change(InputName, {target: {value: initalValue} });
    expect(InputName.value).toBe(initalValue);

    fireEvent.change(InputName, {target: {value: finalValue} });
    expect(InputName.value).toBe(finalValue);
  });

  test('aqui sera testado se o botão de configurações está funcionando corretamente', () => {
    const { getByTestId, store } = renderWithRouterAndRedux(<Login />)
    const nameInput = getByTestId('input-player-name');
    const emailInput = getByTestId('input-gravatar-email');

    fireEvent.change(nameInput, {target: {value: 'test name'}})
    fireEvent.change(emailInput, {target: {value: 'test@mail.com'}})

    const handleClick = jest.fn();
    const playBTN = getByTestId('btn-play');
    playBTN.addEventListener('click', handleClick);
    fireEvent.click(playBTN);
    expect(handleClick).toHaveBeenCalled();
    
    let novoEstado;
    
    const unsub = store.subscribe(() => {
      novoEstado = store.getState();
    })
    
    store.dispatch(fetchTrivia())
    
    unsub();
    
    expect(novoEstado.isFetching).toEqual(true);
  });
});
