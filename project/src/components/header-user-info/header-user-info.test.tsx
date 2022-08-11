import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import {fakeStore} from '../../mocks/mocks';
import HeaderUserInfo from './header-user-info';

describe('Component: HeaderUserInfo', () => {
  const user = {
    email: 'em@i.l',
  };

  it('Case: rendered correctly', () => {

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <HeaderUserInfo />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(user.email)).toBeInTheDocument();
  });

  it('Case: click on User email should redirect to "/favorites"', async () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter initialEntries={[AppRoute.Main]}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<HeaderUserInfo />}
            />
            <Route
              path={AppRoute.Favorites}
              element={<h1>Favorite screen</h1>}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(user.email));

    expect(screen.getByText('Favorite screen')).toBeInTheDocument();
  });
});
