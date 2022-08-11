import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { fakeStore } from '../../mocks/mocks';
import LoginScreen from './login-screen';

describe('Component: LoginScreen', () => {
  it('Case: rendered correctly', async () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );

    const [title, button] = screen.getAllByText('Sign in');

    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('email'), 'em@i.l');
    await userEvent.type(screen.getByTestId('password'), '12345');

    expect(screen.getByDisplayValue(/em@i.l/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/12345/i)).toBeInTheDocument();
  });

  it('Case: click on City should redirect to "/"', async () => {
    const mockStore = configureMockStore();
    render(
      <Provider store={mockStore({USER: {authorizationStatus: AuthorizationStatus.NotAuthorized}})}>
        <MemoryRouter initialEntries={[AppRoute.Login]}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<LoginScreen />}
            />
            <Route
              path={AppRoute.Main}
              element={<h1>Main Screen</h1>}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('city-link'));

    expect(screen.getByText('Main Screen')).toBeInTheDocument();
  });
});
