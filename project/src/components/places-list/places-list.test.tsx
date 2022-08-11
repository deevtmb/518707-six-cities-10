import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import {fakeStore, makeFakeOffers} from '../../mocks/mocks';
import PlacesList from './places-list';

describe('Component: PlacesList', () => {
  it('Case: rendered correctly', () => {
    const offers = makeFakeOffers();

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <PlacesList offersList={offers} placesType={''} />
        </MemoryRouter>
      </Provider>
    );

    offers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });
});
