import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, OFFER_TYPES_MAP } from '../../const';
import {fakeStore, makeFakeOffer} from '../../mocks/mocks';
import PlaceCard from './place-card';

describe('Component: PlaceCard', () => {
  const offer = makeFakeOffer();

  it('Case: rendered correctly', () => {

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

  it('Case: click on offer title should redirect to "/offer/{id}"', async () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter initialEntries={[AppRoute.Main]}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<PlaceCard offer={offer} placeType={''} />}
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
