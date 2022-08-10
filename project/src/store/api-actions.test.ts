import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { State } from '../types/state';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { changeFavoriteStatusAction, checkAuthorizationAction, fetchFavoriteOffersAction, fetchNearbyOffersAction, fetchOfferInfoAction, fetchOffersAction, fetchReviewsAction, loginAction, logoutAction, postReviewAction } from './api-actions';
import { AuthorizationData } from '../types/auth-data';
import { makeFakeOffer, makeFakeOffers, makeFakeReviews } from '../mocks/mocks';

describe('Test: async api-actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  describe('Authorization api-actions', () => {
    it('Case: checkAuthorization response code 200 - update authorization status to "AUTHORIZED"', async () => {
      const store = mockStore();

      mockAPI.onGet(APIRoute.Login).reply(200, []);
      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthorizationAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        checkAuthorizationAction.pending.type,
        checkAuthorizationAction.fulfilled.type
      ]);
    });

    it('Case: loginAction response code 200 - update authorization status to "AUTHORIZED"', async () => {
      const fakeUser: AuthorizationData = {email: 'a@test.ru', password: '123456'};

      mockAPI.onPost(APIRoute.Login).reply(200, {token: 'token'});

      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(loginAction(fakeUser));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type
      ]);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'token');
    });

    it('Case: logoutAction should dispatch Delete request to /logout', async () => {
      mockAPI.onDelete(APIRoute.Logout).reply(204);

      const store = mockStore();

      Storage.prototype.removeItem = jest.fn();
      await store.dispatch(logoutAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type
      ]);

      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
    });

  });

  describe('Offer data api-actions', () => {
    const mockOffers = makeFakeOffers();
    const mockOffer = makeFakeOffer();
    it('Case: dispatch fetchOffers with GET request to /hotels', async () => {
      mockAPI.onGet(APIRoute.Offers).reply(200, mockOffers);

      const store = mockStore();

      await store.dispatch(fetchOffersAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type
      ]);
    });

    it('Case: dispatch fetchOfferInfoAction with GET request to /hotels/{id}', async () => {
      mockAPI.onGet(`${APIRoute.Offers}/${mockOffer.id}`).reply(200, mockOffer);

      const store = mockStore();

      await store.dispatch(fetchOfferInfoAction(String(mockOffer.id)));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchOfferInfoAction.pending.type,
        fetchOfferInfoAction.fulfilled.type
      ]);
    });

    it('Case: dispatch fetchNearbyOffers with GET request to /hotels/{id}/nearby', async () => {
      mockAPI.onGet(`${APIRoute.Offers}/${mockOffer.id}/nearby`).reply(200, mockOffers);

      const store = mockStore();

      await store.dispatch(fetchNearbyOffersAction(String(mockOffer.id)));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.fulfilled.type
      ]);
    });

    it('Case: dispatch fetchFavoriteOffersAction with GET request to /favorite', async () => {
      mockAPI.onGet(APIRoute.Favorite).reply(200, mockOffers);

      const store = mockStore();

      await store.dispatch(fetchFavoriteOffersAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.fulfilled.type
      ]);
    });

    it('Case: dispatch changeFavoriteStatusAction with POST request to /favorite/{id}/{status}', async () => {
      mockAPI.onPost(`${APIRoute.Favorite}/${mockOffer.id}/0`).reply(200, mockOffer);

      const store = mockStore();

      await store.dispatch(changeFavoriteStatusAction({offerId: mockOffer.id, status: 0}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.fulfilled.type
      ]);
    });
  });

  describe('Reviews data api-actions', () => {
    const mockReviews = makeFakeReviews();
    const mockOffer = makeFakeOffer();

    it('Case: dispatch fetchReviews with GET request to /comments/{id}', async () => {
      mockAPI.onGet(`${APIRoute.Reviews}/${mockOffer.id}`).reply(200, mockReviews);

      const store = mockStore();

      await store.dispatch(fetchReviewsAction(String(mockOffer.id)));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type
      ]);
    });

    it('Case: dispatch postReview with POST request to /comments/{id}', async () => {
      mockAPI.onPost(`${APIRoute.Reviews}/${mockOffer.id}`).reply(200, mockReviews);

      const store = mockStore();

      await store.dispatch(postReviewAction({offerId: mockOffer.id, comment: 'Comment', rating: 5}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        postReviewAction.pending.type,
        postReviewAction.fulfilled.type
      ]);
    });
  });
});
