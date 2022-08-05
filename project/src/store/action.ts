import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';

export const changeSelectedCity = createAction<string>('changeSelectedCity');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');

export const setAuthorizationStatus = createAction<string>('user/setAuthorizationStatus');
