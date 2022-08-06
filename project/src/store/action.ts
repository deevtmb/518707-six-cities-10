import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import { Review } from '../types/review';

export const changeSelectedCity = createAction<string>('changeSelectedCity');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadCurrentOfferInfo = createAction<Offer>('data/loadCurrentOfferInfo');

export const loadNearbyOffers = createAction<Offer[]>('data/loadNearbyOffers');

export const loadCurrentOfferReviews = createAction<Review[]>('data/loadCurrentOfferReviews');

export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');

export const setDataLoadingError = createAction<boolean>('data/setDataLoadingError');

export const setAuthorizationStatus = createAction<string>('user/setAuthorizationStatus');
