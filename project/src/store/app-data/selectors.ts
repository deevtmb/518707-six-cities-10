import { NameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { State } from '../../types/state';


export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;

export const getCurrentOfferInfo = (state: State): Offer | null => state[NameSpace.Data].currentOfferInfo;

export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.Data].nearbyOffers;

export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;

export const getCurrentCity = (state: State): string => state[NameSpace.Data].city;

export const getLoadingStatus = (state: State): boolean => state[NameSpace.Data].isDataLoading;
