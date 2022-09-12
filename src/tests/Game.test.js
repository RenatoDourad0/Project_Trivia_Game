import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import questionsResponse from '../../cypress/mocks/questions';

describe('Desenvolva testes para atingir 90% de cobertura da tela', () => {
  const mockData = {"response_code":0,"response_message":"Token Generated Successfully!","token":"INVALID_TOKEN"}
  const mockToken = {"response_code":0,"response_message":"Token Generated Successfully!","token":"524564f2cb1120b12ce344fd68c52bb54118e74dccb35175f5379127bf923440"}
  const initialState = {
    loginReducer: {
      name: '',
      email: '',
      token: '',
    },
    gameReducer: {
      currentQuestion: 1,
      timer: false,
    },
    player:{
      assertions: 0,
      score: 0,
    },
  }
  afterAll(() => jest.restoreAllMocks());
  test('Verifica se o gravatar e o nome são renderizados na tela de feedback', async () => {
  
        const { history } = renderWithRouterAndRedux(<App />);

        const gravatar = screen.getByTestId(/input-gravatar-email/i)
        const name = screen.getByTestId(/input-player-name/i)
        const playBtn = screen.getByTestId(/btn-play/i);

        userEvent.type(gravatar, 'email@email.com');
        userEvent.type(name, 'alguem');
        userEvent.click(playBtn);

        await waitFor(() => {
        expect(history.location.pathname).toBe('/game');
        const img = screen.getByTestId(/header-profile-picture/i);

        expect(screen.getByTestId(/header-player-name/i)).toBeInTheDocument();
        expect(img).toBeInTheDocument();
        });

        await waitFor(() => {
          const btn = screen.getByTestId(/correct-answer/i);
          expect(btn).toBeInTheDocument();
          userEvent.click(btn);
          const nextBtn = screen.getByTestId(/btn-next/i)
          expect(nextBtn).toBeInTheDocument();
        });
    });

    test('Verifica se retorna para home, quando token é inválido', () => {
      jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mockData).mockResolvedValueOnce(questionsResponse),
    });

    const { history, store } = renderWithRouterAndRedux(<App />, initialState);
    const gravatar = screen.getByTestId(/input-gravatar-email/i)
        const name = screen.getByTestId(/input-player-name/i)
        const playBtn = screen.getByTestId(/btn-play/i);

        userEvent.type(gravatar, 'email@email.com');
        userEvent.type(name, 'alguem');
        userEvent.click(playBtn);
    

    expect(store.getState().loginReducer.token).not.toBe(localStorage.getItem('token'));
    expect(history.location.pathname).toBe('/');
    });

    test('Verifica se o token vem correto', async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(mockToken).mockResolvedValueOnce(questionsResponse.results),
      });

      const { history, store } = renderWithRouterAndRedux(<App />, initialState);
      const gravatar = screen.getByTestId(/input-gravatar-email/i)
          const name = screen.getByTestId(/input-player-name/i)
          const playBtn = screen.getByTestId(/btn-play/i);
  
          userEvent.type(gravatar, 'email@email.com');
          userEvent.type(name, 'alguem');
          userEvent.click(playBtn);

        await waitFor(() => {
        // expect(screen.getByTestId(/question-category/i)).toHaveTextContent();
        expect(global.fetch).toHaveBeenCalled();
          });
    })
})