import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { fetchOffersAction, logoutAction } from '../../store/api-actions';

export default function HeaderLogout(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <li className="header__nav-item">
      <Link
        className="header__nav-link"
        onClick={(evt) => {
          evt.preventDefault();
          dispatch(logoutAction());
          dispatch(fetchOffersAction());
        }}
        to={AppRoute.Main}
      >
        <span className="header__signout">Sign out</span>
      </Link>
    </li>
  );
}
