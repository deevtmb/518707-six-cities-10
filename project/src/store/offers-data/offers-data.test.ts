import { makeFakeOffer, makeFakeOffers } from '../../mocks/mocks';
import { Offer } from '../../types/offer';
import { OffersData } from '../../types/state';
import { fetchFavoriteOffersAction, fetchNearbyOffersAction, fetchOfferInfoAction, fetchOffersAction } from '../api-actions';
import { offersData } from './offers-data';

describe('Reducer: offersData', () => {
  const DEFAULT_CITY = 'Paris';

  const state: OffersData = {
    city: DEFAULT_CITY,
    offers: [],
    currentOfferInfo: null,
    nearbyOffers: [],
    favoriteOffers: [],
    isDataLoading: false,
    isDataLoadingError: false,
  };

  const offer: Offer = makeFakeOffer();
  const offers: Offer[] = makeFakeOffers();

  it('Case: fetchOffersAction pending - change isDataLoading status', () => {
    expect(offersData.reducer(state, {type: fetchOffersAction.pending.type}))
      .toEqual({...state, isDataLoading: true});
  });

  it('Case: fetchOffersAction rejected  - change isDataLoading status', () => {
    expect(offersData.reducer(state, {type: fetchOffersAction.rejected.type}))
      .toEqual({...state, isDataLoading: false});
  });

  it('Case: fetchOffersAction fulfilled  - load offers', () => {
    expect(offersData.reducer(state, {type: fetchOffersAction.fulfilled.type, payload: offers}))
      .toEqual({...state, offers: offers, isDataLoading: false});
  });

  it('Case: fetchOfferInfoAction pending - set dataLoadingErrorStatus', () => {
    expect(offersData.reducer(state, {type: fetchOfferInfoAction.pending.type}))
      .toEqual({...state, isDataLoadingError: false});
  });

  it('Case: fetchOfferInfoAction rejected - set dataLoadingErrorStatus', () => {
    expect(offersData.reducer(state, {type: fetchOfferInfoAction.rejected.type}))
      .toEqual({...state, isDataLoadingError: true});
  });

  it('Case: fetchOfferInfoAction fulfilled - load offer\'s info to state', () => {
    expect(offersData.reducer(state, {type: fetchOfferInfoAction.fulfilled.type, payload: offer}))
      .toEqual({...state, currentOfferInfo: offer, isDataLoadingError: false});
  });

  it('Case: fetchNearbyOffersAction fulfilled - load nearby offers to state', () => {
    expect(offersData.reducer(state, {type: fetchNearbyOffersAction.fulfilled.type, payload: offers}))
      .toEqual({...state, nearbyOffers: offers});
  });

  it('Case: fetchFavoriteOffersAction fulfilled - load favorite offers to state', () => {
    expect(offersData.reducer(state, {type: fetchFavoriteOffersAction.fulfilled.type, payload: offers}))
      .toEqual({...state, favoriteOffers: offers});
  });
});
