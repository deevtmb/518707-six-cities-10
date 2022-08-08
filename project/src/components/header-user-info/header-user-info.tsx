import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { getFavoriteOffers } from '../../store/offers-data/selectors';
import { getAuthorizationStatus, getUserInfo } from '../../store/user-process/selectors';

export default function HeaderUserInfo(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserInfo);
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useLayoutEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Authorized) {
      dispatch(fetchFavoriteOffersAction());
    }
  });

  return (
    <li className="header__nav-item user">
      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
        <div
          className="header__avatar-wrapper user__avatar-wrapper"
        >
        </div>
        <span className="header__user-name user__name">{user && user.email}</span>
        <span className="header__favorite-count">{favoriteOffers.length}</span>
      </Link>
    </li>
  );
}
