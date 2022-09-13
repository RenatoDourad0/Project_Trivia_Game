import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import { timeOut } from '../../redux/actions';

describe('Testa Tela de Login', () => {
  test('if Login page reders', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByText('SUA VEZ')).toBeInTheDocument();
  });

  test('if email field is on the screen', () => {
    renderWithRouterAndRedux(<App />, {}, ['/Login']);

    expect(screen.getByTestId(/input-gravatar-email/i)).toBeInTheDocument();
  });

  test('if name field is on the screen', () => {
    renderWithRouterAndRedux(<App />, {}, ['/Login']);

    expect(screen.getByTestId(/input-player-name/i)).toBeInTheDocument();
  });

  test('if play button is on the screen', () => {
    renderWithRouterAndRedux(<App />, {}, ['/Login']);

    expect(screen.getByTestId(/btn-play/i)).toBeInTheDocument();
  });

  test('if button submit is disable', () => {
    renderWithRouterAndRedux(<App />, {}, ['/Login']);

    expect(screen.getByTestId(/btn-play/i)).toBeDisabled();
  });

  test('if correct email and password enables submit button', async () => {
    renderWithRouterAndRedux(<App />, {}, ['/Login']);
    const email = screen.getByTestId(/input-gravatar-email/i);
    const name = screen.getByTestId(/input-player-name/i);
    const playBtn = screen.getByTestId(/btn-play/i);

    expect(playBtn).toBeDisabled();

    userEvent.type(email, 'zeze.decarmago@gmail.com');
    expect(playBtn).toBeDisabled();

    userEvent.type(name, 'Zeze de Camargo');
    expect(playBtn).not.toBeDisabled();
  });

  test('if correct email and name calls function', async () => {
  
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(/input-gravatar-email/i);
    const name = screen.getByTestId(/input-player-name/i);
    const playBtn = screen.getByTestId(/btn-play/i);
    const EMAIL = 'zezedecarmago@gmail.com';

    userEvent.type(email, EMAIL);
    userEvent.type(name, 'Zeze de Camargo');
    userEvent.click(playBtn);
    
    await waitFor(() => {
    const { pathname } = history.location;
    jest.setTimeout(10000);
    expect(pathname).toBe('/game');
    const cat = screen.getByTestId(/question-category/i);

    expect(cat).toBeInTheDocument();

    const btnAnswer = screen.getByTestId(/correct-answer/i);
    expect(btnAnswer).toBeInTheDocument();

    userEvent.click(btnAnswer);
    const btnNext = screen.getByTestId(/btn-next/i);

    userEvent.click(btnNext);

    userEvent.click(btnAnswer);
    userEvent.click(btnNext);

    userEvent.click(btnAnswer);
    userEvent.click(btnNext);

    userEvent.click(btnAnswer);
    userEvent.click(btnNext);

    userEvent.click(btnAnswer);
    userEvent.click(btnNext);

    
    const btnPlayAgain = screen.getByTestId(/btn-play-again/i);
    expect(btnPlayAgain).toBeInTheDocument();

    userEvent.click(btnPlayAgain);
    expect(screen.getByTestId(/input-player-name/i)).toBeInTheDocument();
  });
  });

  test('if settings button click renders settings page', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsBtn = screen.getByTestId(/btn-settings/i);
    
    expect(settingsBtn).toBeInTheDocument();
    userEvent.click(settingsBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });

  test('if correct email and password enables submit button', async () => {
    renderWithRouterAndRedux(<App />, {}, ['/Login']);
    const email = screen.getByTestId(/input-gravatar-email/i);
    const name = screen.getByTestId(/input-player-name/i);
    const playBtn = screen.getByTestId(/btn-play/i);

    expect(playBtn).toBeDisabled();

    userEvent.type(email, 'zeze.decarmago@gmail.com');
    expect(playBtn).toBeDisabled();

    userEvent.type(name, 'Zeze de Camargo');
    expect(playBtn).not.toBeDisabled();
  });

  test('if correct email and name calls function', async () => {
  
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(/input-gravatar-email/i);
    const name = screen.getByTestId(/input-player-name/i);
    const playBtn = screen.getByTestId(/btn-play/i);
    const EMAIL = 'zezedecarmago@gmail.com';

    userEvent.type(email, EMAIL);
    userEvent.type(name, 'Zeze de Camargo');
    userEvent.click(playBtn);
    
    await waitFor(() => {
    // const { pathname } = history.location;
    // timeOut(6000);
    // expect(pathname).toBe('/game');
    const cat = screen.getByTestId(/question-category/i);

    expect(cat).toBeInTheDocument();

    const btnAnswer = screen.getByTestId(/correct-answer/i);
    expect(btnAnswer).toBeInTheDocument();

    userEvent.click(btnAnswer);
    const btnNext = screen.getByTestId(/btn-next/i);

    userEvent.click(btnNext);

    userEvent.click(btnAnswer);
    userEvent.click(btnNext);

    userEvent.click(btnAnswer);
    userEvent.click(btnNext);

    userEvent.click(btnAnswer);
    userEvent.click(btnNext);

    userEvent.click(btnAnswer);
    userEvent.click(btnNext);
    
    // const feedback = screen.getByTestId(/feedback-text/i);
    // expect(screen.getByTestId(feedback)).toBeInTheDocument();
    
    const btnRanking = screen.getByTestId(/btn-ranking/i);
    expect(btnRanking).toBeInTheDocument();
    
    // const rank = screen.getByTestId(/player-score-0/i);
    // expect(screen.getByTestId(rank)).toBeInTheDocument();
    
    userEvent.click(btnRanking);
    expect(screen.getByTestId(/btn-go-home/i)).toBeInTheDocument();

    const btnGoHome = screen.getByTestId(/btn-go-home/i);

    userEvent.click(btnGoHome);

  });

  }); 

  

});
