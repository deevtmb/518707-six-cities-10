import { AuthorizationStatus } from '../../const';
import { checkAuthorizationAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

describe('Reducer: userProcess', () => {
  const state = {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: null,
  };

  describe('Test: checkAuthorizationAction', () => {
    it('Case: checkAuthorizationAction rejected - update authorizationStatus to "NOT_AUTHORIZED"', () => {
      expect(userProcess.reducer(state, { type: checkAuthorizationAction.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NotAuthorized, user: null});
    });
    it('Case: checkAuthorizationAction fulfilled - update authorizationStatus to "AUTHORIZED"', () => {
      expect(userProcess.reducer(state, { type: checkAuthorizationAction.fulfilled.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.Authorized});
    });
  });

  describe('Test: loginAction', () => {
    it('Case: loginAction rejected - update authorizationStatus to "NOT_AUTHORIZED"', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NotAuthorized, user: null});
    });
    it('Case: loginAction fulfilled - update authorizationStatus to "AUTHORIZED"', () => {
      expect(userProcess.reducer(state, { type: loginAction.fulfilled.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.Authorized});
    });
  });

  describe('logoutAction test', () => {
    it('Case: logoutAction fulfilled - update authorizationStatus to "NOT_AUTHORIZED"', () => {
      expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NotAuthorized, user: null});
    });
  });
});
