import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';

export const changeSelectedCity = createAction<{city: string}>('changeSelectedCity');

export const getOffersList = createAction<{offers: Offer[]}>('getOffersList');
