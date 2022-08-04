import {createReducer} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {changeSelectedCity, loadOffers, setDataLoadingStatus} from './action';

type State = {
  city: string;
  offers: Offer[];
  isDataLoading: boolean;
};

const DEFAULT_CITY = 'Paris';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  isDataLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSelectedCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    });
});
