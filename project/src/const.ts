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

export enum SortOption {
  Popular = 'Popular',
  PriceToHigh = 'Price: low to high',
  PriceToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum APIRoute {
  Offers = '/hotels',
}

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
