import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function HeaderLogout(): JSX.Element {
  return (
    <li className="header__nav-item">
      <Link className="header__nav-link" to={AppRoute.Main}>
        <span className="header__signout">Sign out</span>
      </Link>
    </li>
  );
}
