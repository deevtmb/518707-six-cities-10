import { datatype } from 'faker';
import { FormEvent, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/header/header';
import { AppRoute, AuthorizationStatus, cities } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { offersData } from '../../store/offers-data/offers-data';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

export default function LoginScreen(): JSX.Element {
  const PASSWORD_CHECK_ERROR = 'Password must contain at least one alphabetic character and one number.';
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const city = cities[datatype.number({min: 0, max: cities.length - 1})];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (passwordRef.current === null || !((/[0-9]/g).test(passwordRef.current.value) && (/[a-zA-Z]/g).test(passwordRef.current.value))) {
      toast.warn(PASSWORD_CHECK_ERROR);
      return;
    }

    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }));
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (authorizationStatus === AuthorizationStatus.Authorized) {
        navigate(AppRoute.Main);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [authorizationStatus, navigate]);

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  ref={emailRef}
                  data-testid="email"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  ref={passwordRef}
                  data-testid="password"
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item" onClick={() => dispatch(offersData.actions.changeSelectedCity(city))}>
              <Link className="locations__item-link" to={AppRoute.Main} data-testid="city-link">
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
