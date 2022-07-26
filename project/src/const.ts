type Dictionary = {
  [key: string]: string;
}

export const OFFER_TYPES_MAP: Dictionary = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel'
};

export const PLACES_LIST_CLASSES: Dictionary = {
  'cities': 'cities__places-list tabs__content',
  'near-places': 'near-places__list'
};

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Authorized = 'AUTHORIZED',
  NotAuthorized = 'NOT_AUTHORIZED',
  Unknown = 'UNKNOWN',
}
