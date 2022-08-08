import { AuthorizationStatus } from '../const';
import {store} from '../store/index';
import { Offer } from './offer';
import { Review } from './review';
import { UserData } from './user-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  user: UserData | null,
}

export type OffersData = {
  city: string;
  offers: Offer[];
  currentOfferInfo: Offer | null;
  nearbyOffers: Offer[];
  favoriteOffers: Offer[];
  isDataLoading: boolean;
  isDataLoadingError: boolean;
};

export type ReviewsData = {
  reviews: Review[]
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
