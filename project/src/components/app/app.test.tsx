import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeOffer, makeFakeOffers, makeFakeReviews } from '../../mocks/mocks';
import thunk from 'redux-thunk';
import App from './app';
import { createAPI } from '../../services/api';

const DEFAULT_CITY = 'Paris';
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore(middlewares);
const offers = makeFakeOffers();

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Authorized,
    user: {
      avatarUrl: 'string',
      email: 'em@a.il',
      id: 0,
      isPro: true,
      name: 'Max',
      token: 'token',
    }
  },
  OFFERS_DATA: {
    city: DEFAULT_CITY,
    offers: offers,
    currentOfferInfo: makeFakeOffer(),
    nearbyOffers: makeFakeOffers(),
    favoriteOffers: makeFakeOffers(),
    isDataLoading: false,
    isDataLoadingError: false,
  },
  REVIEWS_DATA: {
    reviews: makeFakeReviews(),
  },
});

const fakeApp = (route: string) => (
  <Provider store={store}>
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  </Provider>
);

describe('Test: App Routing', () => {
  it('Case: render main screen by route "/"', () => {
    render(fakeApp(AppRoute.Main));

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
  });

  it('Case: render offer screen by route "/offer/{id}"', () => {
    render(fakeApp(`${AppRoute.Offer}${1}`));

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
  });

  it('Case: render favorites screen by route "/favorite"', () => {
    render(fakeApp(AppRoute.Favorites));

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('Case: render not-found screen by route "/wrong/route"', () => {
    const wrongRoute = '/wrong/route';
    render(fakeApp(wrongRoute));

    expect(screen.getByText(/404/)).toBeInTheDocument();
    expect(screen.getByText(/Return to Main page/i)).toBeInTheDocument();
  });
});
