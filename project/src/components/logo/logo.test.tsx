import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Logo from './logo';

describe('Component: Logo', () => {
  it('Case: rendered correctly', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    expect(screen.getByTestId('app-logo')).toBeInTheDocument();
  });

  it('Case: click on Logo should redirect to "/"', async () => {
    render(
      <MemoryRouter initialEntries={[AppRoute.Room]}>
        <Routes>
          <Route
            path={AppRoute.Room}
            element={<Logo />}
          />
          <Route
            path={AppRoute.Main}
            element={<h1>Main Screen</h1>}
          />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText('Main Screen')).toBeInTheDocument();
  });
});
