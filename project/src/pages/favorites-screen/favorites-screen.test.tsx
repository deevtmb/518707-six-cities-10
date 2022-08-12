import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { fakeStore } from '../../mocks/mocks';
import { createAPI } from '../../services/api';
import FavoritesScreen from './favorites-screen';

describe('Component: Favorite screen', () => {
  it('Case: rendered correctly with Favorite offers', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <FavoritesScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });


  it('Case: rendered correctly without Favorite offers', () => {
    const api = createAPI();
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore(middlewares);

    render(
      <Provider store={mockStore({
        USER: {authorizationStatus: AuthorizationStatus.Authorized},
        OFFERS_DATA: {favoriteOffers: []}})}
      >
        <MemoryRouter>
          <FavoritesScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
