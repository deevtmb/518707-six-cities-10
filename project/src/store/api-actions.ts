import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus } from '../const';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { loadOffers, setAuthorizationStatus, setDataLoadingStatus } from './action';
import { AuthorizationData } from '../types/auth-data';
import { saveToken } from '../services/token';
import { UserData } from '../types/user-data';


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
