import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const mockData = {"response_code":0,"response_message":"Token Generated Successfully!","token":"524564f2cb1120b12ce344fd68c52bb54118e74dccb35175f5379127bf923440"}
afterAll(() => jest.clearAllMocks());

describe('Testa Tela de Login', () => {
  test('if Login page reders', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByText('SUA VEZ')).toBeInTheDocument();
  });

  test('if email field is on the screen', () => {
    renderWithRouterAndRedux(<App />, ['/Login']);

    expect(screen.getByTestId(/input-gravatar-email/i)).toBeInTheDocument();
  });

  test('if name field is on the screen', () => {
    renderWithRouterAndRedux(<App />, ['/Login']);

    expect(screen.getByTestId(/input-player-name/i)).toBeInTheDocument();
  });

  test('if play button is on the screen', () => {
    renderWithRouterAndRedux(<App />, ['/Login']);

    expect(screen.getByTestId(/btn-play/i)).toBeInTheDocument();
  });

  test('if button submit is disable', () => {
    renderWithRouterAndRedux(<App />, ['/Login']);

    expect(screen.getByTestId(/btn-play/i)).toBeDisabled();
  });

  test('if correct email and password enables submit button', async () => {
    renderWithRouterAndRedux(<App />, ['/Login']);
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

    const API = 'https://opentdb.com/api_token.php?command=request';
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
    expect(pathname).toBe('/game');
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

});
