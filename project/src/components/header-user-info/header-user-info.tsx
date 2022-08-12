import { useEffect } from 'react';
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

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (authorizationStatus === AuthorizationStatus.Authorized) {
        dispatch(fetchFavoriteOffersAction());
      }
    }

    return () => {
      isMounted = false;
    };
  }, [authorizationStatus, dispatch]);

  return (
    <li className="header__nav-item user">
      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
        <div
          className="header__avatar-wrapper user__avatar-wrapper"
          style={{borderRadius: '50%', overflow: 'hidden'}}
        >
          {user && <img alt={user.email} src={user.avatarUrl}></img>}
        </div>
        <span className="header__user-name user__name">{user && user.email}</span>
        <span className="header__favorite-count">{favoriteOffers.length}</span>
      </Link>
    </li>
  );
}
