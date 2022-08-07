import {Offer} from '../../types/offer';
import {PLACES_LIST_CLASSES} from '../../const';
import {MouseEvent} from 'react';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offersList: Offer[];
  placesType: string;
  onPlaceItemHover: (offer: Offer) => void;
  onPlaceItemLeave: () => void;
}

export default function PlacesList({offersList, placesType, onPlaceItemHover, onPlaceItemLeave}: PlacesListProps): JSX.Element {
  return (
    <div className={`places__list ${PLACES_LIST_CLASSES[placesType]}`}>
      {offersList.map((offer) => (
        <article
          key={offer.id}
          className={`${placesType}__card place-card`}
          onMouseOver={(evt: MouseEvent<HTMLElement>) => onPlaceItemHover(offer)}
          onMouseLeave={(evt: MouseEvent<HTMLElement>) => onPlaceItemLeave()}
        >
          <PlaceCard
            placeType={placesType}
            offer={offer}
          />
        </article>
      ))}
    </div>
  );
}
