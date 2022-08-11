import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import HeaderLogin from './header-login';

describe('Component: HeaderLogin', () => {
  it('Case: rendered correctly', () => {
    render(
      <MemoryRouter>
        <HeaderLogin />
      </MemoryRouter>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('Case: click on Sign in should redirect to "/login"', async () => {
    render(
      <MemoryRouter initialEntries={[AppRoute.Main]}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<HeaderLogin />}
          />
          <Route
            path={AppRoute.Login}
            element={<h1>Login screen</h1>}
          />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByText(/Sign in/i));

    expect(screen.getByText('Login screen')).toBeInTheDocument();
  });
});
