import {createReducer} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {changeSelectedCity, loadOffers, setAuthorizationStatus, setDataLoadingStatus} from './action';
import {AuthorizationStatus} from '../const';

type State = {
  city: string;
  offers: Offer[];
  isDataLoading: boolean;
  authorizationStatus: string;
};

const DEFAULT_CITY = 'Paris';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  isDataLoading: false,
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
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
