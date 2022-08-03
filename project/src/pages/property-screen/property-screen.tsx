import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Review} from '../../types/review';
import {Offer} from '../../types/offer';
import Logo from '../../components/logo/logo';
import {OFFER_TYPES_MAP,AppRoute} from '../../const';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import {getRatingStarWidth} from '../../utils';

type PropertyScreenProps = {
  offers: Offer[];
  reviews: Review[];
}

export default function PropertyScreen({offers, reviews}: PropertyScreenProps): JSX.Element {
  const currentOffer = offers[0];
  const {host} = currentOffer;
  const additionalMapClass = 'property__map';
  const placesType = 'near-places';
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  const onPlaceItemHover = (offer: Offer) => {
    setActiveOffer(offer);
  };

  const onPlaceItemLeave = () => {
    setActiveOffer(null);
  };

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <Link to={AppRoute.Favorites}>
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {currentOffer.images.map((image) => (
                <div key={image} className="property__image-wrapper">
                  <img className="property__image" src={image} alt={currentOffer.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {currentOffer.isPremium && <div className="property__mark"><span>Premium</span></div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentOffer.title}
                </h1>
                <button className={`property__bookmark-button ${currentOffer.isFavorite ? 'property__bookmark-button--active' : ''} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getRatingStarWidth(currentOffer.rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {OFFER_TYPES_MAP[currentOffer.type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentOffer.bedrooms} Bedroom{currentOffer.bedrooms > 1 && 's'}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {currentOffer.maxAdults} adult{currentOffer.maxAdults > 1 && 's'}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{currentOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {currentOffer.goods.map((feature) => (
                    <li key={feature} className="property__inside-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt={host.name} />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {host.isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  {currentOffer.description.split(/\r?\n/).map((paragraph) => (
                    <p key={paragraph} className="property__text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map
            city={offers[0].city}
            offers={offers.slice(1)}
            additionalClass={additionalMapClass}
            activeOffer={activeOffer}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList
              offersList={offers.slice(1)}
              placesType={placesType}
              onPlaceItemHover={onPlaceItemHover}
              onPlaceItemLeave={onPlaceItemLeave}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
