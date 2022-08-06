import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus } from '../const';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { loadCurrentOfferInfo, loadCurrentOfferReviews, loadNearbyOffers, loadOffers, setAuthorizationStatus, setDataLoadingError, setDataLoadingStatus } from './action';
import { AuthorizationData } from '../types/auth-data';
import { saveToken } from '../services/token';
import { UserData } from '../types/user-data';
import { Review } from '../types/review';
import { CommentToUpload } from '../types/comment';

const DELETE_LOADING_ERROR_TIMEOUT = 1000;

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setDataLoadingStatus(false));
  }
);

export const fetchCurrentOfferInfoAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentOfferInfo',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    dispatch(loadCurrentOfferInfo(data));
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchNearbyOffers',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(loadNearbyOffers(data));
  }
);

export const fetchCurrentOfferReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentOfferReviews',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
      dispatch(loadCurrentOfferReviews(data));
    } catch {
      dispatch(setDataLoadingError(true));
      setTimeout(() => dispatch(setDataLoadingError(false)), DELETE_LOADING_ERROR_TIMEOUT);
    }
  }
);

export const postComment = createAsyncThunk<void, CommentToUpload, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postComment',
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<Review[]>(`${APIRoute.Reviews}/${offerId}`, {comment, rating});
      dispatch(loadCurrentOfferReviews(data));
    } catch {
      dispatch(setDataLoadingError(true));
      setTimeout(() => dispatch(setDataLoadingError(false)), DELETE_LOADING_ERROR_TIMEOUT);
    }
  }
);

export const checkAuthorizationAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuthorization',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuthorized));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthorizationData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuthorized));
    }
  }
);
