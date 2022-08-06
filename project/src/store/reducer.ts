import {createReducer} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {changeSelectedCity, loadCurrentOfferInfo, loadCurrentOfferReviews, loadNearbyOffers, loadOffers, setAuthorizationStatus, setDataLoadingError, setDataLoadingStatus} from './action';
import {AuthorizationStatus} from '../const';
import { Review } from '../types/review';

type State = {
  city: string;
  offers: Offer[];
  currentOfferInfo: Offer | null;
  nearbyOffers: Offer[];
  currentOfferReviews: Review[];
  isDataLoading: boolean;
  isDataLoadingError: boolean;
  authorizationStatus: string;
};

const DEFAULT_CITY = 'Paris';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  currentOfferInfo: null,
  nearbyOffers: [],
  currentOfferReviews: [],
  isDataLoading: false,
  isDataLoadingError: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSelectedCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadCurrentOfferInfo, (state, action) => {
      state.currentOfferInfo = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadCurrentOfferReviews, (state, action) => {
      state.currentOfferReviews = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(setDataLoadingError, (state, action) => {
      state.isDataLoadingError = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
