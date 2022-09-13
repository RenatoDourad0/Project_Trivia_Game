import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import { questionsResponse } from '../../../cypress/mocks/questions'

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

describe('Desenvolva testes para atingir 90% de cobertura da tela', () => {
  beforeEach(()=>{
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));
  })
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
      json: jest.fn().mockResolvedValueOnce(mockData).mockResolvedValueOnce(questionsResponse.results),
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

        ///await waitFor(() => {
        // expect(screen.getByTestId(/question-category/i)).toHaveTextContent();
        // expect(global.fetch).toHaveBeenCalled();
        
        // const feedback = screen.getByTestId(/feedback-text/i);
        // expect(screen.getByTestId(feedback)).toBeInTheDocument();
          });
    })

    test('Verifica se feedback esta na tela', async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(mockToken).mockResolvedValue(questionsResponse.results),
      });

      const { history, store } = renderWithRouterAndRedux(<App />, initialState);
      const gravatar = screen.getByTestId(/input-gravatar-email/i)
          const name = screen.getByTestId(/input-player-name/i)
          const playBtn = screen.getByTestId(/btn-play/i);
  
          userEvent.type(gravatar, 'email@email.com');
          userEvent.type(name, 'alguem');
          userEvent.click(playBtn);

          jest.setTimeout(700000)
          expect(global.fetch).toHaveBeenCalled();
            // expect(history.location.pathname).toBe('/game');
    
         
            const btnAnswer = screen.getByTestId(/correct-answer/i);
            expect(btnAnswer).toBeInTheDocument();

      // const timer1 = await screen.findByTestId('timer');
      // expect(timer1).toBeInTheDocument();
      jest.setTimeout(70000000)
      userEvent.click(btnAnswer);

      const headerScore1 = screen.getByTestId(/header-score/i);
      expect(headerScore1).toHaveTextContent(40);

      const nextButton1 = await screen.findByTestId('btn-next');
      expect(nextButton1).toBeInTheDocument();

      userEvent.click(nextButton1);

      const correctAnswer2 = await screen.findByTestId('correct-answer');
      expect(correctAnswer2).toBeInTheDocument();

      const timer2 = await screen.findByTestId('timer');
      expect(timer2).toBeInTheDocument();

      userEvent.click(correctAnswer2);

      const nextButton2 = await screen.findByTestId('btn-next');
      expect(nextButton2).toBeInTheDocument();

      userEvent.click(nextButton2);

      const correctAnswer3 = await screen.findByTestId('correct-answer');
      expect(correctAnswer3).toBeInTheDocument();

      const timer3 = await screen.findByTestId('timer');
      expect(timer3).toBeInTheDocument();

      userEvent.click(correctAnswer3);

      const nextButton3 = await screen.findByTestId('btn-next');
      expect(nextButton3).toBeInTheDocument();

      userEvent.click(nextButton3);

      const correctAnswer4 = await screen.findByTestId('correct-answer');
      expect(correctAnswer4).toBeInTheDocument();

      const timer4 = await screen.findByTestId('timer');
      expect(timer4).toBeInTheDocument();

      userEvent.click(correctAnswer4);

      const nextButton4 = await screen.findByTestId('btn-next');
      expect(nextButton4).toBeInTheDocument();

      userEvent.click(nextButton4);

      const correctAnswer5 = await screen.findByTestId('correct-answer');
      expect(correctAnswer5).toBeInTheDocument();

      const timer5 = await screen.findByTestId('timer');
      expect(timer5).toBeInTheDocument();

      userEvent.click(correctAnswer5);

      const nextButton5 = await screen.findByTestId('btn-next');
      expect(nextButton5).toBeInTheDocument();

      userEvent.click(nextButton5);

      expect(history.location.pathname).toBe('/feedback')

          // const btnAnswer = screen.getByTestId(/correct-answer/i);
          
          // await waitFor(() => {
          // userEvent.click(btnAnswer);
          // const btnNext = screen.getByTestId(/btn-next/i);
      
          // userEvent.click(btnNext);
      
          // userEvent.click(btnAnswer);
          // userEvent.click(btnNext);
      
          // userEvent.click(btnAnswer);
          // userEvent.click(btnNext);
      
          // userEvent.click(btnAnswer);
          // userEvent.click(btnNext);
      
          // userEvent.click(btnAnswer);
          // userEvent.click(btnNext);
        
          // const feedback = screen.getByTestId(/feedback-text/i);
          // expect(screen.getByTestId(feedback)).toBeInTheDocument();
        });
    
    
