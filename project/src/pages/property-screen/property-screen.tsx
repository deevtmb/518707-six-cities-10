import { useLayoutEffect, MouseEvent} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {OFFER_TYPES_MAP, AuthorizationStatus, AppRoute} from '../../const';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingLayout from '../../components/loading-layout/loading-layout';
import Header from '../../components/header/header';
import {getRatingStarWidth} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { fetchOfferInfoAction, fetchReviewsAction, fetchNearbyOffersAction, changeFavoriteStatusAction } from '../../store/api-actions';
import { getCurrentOfferInfo, getDataLoadingError, getNearbyOffers } from '../../store/offers-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getReviews } from '../../store/reviews-data/selectors';

export default function PropertyScreen(): JSX.Element {
  const additionalMapClass = 'property__map';
  const placesType = 'near-places';

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const currentOffer = useAppSelector(getCurrentOfferInfo);
  const nearbyOffers = useAppSelector(getNearbyOffers) || [];
  const reviews = useAppSelector(getReviews) || [];
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dataLoadingError = useAppSelector(getDataLoadingError);

  useLayoutEffect(() => {
    if (id) {
      dispatch(fetchOfferInfoAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchReviewsAction(id));
    }
  },[id, dispatch, navigate]);

  if (dataLoadingError) {
    navigate(AppRoute.NotFound);
  }

  if (id && (currentOffer === null || currentOffer.id !== +id)) {
    return (
      <LoadingLayout />
    );
  }

  if (currentOffer === null || !id) {
    return (
      <NotFoundScreen />
    );
  }

  const {host} = currentOffer;

  const handleFavoriteButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (authorizationStatus !== AuthorizationStatus.Authorized) {
      navigate(AppRoute.Login);
    }

    dispatch(changeFavoriteStatusAction({
      offerId: currentOffer.id,
      status: currentOffer.isFavorite ? 0 : 1,
    }));
  };

  return (
    <div className="page">
      <Header />

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
                <button
                  className={`property__bookmark-button ${currentOffer.isFavorite ? 'property__bookmark-button--active' : ''} button`}
                  type="button"
                  onClick={handleFavoriteButtonClick}
                >
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
                {authorizationStatus === AuthorizationStatus.Authorized && <ReviewForm />}
              </section>
            </div>
          </div>
          <Map
            city={currentOffer.city}
            offers={[...nearbyOffers, currentOffer]}
            additionalClass={additionalMapClass}
            activeOffer={currentOffer}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList
              offersList={nearbyOffers}
              placesType={placesType}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
