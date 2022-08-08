import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppData } from '../../types/state';
import { fetchCurrentOfferInfoAction, fetchNearbyOffersAction, fetchOffersAction, fetchReviewsAction, postComment } from '../api-actions';

const DEFAULT_CITY = 'Paris';

const initialState: AppData = {
  city: DEFAULT_CITY,
  offers: [],
  currentOfferInfo: null,
  nearbyOffers: [],
  reviews: [],
  isDataLoading: false,
  isDataLoadingError: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeSelectedCity: (state, action) => {
      state.city = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoading = false;
      })
      // .addCase(fetchCurrentOfferInfoAction.pending, (state) => {
      //   state.isDataLoading = true;
      // })
      .addCase(fetchCurrentOfferInfoAction.fulfilled, (state, action) => {
        state.currentOfferInfo = action.payload;
        // state.isDataLoading = false;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});
