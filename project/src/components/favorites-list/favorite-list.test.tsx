import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import {fakeStore, makeFakeOffers} from '../../mocks/mocks';
import FavoritesList from './favorites-list';

describe('Component: FavoriteList', () => {
  it('Case: rendered correctly', () => {
    const offers = makeFakeOffers();

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <FavoritesList favoriteOffers={offers}/>
        </MemoryRouter>
      </Provider>
    );

    offers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });
});
