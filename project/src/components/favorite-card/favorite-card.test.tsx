import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { OFFER_TYPES_MAP } from '../../const';
import {fakeStore, makeFakeOffer} from '../../mocks/mocks';
import FavoriteCard from './favorite-card';

describe('Component: FavoriteCard', () => {
  it('Case: rendered correctly', () => {
    const offer = makeFakeOffer();

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
});
