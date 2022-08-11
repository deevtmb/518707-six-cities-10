import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { OFFER_TYPES_MAP } from '../../const';
import {fakeStore, makeFakeOffer} from '../../mocks/mocks';
import PlaceCard from './place-card';

describe('Component: PlaceCard', () => {
  it('Case: rendered correctly', () => {
    const offer = makeFakeOffer();

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <PlaceCard offer={offer} placeType={''}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(OFFER_TYPES_MAP[offer.type])).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
  });
});
