import { AuthorizationStatus } from '../const';
import {store} from '../store/index';
import { Offer } from './offer';
import { Review } from './review';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
}

export type AppData = {
  city: string;
  offers: Offer[];
  currentOfferInfo: Offer | null;
  nearbyOffers: Offer[];
  reviews: Review[];
  isDataLoading: boolean;
  isDataLoadingError: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
