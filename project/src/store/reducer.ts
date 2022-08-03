import {createReducer} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {offersList} from '../mocks/offers';
import {changeSelectedCity, getOffersList} from './action';

type State = {
  city: string;
  offers: Offer[];
};

const DEFAULT_CITY = 'Paris';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: offersList,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSelectedCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(getOffersList, (state, action) => {
      state.offers = action.payload.offers;
    });
});
