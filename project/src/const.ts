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
