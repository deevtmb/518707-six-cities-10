import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersData } from '../../types/state';
import { fetchNearbyOffersAction, fetchOfferInfoAction, fetchOffersAction} from '../api-actions';

const DEFAULT_CITY = 'Paris';

const initialState: OffersData = {
  city: DEFAULT_CITY,
  offers: [],
  currentOfferInfo: null,
  nearbyOffers: [],
  isDataLoading: false,
  isDataLoadingError: false,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeSelectedCity: (state, action) => {
      state.city = action.payload;
    },
    setDatsLoadingError: (state, action) => {
      state.isDataLoadingError = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchOfferInfoAction.pending, (state, action) => {
        state.isDataLoadingError = false;
      })
      .addCase(fetchOfferInfoAction.rejected, (state, action) => {
        state.isDataLoadingError = true;
      })
      .addCase(fetchOfferInfoAction.fulfilled, (state, action) => {
        state.currentOfferInfo = action.payload;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  }
});
