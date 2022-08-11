import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, OFFER_TYPES_MAP } from '../../const';
import {fakeStore, makeFakeOffer} from '../../mocks/mocks';
import userEvent from '@testing-library/user-event';
import FavoriteCard from './favorite-card';

describe('Component: FavoriteCard', () => {
  const offer = makeFakeOffer();

  it('Case: rendered correctly', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <FavoriteCard offer={offer}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(OFFER_TYPES_MAP[offer.type])).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
  });

  it('Case: click on offer title should redirect to "/offer/{id}"', async () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter initialEntries={[AppRoute.Favorites]}>
          <Routes>
            <Route
              path={AppRoute.Favorites}
              element={<FavoriteCard offer={offer} />}
            />
            <Route
              path={AppRoute.Room}
              element={<h1>Property screen</h1>}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(offer.title));

    expect(screen.getByText('Property screen')).toBeInTheDocument();
  });
});
