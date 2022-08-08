import { NameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';


export const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;

export const getCurrentOfferInfo = (state: State): Offer | null => state[NameSpace.Offers].currentOfferInfo;

export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.Offers].nearbyOffers;

export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Offers].favoriteOffers;

export const getCurrentCity = (state: State): string => state[NameSpace.Offers].city;

export const getLoadingStatus = (state: State): boolean => state[NameSpace.Offers].isDataLoading;

export const getDataLoadingError = (state: State): boolean => state[NameSpace.Offers].isDataLoadingError;
