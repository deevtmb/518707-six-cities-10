import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import HeaderUserInfo from '../header-user-info/header-user-info';
import HeaderLogout from '../header-logout/header-logout';
import HeaderLogin from '../header-login/header-login';
import Logo from '../logo/logo';
import { useLocation } from 'react-router-dom';

export default function Header(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const {pathname} = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {pathname !== AppRoute.Login &&
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Authorized ?
                  <>
                    <HeaderUserInfo />
                    <HeaderLogout />
                  </> :
                  <HeaderLogin />}
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
}
