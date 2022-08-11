import {Routes, Route, MemoryRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from './private-route';
import { fakeStore } from '../../mocks/mocks';

const mockStore = configureMockStore();

describe('Component: PrivateRouter', () => {
  it('Case: user not authorized - render Public route', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NotAuthorized},
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoute>
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('Case: user authorized - render Private route', () => {
    const store = fakeStore;

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoute>
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
